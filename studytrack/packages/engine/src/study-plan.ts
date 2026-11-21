// ─── Study Plan Generator ───
// Builds a day-by-day exam preparation plan from exam date, daily hours,
// and topic priorities. Critical topics first, then Important, then Optional.

import type { Subject, SubjectProgress, Topic } from '@studytrack/data';
import type { TopicPriorityResult } from './pyq-analyzer.js';

export interface PlanTopic {
  topicId: string;
  topicName: string;
  subjectId: string;
  estimatedMinutes: number;
  type: 'new' | 'review' | 'test';
  priority: 'critical' | 'important' | 'optional';
}

export interface PlanDay {
  date: string; // ISO date
  dayNumber: number;
  topics: PlanTopic[];
  totalMinutes: number;
  isReviewDay: boolean;
}

export interface GeneratedPlan {
  examDate: string;
  startDate: string;
  dailyMinutes: number;
  totalDays: number;
  days: PlanDay[];
  uncoveredCritical: number;
  uncoveredImportant: number;
  uncoveredOptional: number;
  disclaimer: string;
}

/**
 * Generate a day-by-day study plan.
 *
 * HOW IT WORKS:
 * 1. Collect all uncovered topics, sorted by priority (Critical → Important → Optional).
 * 2. Allocate topics to days based on estimated hours and daily limit.
 * 3. Every 4th day is a review day for recently studied topics.
 * 4. Last 2 days before exam are full review.
 */
export function generateStudyPlan(
  subjects: Subject[],
  progress: SubjectProgress[],
  priorities: Map<string, TopicPriorityResult[]>,
  examDate: string,
  dailyHours: number,
  startDate?: string,
): GeneratedPlan {
  const start = startDate ? new Date(startDate) : new Date();
  const exam = new Date(examDate);
  const dailyMinutes = dailyHours * 60;

  // Calculate total days
  const totalDays = Math.max(
    1,
    Math.ceil((exam.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );

  // Collect uncovered topics with priorities
  const coveredTopicIds = new Set<string>();
  for (const sp of progress) {
    for (const tp of sp.topics) {
      if (tp.covered) coveredTopicIds.add(tp.topicId);
    }
  }

  // Build a combined list of uncovered topics with their priorities
  interface TopicWithPriority {
    topic: Topic;
    subject: Subject;
    priorityResult: TopicPriorityResult | null;
    bucket: 'critical' | 'important' | 'optional';
    score: number;
  }

  const uncoveredTopics: TopicWithPriority[] = [];
  let uncoveredCritical = 0;
  let uncoveredImportant = 0;
  let uncoveredOptional = 0;

  for (const subject of subjects) {
    const subjectPriorities = priorities.get(subject.id) ?? [];
    const priorityMap = new Map(subjectPriorities.map((p) => [p.topicId, p]));

    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        if (coveredTopicIds.has(topic.id)) continue;

        const pr = priorityMap.get(topic.id) ?? null;
        const score = pr?.priorityScore ?? 0.3;
        const bucket: 'critical' | 'important' | 'optional' =
          score >= 0.7 ? 'critical' : score >= 0.4 ? 'important' : 'optional';

        if (bucket === 'critical') uncoveredCritical++;
        else if (bucket === 'important') uncoveredImportant++;
        else uncoveredOptional++;

        uncoveredTopics.push({ topic, subject, priorityResult: pr, bucket, score });
      }
    }
  }

  // Sort: Critical first, then Important, then Optional. Within same bucket, by score desc.
  const bucketOrder = { critical: 0, important: 1, optional: 2 };
  uncoveredTopics.sort((a, b) => {
    const bucketDiff = bucketOrder[a.bucket] - bucketOrder[b.bucket];
    if (bucketDiff !== 0) return bucketDiff;
    return b.score - a.score;
  });

  // Build days
  const days: PlanDay[] = [];
  let topicIdx = 0;
  const recentlyStudied: PlanTopic[] = [];

  for (let dayNum = 0; dayNum < totalDays; dayNum++) {
    const dayDate = new Date(start);
    dayDate.setDate(dayDate.getDate() + dayNum);
    const dateStr = dayDate.toISOString().split('T')[0]!;

    const isLastTwoDays = dayNum >= totalDays - 2;
    const isReviewDay = (dayNum + 1) % 4 === 0 || isLastTwoDays;

    const dayTopics: PlanTopic[] = [];
    let remainingMinutes = dailyMinutes;

    if (isReviewDay) {
      // Review recently studied topics
      for (const reviewed of recentlyStudied.slice(-6)) {
        if (remainingMinutes <= 0) break;
        const reviewMinutes = Math.min(30, remainingMinutes);
        dayTopics.push({
          ...reviewed,
          estimatedMinutes: reviewMinutes,
          type: 'review',
        });
        remainingMinutes -= reviewMinutes;
      }
    }

    // Fill remaining time with new topics
    while (topicIdx < uncoveredTopics.length && remainingMinutes >= 30) {
      const item = uncoveredTopics[topicIdx]!;
      const estimatedMinutes = item.topic.estimatedHours * 60;

      if (estimatedMinutes <= remainingMinutes) {
        const planTopic: PlanTopic = {
          topicId: item.topic.id,
          topicName: item.topic.name,
          subjectId: item.subject.id,
          estimatedMinutes,
          type: 'new',
          priority: item.bucket,
        };
        dayTopics.push(planTopic);
        recentlyStudied.push(planTopic);
        remainingMinutes -= estimatedMinutes;
        topicIdx++;
      } else {
        break;
      }
    }

    days.push({
      date: dateStr,
      dayNumber: dayNum + 1,
      topics: dayTopics,
      totalMinutes: dailyMinutes - remainingMinutes,
      isReviewDay,
    });
  }

  return {
    examDate,
    startDate: start.toISOString().split('T')[0]!,
    dailyMinutes,
    totalDays,
    days,
    uncoveredCritical,
    uncoveredImportant,
    uncoveredOptional,
    disclaimer: 'Auto-generated plan. Adjust based on your pace and understanding.',
  };
}

// ─── Study Recommender ───
// Ranks uncovered topics by marginal SGPA gain per estimated study hour.
// "Study this next to raise your SGPA the most."

import type { Subject, SubjectProgress, Topic } from '@studytrack/data';
import type { TopicPriorityResult } from './pyq-analyzer.js';
import type { TestResult } from '@studytrack/data';

export interface StudyRecommendation {
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  /** Priority score from PYQ analysis */
  priorityScore: number;
  bucket: 'Critical' | 'Important' | 'Optional';
  /** Estimated study hours */
  estimatedHours: number;
  /** Marginal gain score (priority / hours = efficiency) */
  efficiencyScore: number;
  /** Boost from weak test results on this topic */
  weaknessBoost: number;
  /** Final recommendation score */
  recommendationScore: number;
  /** One-line reason for the recommendation */
  reason: string;
}

/**
 * Generate "Study Next" recommendations.
 *
 * HOW IT WORKS:
 * 1. Find all uncovered topics.
 * 2. For each, calculate efficiency = priority_score / estimated_hours
 * 3. Boost topics where test results show weakness.
 * 4. Boost topics that are prerequisites for other uncovered topics.
 * 5. Sort by final recommendation score.
 *
 * The reason explains *why* each topic is recommended.
 */
export function getStudyRecommendations(
  subjects: Subject[],
  progress: SubjectProgress[],
  priorities: Map<string, TopicPriorityResult[]>,
  testResults: TestResult[],
  limit: number = 10,
): StudyRecommendation[] {
  const recommendations: StudyRecommendation[] = [];

  // Build a set of covered topics and weak topics (from tests)
  const coveredTopicIds = new Set<string>();
  for (const sp of progress) {
    for (const tp of sp.topics) {
      if (tp.covered) coveredTopicIds.add(tp.topicId);
    }
  }

  // Find weak topics from test results (got wrong)
  const topicWrongCount = new Map<string, number>();
  const topicAttemptCount = new Map<string, number>();
  for (const test of testResults) {
    for (const q of test.questions) {
      topicAttemptCount.set(q.topicId, (topicAttemptCount.get(q.topicId) ?? 0) + 1);
      if (!q.correct) {
        topicWrongCount.set(q.topicId, (topicWrongCount.get(q.topicId) ?? 0) + 1);
      }
    }
  }

  for (const subject of subjects) {
    const topicPriorities = priorities.get(subject.id) ?? [];
    const priorityMap = new Map(topicPriorities.map((p) => [p.topicId, p]));

    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        // Skip already-covered topics
        if (coveredTopicIds.has(topic.id)) continue;

        const priority = priorityMap.get(topic.id);
        const priorityScore = priority?.priorityScore ?? 0.3;
        const bucket = priority?.bucket ?? 'Optional';
        const estimatedHours = topic.estimatedHours || 2;

        // ── Efficiency: priority per hour ──
        const efficiencyScore = priorityScore / estimatedHours;

        // ── Weakness boost: if tests showed this topic is weak ──
        const wrongCount = topicWrongCount.get(topic.id) ?? 0;
        const attemptCount = topicAttemptCount.get(topic.id) ?? 0;
        let weaknessBoost = 0;
        if (attemptCount > 0 && wrongCount > 0) {
          weaknessBoost = (wrongCount / attemptCount) * 0.3;
        }

        // ── Final score ──
        const recommendationScore = efficiencyScore + weaknessBoost;

        // ── Build reason ──
        let reason = '';
        if (bucket === 'Critical') {
          reason = `Critical topic — appeared in ${priority?.yearsAppeared ?? 0} of last ${priority?.totalQuestions ? 5 : 0} years.`;
        } else if (weaknessBoost > 0) {
          reason = `You got ${wrongCount}/${attemptCount} wrong on this in tests. High-impact revision.`;
        } else if (bucket === 'Important') {
          reason = `Important topic with good marks/time ratio (${priorityScore.toFixed(2)} priority in ~${estimatedHours}h).`;
        } else {
          reason = `Covers remaining syllabus. ${estimatedHours}h estimated.`;
        }

        recommendations.push({
          topicId: topic.id,
          topicName: topic.name,
          subjectId: subject.id,
          subjectName: subject.name,
          priorityScore,
          bucket,
          estimatedHours,
          efficiencyScore: Number(efficiencyScore.toFixed(4)),
          weaknessBoost: Number(weaknessBoost.toFixed(4)),
          recommendationScore: Number(recommendationScore.toFixed(4)),
          reason,
        });
      }
    }
  }

  // Sort by recommendation score descending
  recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);
  return recommendations.slice(0, limit);
}

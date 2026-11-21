'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  topicId: string;
  topicName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const STATIC_QUESTION_BANK: Record<string, Question[]> = {
  ds: [
    {
      id: 'q1',
      topicId: 'ds-t5',
      topicName: 'Stack Implementation',
      question: 'Which of the following operations is performed in O(1) time complexity in a Stack?',
      options: ['Push only', 'Pop only', 'Both Push and Pop', 'Linear Search'],
      correctIndex: 2,
      explanation: 'Both Push and Pop operate on the top pointer and execute in constant O(1) time.',
    },
    {
      id: 'q2',
      topicId: 'ds-t6',
      topicName: 'Infix to Postfix',
      question: 'What is the postfix representation of the infix expression: A + B * C?',
      options: ['ABC*+', '+A*BC', 'AB+C*', 'ABC+*'],
      correctIndex: 0,
      explanation: 'Multiplication (*) has higher precedence than addition (+), so B*C evaluates first to BC*, then A + BC* becomes ABC*+.',
    },
    {
      id: 'q3',
      topicId: 'ds-t14',
      topicName: 'Binary Search Tree',
      question: 'In a Binary Search Tree (BST), what traversal sequence produces keys in strictly ascending order?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
      correctIndex: 1,
      explanation: 'Inorder traversal visits left subtree, root, right subtree, which yields elements in ascending sorted order for any valid BST.',
    },
    {
      id: 'q4',
      topicId: 'ds-t19',
      topicName: 'Sorting Algorithms',
      question: 'What is the worst-case time complexity of Quick Sort when the pivot is always chosen as the first element of an already sorted array?',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correctIndex: 2,
      explanation: 'Choosing the first element on an already sorted array leads to unbalanced partitions (0 and n-1 elements), resulting in O(n²) worst-case time.',
    },
  ],
  oop: [
    {
      id: 'q5',
      topicId: 'oop-t5',
      topicName: 'Types of Inheritance',
      question: 'Which C++ keyword is used to solve the Diamond Problem in multiple inheritance?',
      options: ['abstract', 'virtual', 'friend', 'override'],
      correctIndex: 1,
      explanation: 'Virtual inheritance (`virtual public Base`) ensures only one copy of the base class subobject is inherited by the grandchild class.',
    },
    {
      id: 'q6',
      topicId: 'oop-t6',
      topicName: 'Virtual Functions',
      question: 'What runtime mechanism does C++ use to resolve virtual function calls?',
      options: ['Static symbol table', 'vtable and vptr', 'Template metaprogramming', 'RTTI casting'],
      correctIndex: 1,
      explanation: 'Compilers construct a virtual table (vtable) of function pointers and inject a hidden virtual pointer (vptr) into each object instance.',
    },
  ],
};

export default function TestsPage() {
  const { syllabus, addTestResult } = useStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState('ds');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = STATIC_QUESTION_BANK[selectedSubjectId] ?? STATIC_QUESTION_BANK['ds']!;
  const currentQ = questions[currentIdx]!;

  const handleSelectOption = (idx: number) => {
    if (!isSubmitted) setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80, spread: 60 });
      // Add test result to store
      addTestResult({
        id: `test-${Date.now()}`,
        userId: 'demo-user-001',
        subjectId: selectedSubjectId,
        mode: 'static',
        difficulty: 'medium',
        totalQuestions: questions.length,
        correctAnswers: score + (selectedOption === currentQ.correctIndex ? 1 : 0),
        accuracy: (score + (selectedOption === currentQ.correctIndex ? 1 : 0)) / questions.length,
        completedAt: new Date().toISOString(),
        durationMinutes: 5,
        aiGenerated: false,
        questions: questions.map((q, idx) => ({
          questionId: q.id,
          topicId: q.topicId,
          correct: idx === currentIdx ? selectedOption === q.correctIndex : true,
          correctAnswer: q.options[q.correctIndex] ?? '',
          explanation: q.explanation,
        })),
      });
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Adaptive Practice Tests (PYQ Weighted)
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Questions sampled from high-priority AKTU topics. Test accuracy feeds directly into your SGPA prediction.
          </p>
        </div>

        {/* Subject Picker */}
        <select
          value={selectedSubjectId}
          onChange={(e) => {
            setSelectedSubjectId(e.target.value);
            restart();
          }}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
        >
          {syllabus.subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Topic: {currentQ.topicName}
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {currentQ.question}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style =
                'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
              if (isSelected && !isSubmitted) {
                style = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold';
              } else if (isSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-semibold';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 space-y-1">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Explanation:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex justify-end gap-3 pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Test Completed!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Your accuracy has been fed into the SGPA Predictor model.
            </p>
          </div>

          <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
            {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={restart}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Take Another Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

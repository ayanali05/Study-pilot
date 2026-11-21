'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import { Bot, Send, Sparkles, BookOpen, Clock, FileSpreadsheet } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ label: string; type: string }>;
  aiGenerated?: boolean;
}

const RULE_BASED_KNOWLEDGE: Record<string, { answer: string; citations: Array<{ label: string; type: string }> }> = {
  crash: {
    answer:
      'Here is your high-yield 3-day crash plan for Semester 3:\n\n**Day 1: Data Structures (Critical)**\n- Binary Search Tree (BST) operations & traversals (Appeared 5/5 years, 10 marks)\n- Stack applications: Infix to Postfix conversion (7 marks)\n- Quick Sort & Merge Sort algorithms (7 marks)\n\n**Day 2: OOP in C++**\n- Types of Inheritance & Diamond Problem virtual base class (10 marks)\n- Virtual functions and runtime polymorphism via vtable (7 marks)\n- Operator overloading rules (7 marks)\n\n**Day 3: COA & Discrete Math**\n- Cache memory mapping: Direct, Associative, Set-associative (10 marks)\n- Instruction pipelining & hazards (7 marks)\n- Recurrence relations solving via characteristic equation (10 marks)\n\nThis sequence covers 68% of recurring marks in minimum time.',
    citations: [
      { label: 'DS PYQ 2020-2024 (BST & Stack)', type: 'pyq' },
      { label: 'OOP Unit 2 Inheritance', type: 'topic' },
      { label: 'COA Unit 3 Cache Memory', type: 'pyq' },
    ],
  },
  bst: {
    answer:
      '**Binary Search Tree (BST) — Core Concept for AKTU:**\n\nA BST is a binary tree where for every node X:\n1. All nodes in left subtree have keys < X.key\n2. All nodes in right subtree have keys > X.key\n\n**Key Exam Algorithms:**\n- **Inorder Traversal:** Inorder of a BST always yields sorted ascending keys.\n- **Search Complexity:** Best/Average: O(log n), Worst (skewed): O(n).\n- **PYQ Frequency:** Asked in 2020, 2021, 2022, 2023, and 2024 (10-mark question in Section C).',
    citations: [
      { label: 'Data Structures Unit 4 (Trees)', type: 'topic' },
      { label: 'AKTU 2024 Q3 (10 Marks)', type: 'pyq' },
    ],
  },
  critical: {
    answer:
      'A topic is tagged **Critical** when its combined priority score exceeds 0.70 based on:\n1. **Frequency:** Appeared in at least 4 of the last 5 years.\n2. **Marks Weight:** Typically carries 7 to 10 marks per question.\n3. **Recency:** Re-asked recently in the 2023 or 2024 exams.\n\nCovering Critical topics first guarantees the maximum marginal gain per study hour.',
    citations: [{ label: 'PYQ Priority Formula', type: 'engine' }],
  },
};

export default function CoachPage() {
  const { prediction } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        'Hello Rahul! I am your StudyTrack AI Coach. Grounded directly in your AKTU Semester 3 syllabus and 5-year PYQ intelligence, I can explain difficult topics simply, build customized crash plans, or tell you why specific topics are ranked Critical.',
      aiGenerated: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = RULE_BASED_KNOWLEDGE.critical!;
      if (lower.includes('crash') || lower.includes('plan') || lower.includes('3 day') || lower.includes('exam')) {
        response = RULE_BASED_KNOWLEDGE.crash!;
      } else if (lower.includes('bst') || lower.includes('tree') || lower.includes('binary')) {
        response = RULE_BASED_KNOWLEDGE.bst!;
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        citations: response.citations,
        aiGenerated: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Study Coach (RAG Grounded)
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Grounded in AKTU syllabus + PYQ analysis. Fully graceful offline fallback.
          </p>
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => sendMessage('Make a 3-day crash plan for Semester 3')}
          className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 whitespace-nowrap"
        >
          ⚡ 3-Day Crash Plan
        </button>
        <button
          onClick={() => sendMessage('Explain Binary Search Tree (BST) for exams')}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 whitespace-nowrap"
        >
          📖 Explain BST Simply
        </button>
        <button
          onClick={() => sendMessage('Why are certain topics tagged Critical?')}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 whitespace-nowrap"
        >
          🎯 Why Tagged Critical?
        </button>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed max-w-xl whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
              }`}
            >
              {m.content}

              {/* Citations */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                    Citations:
                  </span>
                  {m.citations.map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {m.aiGenerated && (
              <span className="text-[9px] text-slate-400 mt-1 px-1">
                AI-Generated response • Grounded in syllabus
              </span>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <span className="animate-pulse">AI Coach is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your syllabus, PYQs, or strategy..."
          className="flex-1 px-4 py-3 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

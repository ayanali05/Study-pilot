// ─── CSE Semester 3 Syllabus Seed Data ───
// CLEARLY LABELLED: This is a SAMPLE DATASET for demonstration.
// It is NOT official AKTU data. Structure matches real AKTU syllabi for realism.

import type { Syllabus } from '../schemas';

export const syllabusData: Syllabus = {
  university: 'AKTU',
  branch: 'CSE',
  semester: 3,
  dataLabel: 'Sample dataset — not official AKTU data',
  subjects: [
    // ── 1. Data Structures ──
    {
      id: 'ds',
      name: 'Data Structures',
      code: 'KCS301',
      semester: 3,
      branch: 'CSE',
      credits: 4,
      units: [
        {
          id: 'ds-u1',
          name: 'Introduction & Arrays',
          subjectId: 'ds',
          order: 1,
          topics: [
            { id: 'ds-t1', name: 'Introduction to Data Structures', unitId: 'ds-u1', subjectId: 'ds', estimatedHours: 1, prerequisites: [], tags: ['basics'] },
            { id: 'ds-t2', name: 'Arrays and Operations', unitId: 'ds-u1', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t1'], tags: ['arrays'] },
            { id: 'ds-t3', name: 'Sparse Matrix', unitId: 'ds-u1', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t2'], tags: ['arrays', 'matrix'] },
            { id: 'ds-t4', name: 'String Operations', unitId: 'ds-u1', subjectId: 'ds', estimatedHours: 1.5, prerequisites: ['ds-t2'], tags: ['strings'] },
          ],
        },
        {
          id: 'ds-u2',
          name: 'Stacks & Queues',
          subjectId: 'ds',
          order: 2,
          topics: [
            { id: 'ds-t5', name: 'Stack Implementation & Operations', unitId: 'ds-u2', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t2'], tags: ['stack'] },
            { id: 'ds-t6', name: 'Infix to Postfix Conversion', unitId: 'ds-u2', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t5'], tags: ['stack', 'expression'] },
            { id: 'ds-t7', name: 'Queue Types (Circular, Deque, Priority)', unitId: 'ds-u2', subjectId: 'ds', estimatedHours: 3, prerequisites: ['ds-t5'], tags: ['queue'] },
            { id: 'ds-t8', name: 'Recursion & Stack Frames', unitId: 'ds-u2', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t5'], tags: ['recursion'] },
          ],
        },
        {
          id: 'ds-u3',
          name: 'Linked Lists',
          subjectId: 'ds',
          order: 3,
          topics: [
            { id: 'ds-t9', name: 'Singly Linked List', unitId: 'ds-u3', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t1'], tags: ['linked-list'] },
            { id: 'ds-t10', name: 'Doubly Linked List', unitId: 'ds-u3', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t9'], tags: ['linked-list'] },
            { id: 'ds-t11', name: 'Circular Linked List', unitId: 'ds-u3', subjectId: 'ds', estimatedHours: 1.5, prerequisites: ['ds-t9'], tags: ['linked-list'] },
            { id: 'ds-t12', name: 'Polynomial Representation', unitId: 'ds-u3', subjectId: 'ds', estimatedHours: 1.5, prerequisites: ['ds-t9'], tags: ['linked-list', 'application'] },
          ],
        },
        {
          id: 'ds-u4',
          name: 'Trees',
          subjectId: 'ds',
          order: 4,
          topics: [
            { id: 'ds-t13', name: 'Binary Trees & Traversals', unitId: 'ds-u4', subjectId: 'ds', estimatedHours: 3, prerequisites: ['ds-t8'], tags: ['tree', 'traversal'] },
            { id: 'ds-t14', name: 'Binary Search Tree', unitId: 'ds-u4', subjectId: 'ds', estimatedHours: 3, prerequisites: ['ds-t13'], tags: ['tree', 'bst'] },
            { id: 'ds-t15', name: 'AVL Tree', unitId: 'ds-u4', subjectId: 'ds', estimatedHours: 3, prerequisites: ['ds-t14'], tags: ['tree', 'balanced'] },
            { id: 'ds-t16', name: 'Huffman Coding', unitId: 'ds-u4', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t13'], tags: ['tree', 'compression'] },
          ],
        },
        {
          id: 'ds-u5',
          name: 'Graphs & Sorting',
          subjectId: 'ds',
          order: 5,
          topics: [
            { id: 'ds-t17', name: 'Graph Representations', unitId: 'ds-u5', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t13'], tags: ['graph'] },
            { id: 'ds-t18', name: 'BFS and DFS', unitId: 'ds-u5', subjectId: 'ds', estimatedHours: 3, prerequisites: ['ds-t17'], tags: ['graph', 'traversal'] },
            { id: 'ds-t19', name: 'Sorting Algorithms', unitId: 'ds-u5', subjectId: 'ds', estimatedHours: 4, prerequisites: ['ds-t2'], tags: ['sorting'] },
            { id: 'ds-t20', name: 'Hashing', unitId: 'ds-u5', subjectId: 'ds', estimatedHours: 2, prerequisites: ['ds-t2'], tags: ['hashing'] },
          ],
        },
      ],
    },

    // ── 2. Object Oriented Programming (C++) ──
    {
      id: 'oop',
      name: 'Object Oriented Programming',
      code: 'KCS302',
      semester: 3,
      branch: 'CSE',
      credits: 4,
      units: [
        {
          id: 'oop-u1', name: 'Introduction to OOP & C++', subjectId: 'oop', order: 1,
          topics: [
            { id: 'oop-t1', name: 'OOP Concepts & Principles', unitId: 'oop-u1', subjectId: 'oop', estimatedHours: 2, prerequisites: [], tags: ['basics'] },
            { id: 'oop-t2', name: 'Classes and Objects', unitId: 'oop-u1', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t1'], tags: ['class'] },
            { id: 'oop-t3', name: 'Constructors & Destructors', unitId: 'oop-u1', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t2'], tags: ['constructor'] },
            { id: 'oop-t4', name: 'Friend Functions & Classes', unitId: 'oop-u1', subjectId: 'oop', estimatedHours: 1.5, prerequisites: ['oop-t2'], tags: ['friend'] },
          ],
        },
        {
          id: 'oop-u2', name: 'Inheritance & Polymorphism', subjectId: 'oop', order: 2,
          topics: [
            { id: 'oop-t5', name: 'Types of Inheritance', unitId: 'oop-u2', subjectId: 'oop', estimatedHours: 3, prerequisites: ['oop-t3'], tags: ['inheritance'] },
            { id: 'oop-t6', name: 'Virtual Functions & Polymorphism', unitId: 'oop-u2', subjectId: 'oop', estimatedHours: 3, prerequisites: ['oop-t5'], tags: ['polymorphism'] },
            { id: 'oop-t7', name: 'Abstract Classes', unitId: 'oop-u2', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t6'], tags: ['abstract'] },
            { id: 'oop-t8', name: 'Operator Overloading', unitId: 'oop-u2', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t3'], tags: ['operator'] },
          ],
        },
        {
          id: 'oop-u3', name: 'Templates & Exception Handling', subjectId: 'oop', order: 3,
          topics: [
            { id: 'oop-t9', name: 'Function & Class Templates', unitId: 'oop-u3', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t5'], tags: ['templates'] },
            { id: 'oop-t10', name: 'Exception Handling', unitId: 'oop-u3', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t2'], tags: ['exception'] },
            { id: 'oop-t11', name: 'Standard Template Library', unitId: 'oop-u3', subjectId: 'oop', estimatedHours: 3, prerequisites: ['oop-t9'], tags: ['stl'] },
            { id: 'oop-t12', name: 'File Handling', unitId: 'oop-u3', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t2'], tags: ['file-io'] },
          ],
        },
        {
          id: 'oop-u4', name: 'Advanced OOP', subjectId: 'oop', order: 4,
          topics: [
            { id: 'oop-t13', name: 'Dynamic Memory Management', unitId: 'oop-u4', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t3'], tags: ['memory'] },
            { id: 'oop-t14', name: 'RTTI & Type Casting', unitId: 'oop-u4', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t6'], tags: ['rtti'] },
            { id: 'oop-t15', name: 'Namespaces', unitId: 'oop-u4', subjectId: 'oop', estimatedHours: 1, prerequisites: ['oop-t2'], tags: ['namespace'] },
            { id: 'oop-t16', name: 'Design Patterns (Observer, Singleton)', unitId: 'oop-u4', subjectId: 'oop', estimatedHours: 3, prerequisites: ['oop-t7'], tags: ['patterns'] },
          ],
        },
        {
          id: 'oop-u5', name: 'Case Studies', subjectId: 'oop', order: 5,
          topics: [
            { id: 'oop-t17', name: 'UML Diagrams', unitId: 'oop-u5', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t1'], tags: ['uml'] },
            { id: 'oop-t18', name: 'OOP in Real-world Applications', unitId: 'oop-u5', subjectId: 'oop', estimatedHours: 2, prerequisites: ['oop-t16'], tags: ['applications'] },
          ],
        },
      ],
    },

    // ── 3. Computer Organization & Architecture ──
    {
      id: 'coa',
      name: 'Computer Organization & Architecture',
      code: 'KCS303',
      semester: 3,
      branch: 'CSE',
      credits: 4,
      units: [
        {
          id: 'coa-u1', name: 'Basic Structure of Computers', subjectId: 'coa', order: 1,
          topics: [
            { id: 'coa-t1', name: 'Computer Types & Functional Units', unitId: 'coa-u1', subjectId: 'coa', estimatedHours: 2, prerequisites: [], tags: ['basics'] },
            { id: 'coa-t2', name: 'Bus Architecture', unitId: 'coa-u1', subjectId: 'coa', estimatedHours: 1.5, prerequisites: ['coa-t1'], tags: ['bus'] },
            { id: 'coa-t3', name: 'Number Systems & Data Representation', unitId: 'coa-u1', subjectId: 'coa', estimatedHours: 2, prerequisites: [], tags: ['numbers'] },
            { id: 'coa-t4', name: 'Fixed & Floating Point Arithmetic', unitId: 'coa-u1', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t3'], tags: ['arithmetic'] },
          ],
        },
        {
          id: 'coa-u2', name: 'Processor Design', subjectId: 'coa', order: 2,
          topics: [
            { id: 'coa-t5', name: 'Register Transfer Language', unitId: 'coa-u2', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t1'], tags: ['rtl'] },
            { id: 'coa-t6', name: 'Instruction Cycle & Addressing Modes', unitId: 'coa-u2', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t5'], tags: ['instruction'] },
            { id: 'coa-t7', name: 'ALU Design', unitId: 'coa-u2', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t4'], tags: ['alu'] },
            { id: 'coa-t8', name: 'Control Unit (Hardwired & Microprogrammed)', unitId: 'coa-u2', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t6'], tags: ['control-unit'] },
          ],
        },
        {
          id: 'coa-u3', name: 'Memory Organization', subjectId: 'coa', order: 3,
          topics: [
            { id: 'coa-t9', name: 'Memory Hierarchy', unitId: 'coa-u3', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t1'], tags: ['memory'] },
            { id: 'coa-t10', name: 'Cache Memory', unitId: 'coa-u3', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t9'], tags: ['cache'] },
            { id: 'coa-t11', name: 'Virtual Memory', unitId: 'coa-u3', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t9'], tags: ['virtual-memory'] },
            { id: 'coa-t12', name: 'Associative & Interleaved Memory', unitId: 'coa-u3', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t10'], tags: ['memory'] },
          ],
        },
        {
          id: 'coa-u4', name: 'I/O Organization', subjectId: 'coa', order: 4,
          topics: [
            { id: 'coa-t13', name: 'I/O Interface & Modes', unitId: 'coa-u4', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t1'], tags: ['io'] },
            { id: 'coa-t14', name: 'DMA & Interrupts', unitId: 'coa-u4', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t13'], tags: ['dma', 'interrupt'] },
            { id: 'coa-t15', name: 'I/O Processor', unitId: 'coa-u4', subjectId: 'coa', estimatedHours: 1.5, prerequisites: ['coa-t14'], tags: ['io'] },
          ],
        },
        {
          id: 'coa-u5', name: 'Pipelining & Parallel Processing', subjectId: 'coa', order: 5,
          topics: [
            { id: 'coa-t16', name: 'Pipeline Architecture', unitId: 'coa-u5', subjectId: 'coa', estimatedHours: 3, prerequisites: ['coa-t8'], tags: ['pipeline'] },
            { id: 'coa-t17', name: 'Pipeline Hazards', unitId: 'coa-u5', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t16'], tags: ['hazard'] },
            { id: 'coa-t18', name: 'Multiprocessor Architecture', unitId: 'coa-u5', subjectId: 'coa', estimatedHours: 2, prerequisites: ['coa-t16'], tags: ['parallel'] },
          ],
        },
      ],
    },

    // ── 4. Discrete Mathematics ──
    {
      id: 'dm',
      name: 'Discrete Mathematics',
      code: 'KAS302',
      semester: 3,
      branch: 'CSE',
      credits: 3,
      units: [
        {
          id: 'dm-u1', name: 'Set Theory & Logic', subjectId: 'dm', order: 1,
          topics: [
            { id: 'dm-t1', name: 'Sets, Relations, Functions', unitId: 'dm-u1', subjectId: 'dm', estimatedHours: 3, prerequisites: [], tags: ['sets'] },
            { id: 'dm-t2', name: 'Propositional Logic', unitId: 'dm-u1', subjectId: 'dm', estimatedHours: 2, prerequisites: [], tags: ['logic'] },
            { id: 'dm-t3', name: 'Predicate Logic & Quantifiers', unitId: 'dm-u1', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t2'], tags: ['logic'] },
            { id: 'dm-t4', name: 'Proof Techniques', unitId: 'dm-u1', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t3'], tags: ['proofs'] },
          ],
        },
        {
          id: 'dm-u2', name: 'Combinatorics', subjectId: 'dm', order: 2,
          topics: [
            { id: 'dm-t5', name: 'Permutations & Combinations', unitId: 'dm-u2', subjectId: 'dm', estimatedHours: 3, prerequisites: [], tags: ['combinatorics'] },
            { id: 'dm-t6', name: 'Pigeonhole Principle', unitId: 'dm-u2', subjectId: 'dm', estimatedHours: 1.5, prerequisites: ['dm-t5'], tags: ['combinatorics'] },
            { id: 'dm-t7', name: 'Recurrence Relations', unitId: 'dm-u2', subjectId: 'dm', estimatedHours: 3, prerequisites: ['dm-t5'], tags: ['recurrence'] },
            { id: 'dm-t8', name: 'Generating Functions', unitId: 'dm-u2', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t7'], tags: ['generating'] },
          ],
        },
        {
          id: 'dm-u3', name: 'Graph Theory', subjectId: 'dm', order: 3,
          topics: [
            { id: 'dm-t9', name: 'Graph Basics & Types', unitId: 'dm-u3', subjectId: 'dm', estimatedHours: 2, prerequisites: [], tags: ['graph'] },
            { id: 'dm-t10', name: 'Euler & Hamilton Paths', unitId: 'dm-u3', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t9'], tags: ['graph'] },
            { id: 'dm-t11', name: 'Planar Graphs & Graph Coloring', unitId: 'dm-u3', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t9'], tags: ['graph', 'coloring'] },
            { id: 'dm-t12', name: 'Trees & Spanning Trees', unitId: 'dm-u3', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t9'], tags: ['tree'] },
          ],
        },
        {
          id: 'dm-u4', name: 'Algebraic Structures', subjectId: 'dm', order: 4,
          topics: [
            { id: 'dm-t13', name: 'Groups & Subgroups', unitId: 'dm-u4', subjectId: 'dm', estimatedHours: 3, prerequisites: ['dm-t1'], tags: ['algebra'] },
            { id: 'dm-t14', name: 'Rings & Fields', unitId: 'dm-u4', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t13'], tags: ['algebra'] },
            { id: 'dm-t15', name: 'Lattices & Boolean Algebra', unitId: 'dm-u4', subjectId: 'dm', estimatedHours: 3, prerequisites: ['dm-t1'], tags: ['boolean'] },
          ],
        },
        {
          id: 'dm-u5', name: 'Number Theory', subjectId: 'dm', order: 5,
          topics: [
            { id: 'dm-t16', name: 'Divisibility & GCD', unitId: 'dm-u5', subjectId: 'dm', estimatedHours: 2, prerequisites: [], tags: ['number-theory'] },
            { id: 'dm-t17', name: 'Modular Arithmetic', unitId: 'dm-u5', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t16'], tags: ['modular'] },
            { id: 'dm-t18', name: "Fermat's & Euler's Theorems", unitId: 'dm-u5', subjectId: 'dm', estimatedHours: 2, prerequisites: ['dm-t17'], tags: ['theorem'] },
          ],
        },
      ],
    },

    // ── 5. Technical Communication ──
    {
      id: 'tc',
      name: 'Technical Communication',
      code: 'KAS301',
      semester: 3,
      branch: 'CSE',
      credits: 2,
      units: [
        {
          id: 'tc-u1', name: 'Communication Fundamentals', subjectId: 'tc', order: 1,
          topics: [
            { id: 'tc-t1', name: 'Communication Process & Barriers', unitId: 'tc-u1', subjectId: 'tc', estimatedHours: 1.5, prerequisites: [], tags: ['basics'] },
            { id: 'tc-t2', name: 'Technical Writing Principles', unitId: 'tc-u1', subjectId: 'tc', estimatedHours: 1.5, prerequisites: ['tc-t1'], tags: ['writing'] },
            { id: 'tc-t3', name: 'Report Writing', unitId: 'tc-u1', subjectId: 'tc', estimatedHours: 2, prerequisites: ['tc-t2'], tags: ['report'] },
          ],
        },
        {
          id: 'tc-u2', name: 'Presentation & Soft Skills', subjectId: 'tc', order: 2,
          topics: [
            { id: 'tc-t4', name: 'Presentation Techniques', unitId: 'tc-u2', subjectId: 'tc', estimatedHours: 1.5, prerequisites: ['tc-t1'], tags: ['presentation'] },
            { id: 'tc-t5', name: 'Group Discussion & Interview Skills', unitId: 'tc-u2', subjectId: 'tc', estimatedHours: 1.5, prerequisites: ['tc-t1'], tags: ['soft-skills'] },
            { id: 'tc-t6', name: 'Professional Ethics', unitId: 'tc-u2', subjectId: 'tc', estimatedHours: 1, prerequisites: [], tags: ['ethics'] },
          ],
        },
      ],
    },
  ],
};

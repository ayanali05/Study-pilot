// ─── PYQ (Past Year Questions) Seed Data ───
// SAMPLE DATASET — not official AKTU data.
// Structure is realistic: 5 years of questions per subject, with topic mapping.

import type { PYQData } from '../schemas.js';

export const pyqDataSets: PYQData[] = [
  // ── Data Structures PYQs ──
  {
    subjectId: 'ds',
    dataLabel: 'Sample dataset — not official AKTU data',
    totalYears: 5,
    years: [2020, 2021, 2022, 2023, 2024],
    questions: [
      // 2024
      { id: 'ds-q1', topicId: 'ds-t5', subjectId: 'ds', unitId: 'ds-u2', year: 2024, marks: 7, type: 'long', questionText: 'Explain stack operations with implementation using arrays. Write push and pop algorithms.' },
      { id: 'ds-q2', topicId: 'ds-t6', subjectId: 'ds', unitId: 'ds-u2', year: 2024, marks: 7, type: 'long', questionText: 'Convert the infix expression A+(B*C-(D/E^F)*G)*H to postfix using stack. Show each step.' },
      { id: 'ds-q3', topicId: 'ds-t14', subjectId: 'ds', unitId: 'ds-u4', year: 2024, marks: 10, type: 'long', questionText: 'Construct a BST from the following data: 50, 30, 70, 20, 40, 60, 80. Show insertion steps and perform inorder traversal.' },
      { id: 'ds-q4', topicId: 'ds-t18', subjectId: 'ds', unitId: 'ds-u5', year: 2024, marks: 7, type: 'long', questionText: 'Explain BFS and DFS traversal algorithms with examples. Compare their time complexity.' },
      { id: 'ds-q5', topicId: 'ds-t19', subjectId: 'ds', unitId: 'ds-u5', year: 2024, marks: 10, type: 'long', questionText: 'Sort the array [38, 27, 43, 3, 9, 82, 10] using Merge Sort. Show all passes.' },
      { id: 'ds-q6', topicId: 'ds-t15', subjectId: 'ds', unitId: 'ds-u4', year: 2024, marks: 7, type: 'long', questionText: 'What is an AVL tree? Explain rotations (LL, RR, LR, RL) with examples.' },
      { id: 'ds-q7', topicId: 'ds-t9', subjectId: 'ds', unitId: 'ds-u3', year: 2024, marks: 2, type: 'short', questionText: 'What is the advantage of linked list over array?' },
      { id: 'ds-q8', topicId: 'ds-t7', subjectId: 'ds', unitId: 'ds-u2', year: 2024, marks: 7, type: 'long', questionText: 'Explain circular queue with implementation. How does it solve the limitation of linear queue?' },
      // 2023
      { id: 'ds-q9', topicId: 'ds-t5', subjectId: 'ds', unitId: 'ds-u2', year: 2023, marks: 7, type: 'long', questionText: 'Implement a stack using linked list. Show push, pop and display operations.' },
      { id: 'ds-q10', topicId: 'ds-t6', subjectId: 'ds', unitId: 'ds-u2', year: 2023, marks: 7, type: 'long', questionText: 'Evaluate the postfix expression: 6 2 3 + - 3 8 2 / + * 2 ^ 3 +. Show the stack at each step.' },
      { id: 'ds-q11', topicId: 'ds-t14', subjectId: 'ds', unitId: 'ds-u4', year: 2023, marks: 10, type: 'long', questionText: 'Write algorithms for insertion and deletion in a Binary Search Tree with examples.' },
      { id: 'ds-q12', topicId: 'ds-t18', subjectId: 'ds', unitId: 'ds-u5', year: 2023, marks: 7, type: 'long', questionText: 'Apply DFS on a given graph and find the spanning tree.' },
      { id: 'ds-q13', topicId: 'ds-t19', subjectId: 'ds', unitId: 'ds-u5', year: 2023, marks: 10, type: 'long', questionText: 'Sort [12, 11, 13, 5, 6, 7] using Quick Sort with first element as pivot. Show partitioning.' },
      { id: 'ds-q14', topicId: 'ds-t13', subjectId: 'ds', unitId: 'ds-u4', year: 2023, marks: 7, type: 'long', questionText: 'Write recursive algorithms for preorder, inorder, and postorder traversal of binary tree.' },
      { id: 'ds-q15', topicId: 'ds-t20', subjectId: 'ds', unitId: 'ds-u5', year: 2023, marks: 7, type: 'long', questionText: 'Explain hashing with collision resolution techniques: linear probing and chaining.' },
      { id: 'ds-q16', topicId: 'ds-t10', subjectId: 'ds', unitId: 'ds-u3', year: 2023, marks: 2, type: 'short', questionText: 'Write the advantage of doubly linked list over singly linked list.' },
      // 2022
      { id: 'ds-q17', topicId: 'ds-t5', subjectId: 'ds', unitId: 'ds-u2', year: 2022, marks: 10, type: 'long', questionText: 'Explain stack with two applications. Implement using arrays.' },
      { id: 'ds-q18', topicId: 'ds-t14', subjectId: 'ds', unitId: 'ds-u4', year: 2022, marks: 7, type: 'long', questionText: 'Create BST from: 10, 5, 15, 2, 7, 12, 20 and delete node 15. Show steps.' },
      { id: 'ds-q19', topicId: 'ds-t19', subjectId: 'ds', unitId: 'ds-u5', year: 2022, marks: 10, type: 'long', questionText: 'Compare Bubble Sort, Selection Sort, and Insertion Sort with time complexities.' },
      { id: 'ds-q20', topicId: 'ds-t9', subjectId: 'ds', unitId: 'ds-u3', year: 2022, marks: 7, type: 'long', questionText: 'Write algorithms for insertion and deletion in a singly linked list.' },
      { id: 'ds-q21', topicId: 'ds-t7', subjectId: 'ds', unitId: 'ds-u2', year: 2022, marks: 7, type: 'long', questionText: 'Explain different types of queues with applications.' },
      { id: 'ds-q22', topicId: 'ds-t17', subjectId: 'ds', unitId: 'ds-u5', year: 2022, marks: 7, type: 'long', questionText: 'Explain adjacency matrix and adjacency list representations of a graph.' },
      // 2021
      { id: 'ds-q23', topicId: 'ds-t6', subjectId: 'ds', unitId: 'ds-u2', year: 2021, marks: 7, type: 'long', questionText: 'Convert A*B+C/D-E to postfix and prefix notation.' },
      { id: 'ds-q24', topicId: 'ds-t14', subjectId: 'ds', unitId: 'ds-u4', year: 2021, marks: 10, type: 'long', questionText: 'Explain BST operations: search, insert, delete with complexity analysis.' },
      { id: 'ds-q25', topicId: 'ds-t15', subjectId: 'ds', unitId: 'ds-u4', year: 2021, marks: 7, type: 'long', questionText: 'Insert 21, 26, 30, 9, 4, 14, 28, 18, 15, 10 into an AVL tree. Show rotations.' },
      { id: 'ds-q26', topicId: 'ds-t19', subjectId: 'ds', unitId: 'ds-u5', year: 2021, marks: 7, type: 'long', questionText: 'Sort [5, 3, 8, 4, 2] using Heap Sort. Show the heap construction.' },
      { id: 'ds-q27', topicId: 'ds-t18', subjectId: 'ds', unitId: 'ds-u5', year: 2021, marks: 7, type: 'long', questionText: 'Explain BFS algorithm. Apply it to find shortest path in an unweighted graph.' },
      { id: 'ds-q28', topicId: 'ds-t16', subjectId: 'ds', unitId: 'ds-u4', year: 2021, marks: 7, type: 'long', questionText: 'Build a Huffman tree for the characters: A(5), B(9), C(12), D(13), E(16), F(45).' },
      // 2020
      { id: 'ds-q29', topicId: 'ds-t5', subjectId: 'ds', unitId: 'ds-u2', year: 2020, marks: 7, type: 'long', questionText: 'Write push, pop, peek operations of stack using array. Explain overflow/underflow.' },
      { id: 'ds-q30', topicId: 'ds-t14', subjectId: 'ds', unitId: 'ds-u4', year: 2020, marks: 10, type: 'long', questionText: 'Create a BST and perform all traversals. Explain the application of BST.' },
      { id: 'ds-q31', topicId: 'ds-t19', subjectId: 'ds', unitId: 'ds-u5', year: 2020, marks: 7, type: 'long', questionText: 'Write Merge Sort algorithm. Analyze its time and space complexity.' },
      { id: 'ds-q32', topicId: 'ds-t9', subjectId: 'ds', unitId: 'ds-u3', year: 2020, marks: 7, type: 'long', questionText: 'Explain singly linked list operations with algorithms.' },
      { id: 'ds-q33', topicId: 'ds-t3', subjectId: 'ds', unitId: 'ds-u1', year: 2020, marks: 7, type: 'long', questionText: 'Explain sparse matrix representation using arrays. Write algorithm for transpose.' },
      { id: 'ds-q34', topicId: 'ds-t8', subjectId: 'ds', unitId: 'ds-u2', year: 2020, marks: 2, type: 'short', questionText: 'What is tail recursion? Give an example.' },
    ],
  },

  // ── OOP PYQs ──
  {
    subjectId: 'oop',
    dataLabel: 'Sample dataset — not official AKTU data',
    totalYears: 5,
    years: [2020, 2021, 2022, 2023, 2024],
    questions: [
      { id: 'oop-q1', topicId: 'oop-t5', subjectId: 'oop', unitId: 'oop-u2', year: 2024, marks: 10, type: 'long', questionText: 'Explain all types of inheritance in C++ with examples.' },
      { id: 'oop-q2', topicId: 'oop-t6', subjectId: 'oop', unitId: 'oop-u2', year: 2024, marks: 7, type: 'long', questionText: 'What is virtual function? Explain runtime polymorphism with vtable.' },
      { id: 'oop-q3', topicId: 'oop-t3', subjectId: 'oop', unitId: 'oop-u1', year: 2024, marks: 7, type: 'long', questionText: 'Explain different types of constructors. What is a copy constructor?' },
      { id: 'oop-q4', topicId: 'oop-t8', subjectId: 'oop', unitId: 'oop-u2', year: 2024, marks: 7, type: 'long', questionText: 'Overload + operator for complex number addition.' },
      { id: 'oop-q5', topicId: 'oop-t10', subjectId: 'oop', unitId: 'oop-u3', year: 2024, marks: 7, type: 'long', questionText: 'Explain exception handling in C++ with try, catch, throw. Give examples.' },
      { id: 'oop-q6', topicId: 'oop-t5', subjectId: 'oop', unitId: 'oop-u2', year: 2023, marks: 10, type: 'long', questionText: 'Write a program demonstrating multilevel and multiple inheritance.' },
      { id: 'oop-q7', topicId: 'oop-t6', subjectId: 'oop', unitId: 'oop-u2', year: 2023, marks: 7, type: 'long', questionText: 'Differentiate between compile-time and runtime polymorphism.' },
      { id: 'oop-q8', topicId: 'oop-t9', subjectId: 'oop', unitId: 'oop-u3', year: 2023, marks: 7, type: 'long', questionText: 'Explain function templates and class templates with examples.' },
      { id: 'oop-q9', topicId: 'oop-t3', subjectId: 'oop', unitId: 'oop-u1', year: 2023, marks: 7, type: 'long', questionText: 'What is a destructor? When is it called? Write a program using constructor & destructor.' },
      { id: 'oop-q10', topicId: 'oop-t11', subjectId: 'oop', unitId: 'oop-u3', year: 2023, marks: 7, type: 'long', questionText: 'Explain STL containers: vector, list, map with examples.' },
      { id: 'oop-q11', topicId: 'oop-t5', subjectId: 'oop', unitId: 'oop-u2', year: 2022, marks: 10, type: 'long', questionText: 'What is inheritance? Explain with the diamond problem and virtual inheritance.' },
      { id: 'oop-q12', topicId: 'oop-t8', subjectId: 'oop', unitId: 'oop-u2', year: 2022, marks: 7, type: 'long', questionText: 'Explain operator overloading rules. Overload << and >> operators.' },
      { id: 'oop-q13', topicId: 'oop-t12', subjectId: 'oop', unitId: 'oop-u3', year: 2022, marks: 7, type: 'long', questionText: 'Write a C++ program for file handling: read and write operations.' },
      { id: 'oop-q14', topicId: 'oop-t6', subjectId: 'oop', unitId: 'oop-u2', year: 2021, marks: 7, type: 'long', questionText: 'Explain pure virtual functions and abstract classes.' },
      { id: 'oop-q15', topicId: 'oop-t5', subjectId: 'oop', unitId: 'oop-u2', year: 2021, marks: 10, type: 'long', questionText: 'Discuss different types of inheritance with C++ programs.' },
      { id: 'oop-q16', topicId: 'oop-t3', subjectId: 'oop', unitId: 'oop-u1', year: 2021, marks: 7, type: 'long', questionText: 'Explain parameterized constructors and constructor overloading.' },
      { id: 'oop-q17', topicId: 'oop-t13', subjectId: 'oop', unitId: 'oop-u4', year: 2021, marks: 7, type: 'long', questionText: 'Explain new and delete operators for dynamic memory allocation.' },
      { id: 'oop-q18', topicId: 'oop-t5', subjectId: 'oop', unitId: 'oop-u2', year: 2020, marks: 10, type: 'long', questionText: 'Explain hierarchical and hybrid inheritance with examples.' },
      { id: 'oop-q19', topicId: 'oop-t6', subjectId: 'oop', unitId: 'oop-u2', year: 2020, marks: 7, type: 'long', questionText: 'What is polymorphism? Explain with function overloading and overriding examples.' },
      { id: 'oop-q20', topicId: 'oop-t2', subjectId: 'oop', unitId: 'oop-u1', year: 2020, marks: 7, type: 'long', questionText: 'Define class and object. Explain access specifiers in C++.' },
      { id: 'oop-q21', topicId: 'oop-t4', subjectId: 'oop', unitId: 'oop-u1', year: 2020, marks: 2, type: 'short', questionText: 'What is a friend function? Why is it used?' },
    ],
  },

  // ── COA PYQs ──
  {
    subjectId: 'coa',
    dataLabel: 'Sample dataset — not official AKTU data',
    totalYears: 5,
    years: [2020, 2021, 2022, 2023, 2024],
    questions: [
      { id: 'coa-q1', topicId: 'coa-t10', subjectId: 'coa', unitId: 'coa-u3', year: 2024, marks: 10, type: 'long', questionText: 'Explain cache memory mapping techniques: direct, associative, and set-associative.' },
      { id: 'coa-q2', topicId: 'coa-t16', subjectId: 'coa', unitId: 'coa-u5', year: 2024, marks: 7, type: 'long', questionText: 'Explain instruction pipeline with stages. What are pipeline hazards?' },
      { id: 'coa-q3', topicId: 'coa-t8', subjectId: 'coa', unitId: 'coa-u2', year: 2024, marks: 7, type: 'long', questionText: 'Differentiate between hardwired and microprogrammed control unit.' },
      { id: 'coa-q4', topicId: 'coa-t14', subjectId: 'coa', unitId: 'coa-u4', year: 2024, marks: 7, type: 'long', questionText: 'Explain DMA controller and its modes of operation.' },
      { id: 'coa-q5', topicId: 'coa-t4', subjectId: 'coa', unitId: 'coa-u1', year: 2024, marks: 7, type: 'long', questionText: 'Explain IEEE 754 floating point representation with an example.' },
      { id: 'coa-q6', topicId: 'coa-t10', subjectId: 'coa', unitId: 'coa-u3', year: 2023, marks: 10, type: 'long', questionText: 'What is cache memory? Explain write-through and write-back policies.' },
      { id: 'coa-q7', topicId: 'coa-t16', subjectId: 'coa', unitId: 'coa-u5', year: 2023, marks: 7, type: 'long', questionText: 'Explain pipeline stages and calculate speedup for a 5-stage pipeline.' },
      { id: 'coa-q8', topicId: 'coa-t6', subjectId: 'coa', unitId: 'coa-u2', year: 2023, marks: 7, type: 'long', questionText: 'List and explain different addressing modes with examples.' },
      { id: 'coa-q9', topicId: 'coa-t11', subjectId: 'coa', unitId: 'coa-u3', year: 2023, marks: 7, type: 'long', questionText: 'Explain virtual memory with page table and TLB.' },
      { id: 'coa-q10', topicId: 'coa-t10', subjectId: 'coa', unitId: 'coa-u3', year: 2022, marks: 7, type: 'long', questionText: 'Explain direct-mapped cache with numerical example.' },
      { id: 'coa-q11', topicId: 'coa-t8', subjectId: 'coa', unitId: 'coa-u2', year: 2022, marks: 10, type: 'long', questionText: 'Design a microprogrammed control unit. Explain the microinstruction format.' },
      { id: 'coa-q12', topicId: 'coa-t14', subjectId: 'coa', unitId: 'coa-u4', year: 2022, marks: 7, type: 'long', questionText: 'Explain interrupt driven I/O and DMA transfer.' },
      { id: 'coa-q13', topicId: 'coa-t16', subjectId: 'coa', unitId: 'coa-u5', year: 2021, marks: 7, type: 'long', questionText: 'What is pipelining? Explain data hazards and their solutions.' },
      { id: 'coa-q14', topicId: 'coa-t10', subjectId: 'coa', unitId: 'coa-u3', year: 2021, marks: 10, type: 'long', questionText: 'Compare direct, associative, and set-associative cache mapping.' },
      { id: 'coa-q15', topicId: 'coa-t4', subjectId: 'coa', unitId: 'coa-u1', year: 2021, marks: 7, type: 'long', questionText: "Explain Booth's multiplication algorithm with an example." },
      { id: 'coa-q16', topicId: 'coa-t9', subjectId: 'coa', unitId: 'coa-u3', year: 2020, marks: 7, type: 'long', questionText: 'Explain memory hierarchy with speed, cost, and capacity comparison.' },
      { id: 'coa-q17', topicId: 'coa-t16', subjectId: 'coa', unitId: 'coa-u5', year: 2020, marks: 7, type: 'long', questionText: 'Explain RISC vs CISC architectures with pipeline considerations.' },
      { id: 'coa-q18', topicId: 'coa-t6', subjectId: 'coa', unitId: 'coa-u2', year: 2020, marks: 7, type: 'long', questionText: 'Explain instruction format and addressing modes in computer architecture.' },
    ],
  },

  // ── Discrete Math PYQs ──
  {
    subjectId: 'dm',
    dataLabel: 'Sample dataset — not official AKTU data',
    totalYears: 5,
    years: [2020, 2021, 2022, 2023, 2024],
    questions: [
      { id: 'dm-q1', topicId: 'dm-t1', subjectId: 'dm', unitId: 'dm-u1', year: 2024, marks: 7, type: 'long', questionText: 'Prove that a function is bijective. Explain with composition of functions.' },
      { id: 'dm-q2', topicId: 'dm-t7', subjectId: 'dm', unitId: 'dm-u2', year: 2024, marks: 10, type: 'long', questionText: 'Solve the recurrence relation: a_n = 5a_{n-1} - 6a_{n-2} with a_0=1, a_1=4.' },
      { id: 'dm-q3', topicId: 'dm-t10', subjectId: 'dm', unitId: 'dm-u3', year: 2024, marks: 7, type: 'long', questionText: 'Find the Euler path and Hamilton path in a given graph. State the conditions for their existence.' },
      { id: 'dm-q4', topicId: 'dm-t13', subjectId: 'dm', unitId: 'dm-u4', year: 2024, marks: 7, type: 'long', questionText: "Prove that (Z, +) is an abelian group. State Lagrange's theorem." },
      { id: 'dm-q5', topicId: 'dm-t15', subjectId: 'dm', unitId: 'dm-u4', year: 2024, marks: 7, type: 'long', questionText: 'Draw the Hasse diagram for divisors of 36. Find all maximal and minimal elements.' },
      { id: 'dm-q6', topicId: 'dm-t7', subjectId: 'dm', unitId: 'dm-u2', year: 2023, marks: 10, type: 'long', questionText: 'Solve using generating functions: a_n = 3a_{n-1} + 2^n.' },
      { id: 'dm-q7', topicId: 'dm-t1', subjectId: 'dm', unitId: 'dm-u1', year: 2023, marks: 7, type: 'long', questionText: 'Define equivalence relation. Show that "congruence mod n" is an equivalence relation.' },
      { id: 'dm-q8', topicId: 'dm-t9', subjectId: 'dm', unitId: 'dm-u3', year: 2023, marks: 7, type: 'long', questionText: 'Prove that a connected graph has an Euler circuit iff every vertex has even degree.' },
      { id: 'dm-q9', topicId: 'dm-t13', subjectId: 'dm', unitId: 'dm-u4', year: 2023, marks: 7, type: 'long', questionText: 'Explain homomorphism and isomorphism in groups with examples.' },
      { id: 'dm-q10', topicId: 'dm-t5', subjectId: 'dm', unitId: 'dm-u2', year: 2023, marks: 7, type: 'long', questionText: 'In how many ways can 10 identical balls be distributed in 4 distinct boxes?' },
      { id: 'dm-q11', topicId: 'dm-t7', subjectId: 'dm', unitId: 'dm-u2', year: 2022, marks: 10, type: 'long', questionText: 'Solve the recurrence relation for Fibonacci sequence using characteristic equation.' },
      { id: 'dm-q12', topicId: 'dm-t11', subjectId: 'dm', unitId: 'dm-u3', year: 2022, marks: 7, type: 'long', questionText: 'State and prove the five-color theorem for planar graphs.' },
      { id: 'dm-q13', topicId: 'dm-t15', subjectId: 'dm', unitId: 'dm-u4', year: 2022, marks: 7, type: 'long', questionText: 'Explain lattice with examples. What is a complemented lattice?' },
      { id: 'dm-q14', topicId: 'dm-t1', subjectId: 'dm', unitId: 'dm-u1', year: 2021, marks: 7, type: 'long', questionText: 'Prove that every equivalence relation partitions a set into equivalence classes.' },
      { id: 'dm-q15', topicId: 'dm-t7', subjectId: 'dm', unitId: 'dm-u2', year: 2021, marks: 10, type: 'long', questionText: 'Solve a_n - 7a_{n-1} + 12a_{n-2} = 0 with initial conditions a_0=2, a_1=7.' },
      { id: 'dm-q16', topicId: 'dm-t17', subjectId: 'dm', unitId: 'dm-u5', year: 2021, marks: 7, type: 'long', questionText: 'Explain modular arithmetic. Solve 7x ≡ 3 (mod 11).' },
      { id: 'dm-q17', topicId: 'dm-t7', subjectId: 'dm', unitId: 'dm-u2', year: 2020, marks: 10, type: 'long', questionText: 'Find the particular and general solutions of a_n = 2a_{n-1} + 3n.' },
      { id: 'dm-q18', topicId: 'dm-t12', subjectId: 'dm', unitId: 'dm-u3', year: 2020, marks: 7, type: 'long', questionText: "Find minimum spanning tree using Kruskal's algorithm for a given weighted graph." },
      { id: 'dm-q19', topicId: 'dm-t13', subjectId: 'dm', unitId: 'dm-u4', year: 2020, marks: 7, type: 'long', questionText: 'Prove that the set of non-zero rationals under multiplication is a group.' },
      { id: 'dm-q20', topicId: 'dm-t2', subjectId: 'dm', unitId: 'dm-u1', year: 2020, marks: 2, type: 'short', questionText: 'Write the truth table for XOR and XNOR operations.' },
    ],
  },

  // ── Technical Communication PYQs ──
  {
    subjectId: 'tc',
    dataLabel: 'Sample dataset — not official AKTU data',
    totalYears: 5,
    years: [2020, 2021, 2022, 2023, 2024],
    questions: [
      { id: 'tc-q1', topicId: 'tc-t3', subjectId: 'tc', unitId: 'tc-u1', year: 2024, marks: 7, type: 'long', questionText: 'Write a technical report on a given topic following proper format.' },
      { id: 'tc-q2', topicId: 'tc-t1', subjectId: 'tc', unitId: 'tc-u1', year: 2024, marks: 7, type: 'long', questionText: 'Explain the communication process model and barriers to communication.' },
      { id: 'tc-q3', topicId: 'tc-t4', subjectId: 'tc', unitId: 'tc-u2', year: 2024, marks: 7, type: 'long', questionText: 'List guidelines for an effective technical presentation.' },
      { id: 'tc-q4', topicId: 'tc-t3', subjectId: 'tc', unitId: 'tc-u1', year: 2023, marks: 7, type: 'long', questionText: 'What are the components of a technical report? Explain with format.' },
      { id: 'tc-q5', topicId: 'tc-t5', subjectId: 'tc', unitId: 'tc-u2', year: 2023, marks: 7, type: 'long', questionText: 'List do\'s and don\'ts for a group discussion.' },
      { id: 'tc-q6', topicId: 'tc-t1', subjectId: 'tc', unitId: 'tc-u1', year: 2022, marks: 7, type: 'long', questionText: 'Discuss different types of communication with examples.' },
      { id: 'tc-q7', topicId: 'tc-t3', subjectId: 'tc', unitId: 'tc-u1', year: 2021, marks: 7, type: 'long', questionText: 'Write a project report following IEEE format.' },
      { id: 'tc-q8', topicId: 'tc-t1', subjectId: 'tc', unitId: 'tc-u1', year: 2020, marks: 7, type: 'long', questionText: 'Explain verbal and non-verbal communication.' },
    ],
  },
];

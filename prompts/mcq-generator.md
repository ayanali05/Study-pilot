# Prompt: MCQ & Practice Question Generator
Version: 1.0.0
Author: StudyTrack AI Team

## Purpose
Generates high-yield practice questions mimicking AKTU semester exam patterns for a specific topic, adhering to student difficulty and accuracy level.

## Input Schema (JSON)
```json
{
  "topicId": "string",
  "topicName": "string",
  "subjectCode": "string",
  "difficulty": "easy" | "medium" | "hard",
  "userAccuracy": 0.75
}
```

## Output Schema (JSON)
```json
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctIndex": 0,
  "explanation": "string",
  "difficulty": "easy" | "medium" | "hard",
  "topicId": "string",
  "aiGenerated": true
}
```

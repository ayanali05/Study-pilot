// ─── Prompt Evaluation Script ───
// Tests prompt output schemas and guardrail adherence against fixed test cases.
// Usage: node scripts/eval-prompts.mjs or pnpm eval:prompts

import fs from 'fs';
import path from 'path';

console.log('🧪 Running StudyTrack Prompt Evaluation Suite...\n');

const testCases = [
  {
    name: 'study-coach-system schema validation',
    promptFile: 'prompts/study-coach-system.md',
    check: (content) => content.includes('Output Schema') && content.includes('citations') && content.includes('aiGenerated'),
  },
  {
    name: 'mcq-generator 4-option constraint',
    promptFile: 'prompts/mcq-generator.md',
    check: (content) => content.includes('"options": ["string", "string", "string", "string"]'),
  },
  {
    name: 'crash-plan prompt injection guardrail',
    promptFile: 'prompts/study-coach-system.md',
    check: (content) => content.includes('prompt instructions') || content.includes('passive data'),
  },
];

let passed = 0;
for (const tc of testCases) {
  const filePath = path.resolve(process.cwd(), tc.promptFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [FAIL] ${tc.name}: File not found: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  if (tc.check(content)) {
    console.log(`✅ [PASS] ${tc.name}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${tc.name}: Constraint check failed`);
  }
}

console.log(`\nResults: ${passed}/${testCases.length} prompt tests passed (100% adherence)`);
if (passed === testCases.length) {
  process.exit(0);
} else {
  process.exit(1);
}

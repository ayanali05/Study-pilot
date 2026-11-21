const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Universal Build Runner started in:', process.cwd());

// Determine where we are
if (fs.existsSync(path.join(process.cwd(), 'studytrack', 'apps', 'web'))) {
  // We are at repository root
  console.log('📂 Running from repository root. Navigating to studytrack...');
  process.chdir(path.join(process.cwd(), 'studytrack'));
  execSync('pnpm --filter @studytrack/web build', { stdio: 'inherit' });
  // Mirror .next to studytrack/apps/web/.next and root .next
  const builtNext = path.join(process.cwd(), 'apps', 'web', '.next');
  const rootNext = path.join(process.cwd(), '..', '.next');
  const studytrackNext = path.join(process.cwd(), '.next');
  try {
    if (fs.existsSync(builtNext)) {
      if (!fs.existsSync(studytrackNext)) fs.cpSync(builtNext, studytrackNext, { recursive: true });
      if (!fs.existsSync(rootNext)) fs.cpSync(builtNext, rootNext, { recursive: true });
    }
  } catch (e) {
    console.log('Note on mirror:', e.message);
  }
} else if (fs.existsSync(path.join(process.cwd(), 'apps', 'web'))) {
  // We are inside studytrack/
  console.log('📂 Running from studytrack root. Executing build...');
  execSync('pnpm --filter @studytrack/web build', { stdio: 'inherit' });
  const builtNext = path.join(process.cwd(), 'apps', 'web', '.next');
  const targetNext = path.join(process.cwd(), '.next');
  try {
    if (fs.existsSync(builtNext) && !fs.existsSync(targetNext)) {
      fs.cpSync(builtNext, targetNext, { recursive: true });
    }
  } catch (e) {
    console.log('Note on mirror:', e.message);
  }
} else {
  // We are inside studytrack/apps/web/
  console.log('📂 Running from apps/web. Executing Next.js build directly...');
  execSync('npx next build', { stdio: 'inherit' });
}

console.log('🎉 Universal Build completed successfully!');

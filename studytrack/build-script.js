const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Build script started in:', process.cwd());

// If we are at repo root, change into studytrack
if (fs.existsSync(path.join(process.cwd(), 'studytrack', 'apps', 'web'))) {
  console.log('📂 Detected repo root. Navigating to studytrack...');
  process.chdir(path.join(process.cwd(), 'studytrack'));
}

console.log('📦 Executing Next.js build in:', process.cwd());

// Run the build
execSync('pnpm --filter @studytrack/web build', { stdio: 'inherit' });

// Mirror .next so Vercel finds it regardless of outputDirectory configuration
const webNext = path.join(process.cwd(), 'apps', 'web', '.next');
if (fs.existsSync(webNext)) {
  const rootNext = path.join(process.cwd(), '.next');
  try {
    if (!fs.existsSync(rootNext)) {
      fs.cpSync(webNext, rootNext, { recursive: true });
      console.log('✅ Mirrored .next to root directory for Vercel');
    }
  } catch (err) {
    console.warn('Mirroring note:', err.message);
  }
}

console.log('🎉 Build completed successfully!');

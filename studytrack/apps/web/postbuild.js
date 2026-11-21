const fs = require('fs');
const path = require('path');

try {
  const src = path.join(__dirname, '.next');
  if (fs.existsSync(src)) {
    // 1. Mirror into nested studytrack/apps/web/.next so Vercel never fails on doubled path
    const nested = path.join(__dirname, 'studytrack', 'apps', 'web', '.next');
    fs.mkdirSync(path.dirname(nested), { recursive: true });
    if (!fs.existsSync(nested)) {
      fs.cpSync(src, nested, { recursive: true });
      console.log('✅ Mirrored .next to nested studytrack/apps/web/.next');
    }

    // 2. Mirror to studytrack/.next
    const studytrackNext = path.join(__dirname, '..', '..', '.next');
    if (!fs.existsSync(studytrackNext)) {
      fs.cpSync(src, studytrackNext, { recursive: true });
      console.log('✅ Mirrored .next to studytrack root');
    }
  }
} catch (e) {
  console.log('Postbuild mirror note:', e.message);
}

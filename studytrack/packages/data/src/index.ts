// ─── @studytrack/data barrel export ───
export * from './schemas.js';
export * from './config.js';
export { syllabusData } from './seed/syllabus.js';
export { pyqDataSets } from './seed/pyq-data.js';
export {
  demoProgress,
  demoSessions,
  demoTestResults,
  demoUserStats,
  demoFlashcards,
  demoBookmarks,
} from './seed/demo-progress.js';
export { createDataService, getDataService, type DataService } from './data-service.js';

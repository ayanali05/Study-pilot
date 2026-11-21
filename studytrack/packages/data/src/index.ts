// ─── @studytrack/data barrel export ───
export * from './schemas';
export * from './config';
export { syllabusData } from './seed/syllabus';
export { pyqDataSets } from './seed/pyq-data';
export {
  demoProgress,
  demoSessions,
  demoTestResults,
  demoUserStats,
  demoFlashcards,
  demoBookmarks,
  demoTodoTasks,
} from './seed/demo-progress';
export { createDataService, getDataService, type DataService } from './data-service';

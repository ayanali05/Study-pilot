-- ─── StudyTrack Supabase Migration ───
-- Creates all tables for the platform. RLS policies support both
-- demo mode (single demo user, no auth) and authenticated mode.

-- Enable pgvector extension for semantic search (AI Coach RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- ─── Users ───
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'CSE',
  semester INT NOT NULL DEFAULT 3,
  university TEXT NOT NULL DEFAULT 'AKTU',
  enrollment_year INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Subject Progress ───
CREATE TABLE IF NOT EXISTS subject_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  internal_marks NUMERIC(4,1),
  confidence INT DEFAULT 3 CHECK (confidence BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject_id)
);

-- ─── Topic Progress ───
CREATE TABLE IF NOT EXISTS topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  covered BOOLEAN DEFAULT false,
  covered_at TIMESTAMPTZ,
  confidence INT CHECK (confidence BETWEEN 1 AND 5),
  notes TEXT,
  time_spent INT DEFAULT 0, -- minutes
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

-- ─── Study Sessions ───
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  title TEXT,
  subject_id TEXT,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_minutes NUMERIC(8,2) DEFAULT 0,
  youtube_data JSONB,
  focus_session BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Test Results ───
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('static', 'ai-generated')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  accuracy NUMERIC(4,3) NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  duration_minutes NUMERIC(8,2),
  questions JSONB NOT NULL DEFAULT '[]',
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Flashcards ───
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  ease_factor NUMERIC(4,2) DEFAULT 2.5,
  interval INT DEFAULT 0,
  repetitions INT DEFAULT 0,
  next_review_date TIMESTAMPTZ,
  last_review_date TIMESTAMPTZ,
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Bookmarks ───
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  subject_id TEXT,
  topic_id TEXT,
  notes TEXT,
  "timestamp" INT, -- YouTube timestamp in seconds
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── User Stats / Gamification ───
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  total_study_minutes NUMERIC(10,2) DEFAULT 0,
  total_sessions_count INT DEFAULT 0,
  badges JSONB DEFAULT '[]',
  daily_study_map JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Embeddings for RAG (AI Coach) ───
CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type TEXT NOT NULL CHECK (source_type IN ('topic', 'pyq', 'note')),
  source_id TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(384), -- matches transformers.js all-MiniLM-L6-v2 output
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_embeddings_source ON embeddings(source_type, source_id);

-- ─── RLS Policies ───
-- These work in both demo mode (no auth) and authenticated mode.
-- In demo mode: all rows are accessible (no auth.uid() check).
-- In auth mode: users can only access their own data.

-- Note: Enable RLS on each table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;

-- Demo mode: allow all access (anon key)
-- When AUTH_ENABLED, replace these with auth.uid() policies
CREATE POLICY "demo_all_access" ON users FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON subject_progress FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON topic_progress FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON study_sessions FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON test_results FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON flashcards FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON bookmarks FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON user_stats FOR ALL USING (true);
CREATE POLICY "demo_all_access" ON embeddings FOR ALL USING (true);

-- ─── Realtime ───
-- Enable realtime for study_sessions so extension → dashboard sync works
ALTER PUBLICATION supabase_realtime ADD TABLE study_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE topic_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE user_stats;

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_sessions_user ON study_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_review ON flashcards(user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id, subject_id);

-- Seed demo user
INSERT INTO users (id, name, branch, semester, university, enrollment_year)
VALUES ('00000000-0000-0000-0000-000000000001', 'DEEPAK PANDEY', 'CSE', 3, 'AKTU', 2025)
ON CONFLICT DO NOTHING;

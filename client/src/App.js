import { useState } from 'react';
import { API_BASE } from './constants';
import SetupScreen from './components/SetupScreen';
import LearningPathScreen from './components/LearningPathScreen';
import LoadingSpinner from './components/LoadingSpinner';

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || res.statusText || 'Request failed');
  }
  return data;
}

function App() {
  const [screen, setScreen] = useState('setup');
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [weeks, setWeeks] = useState(8);
  const [path, setPath] = useState(null);
  const [loadingPath, setLoadingPath] = useState(false);
  const [pathError, setPathError] = useState(null);

  const generatePath = async () => {
    setPathError(null);
    setLoadingPath(true);
    try {
      const data = await postJson(`${API_BASE}/api/generate-path`, {
        skill: skill.trim(),
        level,
        weeks,
      });
      setPath(data);
      setScreen('path');
    } catch (e) {
      setPathError(e.message || 'Failed to generate path');
    } finally {
      setLoadingPath(false);
    }
  };

  const fetchResources = async (skillName, topic) => {
    const data = await postJson(`${API_BASE}/api/generate-resources`, {
      skill: skillName,
      topic,
    });
    return Array.isArray(data.resources) ? data.resources : [];
  };

  const startOver = () => {
    setScreen('setup');
    setPath(null);
    setPathError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <header className="relative border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              AI Learning Path
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">Personalized roadmaps, powered by AI</p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {screen === 'setup' && (
          <>
            <SetupScreen
              skill={skill}
              setSkill={setSkill}
              level={level}
              setLevel={setLevel}
              weeks={weeks}
              setWeeks={setWeeks}
              loading={loadingPath}
              error={pathError}
              onSubmit={generatePath}
              onDismissError={() => setPathError(null)}
            />
            {loadingPath && <LoadingSpinner label="Building your learning path…" />}
          </>
        )}

        {screen === 'path' && path && (
          <LearningPathScreen
            path={path}
            skill={skill.trim()}
            onStartOver={startOver}
            onFetchResources={fetchResources}
          />
        )}
      </main>
    </div>
  );
}

export default App;

import { useState } from 'react';
import WeekCard from './WeekCard';
import ErrorBanner from './ErrorBanner';

function LearningPathScreen({
  path,
  skill,
  onStartOver,
  onFetchResources,
}) {
  const weeks = Array.isArray(path.weeks) ? path.weeks : [];
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    weeks.forEach((_, i) => {
      init[i] = i === 0;
    });
    return init;
  });
  const [detailByIndex, setDetailByIndex] = useState({});

  const toggle = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleGetResources = async (index, topic) => {
    setDetailByIndex((prev) => ({
      ...prev,
      [index]: { ...prev[index], loading: true, error: null },
    }));
    try {
      const resources = await onFetchResources(skill, topic);
      setDetailByIndex((prev) => ({
        ...prev,
        [index]: { loading: false, error: null, items: resources },
      }));
    } catch (e) {
      setDetailByIndex((prev) => ({
        ...prev,
        [index]: {
          loading: false,
          error: e.message || 'Failed to load resources',
          items: prev[index]?.items,
        },
      }));
    }
  };

  const dismissError = (index) => {
    setDetailByIndex((prev) => ({
      ...prev,
      [index]: { ...prev[index], error: null },
    }));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90">
            Your learning path
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            {path.title || 'Learning path'}
          </h2>
          {path.description && (
            <p className="mt-3 text-slate-400 leading-relaxed">{path.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onStartOver}
          className="shrink-0 rounded-xl border border-slate-600 bg-slate-800/80 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
        >
          Start Over
        </button>
      </div>

      <div className="space-y-4">
        {weeks.map((week, index) => {
          const d = detailByIndex[index] || {};
          return (
            <WeekCard
              key={index}
              week={week}
              skill={skill}
              expanded={!!expanded[index]}
              onToggleExpand={() => toggle(index)}
              detailedResources={d.items}
              loadingResources={!!d.loading}
              resourcesError={d.error}
              onGetResources={() => handleGetResources(index, week.topic || '')}
              onDismissResourcesError={() => dismissError(index)}
            />
          );
        })}
      </div>

      {weeks.length === 0 && (
        <ErrorBanner message="No weeks returned. Try generating again." />
      )}
    </div>
  );
}

export default LearningPathScreen;

import ResourceTypeBadge from './ResourceTypeBadge';
import LoadingSpinner from './LoadingSpinner';
import ErrorBanner from './ErrorBanner';

function WeekCard({
  week,
  skill,
  expanded,
  onToggleExpand,
  detailedResources,
  loadingResources,
  resourcesError,
  onGetResources,
  onDismissResourcesError,
}) {
  const w = week.week ?? week;
  const topic = week.topic || 'Topic';
  const desc = week.description || '';
  const resources = Array.isArray(week.resources) ? week.resources : [];
  const project = week.project || '';

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/50 shadow-lg backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-800/40"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-300">
              {w}
            </span>
            <h3 className="font-display text-lg font-semibold text-white">{topic}</h3>
          </div>
          {!expanded && desc && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">{desc}</p>
          )}
        </div>
        <span className="shrink-0 text-slate-500 transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="border-t border-slate-700/60 px-5 pb-5 pt-2">
          {desc && <p className="text-sm leading-relaxed text-slate-300">{desc}</p>}

          {resources.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Path resources
              </h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-400">
                {resources.map((r, i) => (
                  <li key={i}>{typeof r === 'string' ? r : r.title || JSON.stringify(r)}</li>
                ))}
              </ul>
            </div>
          )}

          {project && (
            <div className="mt-4 rounded-xl border border-violet-500/25 bg-violet-950/30 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
                Project idea
              </h4>
              <p className="mt-1 text-sm text-slate-200">{project}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onGetResources();
              }}
              disabled={loadingResources}
              className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20 disabled:opacity-50"
            >
              {loadingResources ? 'Loading…' : 'Get Resources'}
            </button>
          </div>

          {resourcesError && (
            <div className="mt-3">
              <ErrorBanner message={resourcesError} onDismiss={onDismissResourcesError} />
            </div>
          )}

          {loadingResources && <LoadingSpinner label="Finding resources…" />}

          {!loadingResources && detailedResources && detailedResources.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Curated resources
              </h4>
              <ul className="space-y-3">
                {detailedResources.map((r, i) => (
                  <li
                    key={`${r.url}-${i}`}
                    className="rounded-xl border border-slate-700/80 bg-slate-950/50 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <ResourceTypeBadge type={r.type} />
                      <a
                        href={r.url && r.url !== '#' ? r.url : `https://www.google.com/search?q=${encodeURIComponent(r.title + ' ' + skill)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        {r.title}
                      </a>
                    </div>
                    {r.description && (
                      <p className="mt-2 text-sm text-slate-400">{r.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default WeekCard;

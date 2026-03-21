const TYPE_STYLES = {
  article: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/40',
  video: 'bg-rose-500/20 text-rose-300 ring-rose-500/40',
  course: 'bg-amber-500/20 text-amber-200 ring-amber-500/40',
  book: 'bg-violet-500/20 text-violet-200 ring-violet-500/40',
};

function ResourceTypeBadge({ type }) {
  const key = String(type || '').toLowerCase();
  const className = TYPE_STYLES[key] || 'bg-slate-500/20 text-slate-300 ring-slate-500/40';
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${className}`}
    >
      {key || 'other'}
    </span>
  );
}

export default ResourceTypeBadge;

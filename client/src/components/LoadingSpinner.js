function LoadingSpinner({ label = 'Thinking…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-cyan-400"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

export default LoadingSpinner;

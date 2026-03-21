function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/50 px-4 py-3 text-red-200"
    >
      <span className="mt-0.5 text-lg" aria-hidden>
        ⚠
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Something went wrong</p>
        <p className="mt-1 text-sm text-red-300/90">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-lg px-2 py-1 text-xs text-red-300 hover:bg-red-900/50"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;

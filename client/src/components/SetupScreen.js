import ErrorBanner from './ErrorBanner';

function SetupScreen({
  skill,
  setSkill,
  level,
  setLevel,
  weeks,
  setWeeks,
  loading,
  error,
  onSubmit,
  onDismissError,
}) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
          Plan your path
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Pick a skill, level, and timeline. We’ll draft a week-by-week roadmap.
        </p>

        <ErrorBanner message={error} onDismiss={onDismissError} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mt-6 space-y-5"
        >
          <div>
            <label htmlFor="skill" className="mb-1.5 block text-sm font-medium text-slate-300">
              Skill
            </label>
            <input
              id="skill"
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. React, Python, UX design"
              className="w-full rounded-xl border border-slate-600 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="level" className="mb-1.5 block text-sm font-medium text-slate-300">
              Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full cursor-pointer rounded-xl border border-slate-600 bg-slate-950/80 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              disabled={loading}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="weeks" className="mb-1.5 block text-sm font-medium text-slate-300">
              Duration (weeks)
            </label>
            <select
              id="weeks"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="w-full cursor-pointer rounded-xl border border-slate-600 bg-slate-950/80 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              disabled={loading}
            >
              <option value={4}>4 weeks</option>
              <option value={8}>8 weeks</option>
              <option value={12}>12 weeks</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !skill.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/40 transition hover:from-cyan-400 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Generate Learning Path'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetupScreen;

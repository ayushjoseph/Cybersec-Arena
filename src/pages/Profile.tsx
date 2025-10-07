import { useProgress, defaultProgress } from '../lib/progress';

export default function Profile() {
  const { state, reset, setState } = useProgress();
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cybersec-arena-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setState({ ...defaultProgress, ...parsed });
      } catch {
        alert('Invalid progress file.');
      }
    };
    reader.readAsText(file);
  };
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Profile</h1>
      <div className="border border-slate-800 rounded-lg p-4 bg-white/[0.03] space-y-3">
        <p className="text-sm text-slate-400">Local profile and progress. Supabase auth can be added later.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={reset} className="px-3 py-1 text-sm rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/30">Reset Progress</button>
          <button onClick={exportData} className="px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">Export Progress</button>
          <label className="px-3 py-1 text-sm rounded bg-white/5 border border-slate-800 cursor-pointer">
            Import Progress
            <input type="file" accept="application/json" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importData(f);
            }} />
          </label>
        </div>
      </div>
    </div>
  );
}

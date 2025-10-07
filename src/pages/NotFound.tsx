import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-3">
      <h1 className="text-3xl font-bold text-fuchsia-400">404</h1>
      <p className="text-slate-400">The page you are looking for does not exist.</p>
      <Link to="/" className="px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">Back to Dashboard</Link>
    </div>
  );
}

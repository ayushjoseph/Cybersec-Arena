export default function PhishHunt() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Phish Hunt</h1>
      <p className="text-slate-400">Analyze emails, detect phishing links, and learn social engineering tells.</p>
      <div className="border border-slate-800 rounded-lg p-4 bg-white/[0.03]">
        <p className="text-sm text-slate-400">Inbox simulation with headers and URL parsing coming soon.</p>
        <button className="mt-3 px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">Start Investigation</button>
      </div>
    </div>
  );
}

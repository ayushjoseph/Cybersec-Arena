export default function CTF() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-cyan-300">CTF Challenges</h1>
      <p className="text-slate-400">Practice Web, Cryptography, Forensics, Reverse Engineering, and Binary Exploitation.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Web Exploitation','Cryptography','Forensics','Reverse Engineering','Binary Exploitation'].map((cat) => (
          <div key={cat} className="border border-slate-800 rounded-lg p-4 bg-white/[0.03]">
            <h3 className="font-semibold text-fuchsia-300">{cat}</h3>
            <p className="text-sm text-slate-400">Beginner-friendly tasks with hints and writeups.</p>
            <button className="mt-3 px-3 py-1 text-sm rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">Start</button>
          </div>
        ))}
      </div>
    </div>
  );
}

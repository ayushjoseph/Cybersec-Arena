export default function Tutorials() {
  const items = [
    { title: 'Intro to Web Exploitation', level: 'Beginner' },
    { title: 'Crypto 101: Classic Ciphers', level: 'Beginner' },
    { title: 'Forensics Basics: PCAPs', level: 'Beginner' },
  ];
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Tutorials & Hints</h1>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.title} className="border border-slate-800 rounded p-3 bg-white/[0.03]">
            <div className="font-semibold text-fuchsia-300">{it.title}</div>
            <div className="text-xs text-slate-400">{it.level}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

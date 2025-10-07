export default function NewsFeed() {
  const items = [
    { title: 'New OWASP Top 10 Update', source: 'OWASP', link: '#' },
    { title: 'Supply Chain Attack Trends 2025', source: 'Security Weekly', link: '#' },
    { title: 'Phishing Techniques Evolve', source: 'CISA', link: '#' },
  ];
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold text-cyan-300">Cybersecurity News</h1>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.title} className="border border-slate-800 rounded p-3 bg-white/[0.03]">
            <a href={it.link} className="text-cyan-300 hover:underline">{it.title}</a>
            <p className="text-xs text-slate-400">Source: {it.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

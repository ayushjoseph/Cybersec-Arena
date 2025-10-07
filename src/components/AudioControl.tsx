import { useEffect, useRef, useState } from 'react';

export default function AudioControl() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const [on, setOn] = useState(false);
  const [volume, setVolume] = useState(0.02);

  const start = async () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
    }
    const ctx = audioCtxRef.current!;
    await ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = volume;
    gainRef.current = gain;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 110; // low drone A2
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 221; // slight detune

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    osc1Ref.current = osc1;
    osc2Ref.current = osc2;
    setOn(true);
  };

  const stop = () => {
    osc1Ref.current?.stop();
    osc2Ref.current?.stop();
    osc1Ref.current?.disconnect();
    osc2Ref.current?.disconnect();
    gainRef.current?.disconnect();
    osc1Ref.current = null;
    osc2Ref.current = null;
    gainRef.current = null;
    setOn(false);
  };

  useEffect(() => {
    return () => {
      stop();
      audioCtxRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        onClick={() => (on ? stop() : start())}
        className={`px-2 py-1 rounded border ${
          on
            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30'
            : 'bg-white/5 hover:bg-white/10 border-white/10'
        }`}
        title="Ambient cyberpunk drone"
      >
        {on ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        min={0}
        max={0.1}
        step={0.005}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="accent-cyan-400"
        title="Volume"
      />
    </div>
  );
}

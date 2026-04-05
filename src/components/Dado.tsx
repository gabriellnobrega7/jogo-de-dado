import Image from 'next/image';
import { useEffect, useState } from 'react';

type DadoProps = {
  valor: number;
};

const clampValor = (valor: number) => Math.min(6, Math.max(1, valor));

export default function Dado({ valor }: DadoProps) {
  const [animating, setAnimating] = useState(false);
  const safeValor = clampValor(valor);

  useEffect(() => {
    setAnimating(true);
    const timeout = window.setTimeout(() => setAnimating(false), 500);
    return () => window.clearTimeout(timeout);
  }, [valor]);

  return (
    <div
      className={`flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-500 bg-white p-2 shadow-lg shadow-slate-950/20 ${
        animating ? 'animate-dado' : ''
      }`}
    >
      <Image
        src={`/dice-${safeValor}.svg`}
        alt={`Dado ${safeValor}`}
        width={64}
        height={64}
        className="h-16 w-16"
      />
    </div>
  );
}

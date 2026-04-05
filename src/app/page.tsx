import JogoDados from '@/components/JogoDados';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Jogo de Dados</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">5 rodadas — dois jogadores</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Jogue cada jogador e veja o resultado de cada rodada.</p>
        </header>

        <JogoDados />
      </div>
    </main>
  );
}

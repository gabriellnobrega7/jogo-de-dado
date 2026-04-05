'use client';

import { useState } from 'react';
import Dado from './Dado';

type PlayerDice = [number, number];
type RoundResult = 'Ganhou' | 'Perdeu' | 'Empatou' | 'Aguardando';

const initialDice: PlayerDice = [1, 1];

function sortearDados(): PlayerDice {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

function somarDados([primeiro, segundo]: PlayerDice) {
  return primeiro + segundo;
}

function obterTextoResultado(
  partidaFinalizada: boolean,
  placar1: number,
  placar2: number,
  playerAtivo: 1 | 2,
  resultadoRodada: RoundResult,
) {
  if (partidaFinalizada) {
    if (placar1 > placar2) return 'Jogador 1 venceu a partida.';
    if (placar2 > placar1) return 'Jogador 2 venceu a partida.';
    return 'Empate geral.';
  }

  if (resultadoRodada === 'Aguardando') {
    return playerAtivo === 1 ? 'Jogue para o Jogador 1' : 'Jogue para o Jogador 2';
  }

  return resultadoRodada;
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [player1, setPlayer1] = useState<PlayerDice>(initialDice);
  const [player2, setPlayer2] = useState<PlayerDice>(initialDice);
  const [playerAtivo, setPlayerAtivo] = useState<1 | 2>(1);
  const [resultadoRodada, setResultadoRodada] = useState<RoundResult>('Aguardando');
  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [partidaFinalizada, setPartidaFinalizada] = useState(false);

  const soma1 = somarDados(player1);
  const soma2 = somarDados(player2);
  const textoResultado = obterTextoResultado(partidaFinalizada, placar1, placar2, playerAtivo, resultadoRodada);

  function finalizarRodada(novoPlayer2: PlayerDice) {
    const novaSoma2 = somarDados(novoPlayer2);
    let resultado: RoundResult = 'Empatou';

    if (soma1 > novaSoma2) {
      resultado = 'Ganhou';
      setPlacar1((valor) => valor + 1);
    } else if (novaSoma2 > soma1) {
      resultado = 'Perdeu';
      setPlacar2((valor) => valor + 1);
    } else {
      setEmpates((valor) => valor + 1);
    }

    setPlayer2(novoPlayer2);
    setResultadoRodada(resultado);

    if (rodada === 5) {
      setPartidaFinalizada(true);
      return;
    }

    setRodada((valor) => valor + 1);
    setPlayerAtivo(1);
  }

  function jogar(player: 1 | 2) {
    if (partidaFinalizada || player !== playerAtivo) return;

    if (player === 1) {
      setPlayer1(sortearDados());
      setResultadoRodada('Aguardando');
      setPlayerAtivo(2);
      return;
    }

    finalizarRodada(sortearDados());
  }

  function reiniciar() {
    setRodada(1);
    setPlayer1(initialDice);
    setPlayer2(initialDice);
    setPlayerAtivo(1);
    setResultadoRodada('Aguardando');
    setPlacar1(0);
    setPlacar2(0);
    setEmpates(0);
    setPartidaFinalizada(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Rodada</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{rodada} / 5</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Resultado</p>
            <p className="mt-1 text-sm text-slate-900">{textoResultado}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Jogador 1</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{soma1} pontos</p>
              </div>
              <button
                type="button"
                onClick={() => jogar(1)}
                disabled={partidaFinalizada || playerAtivo !== 1}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 hover:bg-slate-900"
              >
                Jogar
              </button>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Dado valor={player1[0]} />
              <Dado valor={player1[1]} />
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Jogador 2</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{soma2} pontos</p>
              </div>
              <button
                type="button"
                onClick={() => jogar(2)}
                disabled={partidaFinalizada || playerAtivo !== 2}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 hover:bg-slate-900"
              >
                Jogar
              </button>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Dado valor={player2[0]} />
              <Dado valor={player2[1]} />
            </div>
          </section>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-4 text-center text-slate-600">
            <p className="text-xs uppercase tracking-[0.24em]">Jogador 1</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{placar1}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-center text-slate-600">
            <p className="text-xs uppercase tracking-[0.24em]">Empates</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{empates}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-center text-slate-600">
            <p className="text-xs uppercase tracking-[0.24em]">Jogador 2</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{placar2}</p>
          </div>
        </div>

        {partidaFinalizada && (
          <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-center text-slate-900 sm:flex-row sm:text-left">
            <p className="text-base font-medium">Partida finalizada — {textoResultado}</p>
            <button
              type="button"
              onClick={reiniciar}
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

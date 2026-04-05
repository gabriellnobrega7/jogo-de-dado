import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jogo de Dados',
  description: 'Partida de 5 rodadas entre dois jogadores',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

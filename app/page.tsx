'use client';

import GameController from '@/components/game-controller';
import GameIdForm from '@/components/game-id-form';

export default function Main() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 pt-16">
      <GameIdForm />
      <GameController />
    </main>
  );
}

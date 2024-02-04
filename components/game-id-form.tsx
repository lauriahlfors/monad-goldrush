'use client';

import { setNewGameId } from '@/app/actions';
import { useGameIdFromUrl } from '@/lib/hooks/useGameIdFromUrl';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export default function GameIdForm() {
  const router = useRouter();
  const gameId = useGameIdFromUrl();

  const clientAction = async (formData: FormData) => {
    // Client side validation.
    const newGameId = formData.get('gameId');
    const parse = z.string().safeParse(newGameId);

    if (!parse.success) {
      console.log('[GameID] Form validation failed.');
    } else {
      try {
        const response = await setNewGameId(parse.data);
        router.replace(`?gameId=${response}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className="border-akvamariini-500 shadow-akvamariini-900 flex h-12 w-fit overflow-hidden rounded-2xl border-2 shadow-lg"
      action={clientAction}
    >
      <label
        className="border-akvamariini-500 bg-akvamariini-900 text-akvamariini-500 flex h-full items-center justify-center border-r-2 px-4"
        htmlFor="gameId"
      >
        Enter game ID:
      </label>
      <input
        className="text-akvamariini-50 bg-akvamariini-950 w-80 px-2 leading-[48px] backdrop-blur-xl"
        type="text"
        id="gameId"
        name="gameId"
        defaultValue={gameId}
        required
      />
      <button
        className="border-akvamariini-500 bg-akvamariini-50 text-akvamariini-500 hover:bg-akvamariini-300 hover:text-akvamariini-50 flex items-center justify-center border-l-2 px-8 py-3"
        type="submit"
      >
        Set
      </button>
    </form>
  );
}

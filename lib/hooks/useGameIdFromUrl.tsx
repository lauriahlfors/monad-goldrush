'use';

import { useSearchParams } from 'next/navigation';
import { z } from 'zod';

// Get the game id from the url.
export const useGameIdFromUrl = (): string => {
  const urlParams = useSearchParams();

  const gameId = urlParams.get('gameId');
  const parse = z.string().safeParse(gameId);

  if (!parse.success) {
    return '';
  } else {
    return parse.data;
  }
};

'use server';

import {
  createNewGame,
  getGameInstance,
  sendGameAction,
} from '@/lib/game/gameActions';
import { Action } from '@/types';
import { ActionSchema } from '@/zod.schemas';

/**
 *
 * @returns game id string
 */
export async function serverCreateNewGame(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await createNewGame();

      // Return game id string.
      resolve(response.entityId);
    } catch (error) {
      console.log(error);

      // Return empty string.
      reject('');
    }
  });
}

export async function setNewGameId(gameId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getGameInstance(gameId);

      // Return game id string.
      resolve(response.entityId);
    } catch (error) {
      console.log(error);

      // Return empty string.
      resolve('');
    }
  });
}

export async function serverSendUserAction(gameId: string, userAction: Action) {
  // Action parser
  const parse = ActionSchema.safeParse(userAction);

  // Action validation.
  if (!parse.success) {
    console.log('[UserAction] Failed validation.');
  } else {
    try {
      sendGameAction(gameId, userAction);
    } catch (error) {
      console.log(error);
    }
  }
}

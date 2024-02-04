'use server';

import {
  createNewGame,
  getGameInstance,
  sendGameAction,
} from '@/lib/game/gameActions';
import { Action } from '@/types';
import { ActionSchema } from '@/zod.schemas';

export async function serverCreateNewGame() {
  try {
    const result = await createNewGame();
    console.log(`[GameInstance] Created new game with id: ${result.entityId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function serverSendUserAction(gameId: string, userAction: Action) {
  // Action parser
  const parse = ActionSchema.safeParse(userAction);

  // Action validation.
  if (!parse.success) {
    console.log('[Action]' + parse.error.message);
  } else {
    try {
      sendGameAction(gameId, userAction);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function setNewGameId(gameId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getGameInstance(gameId);

      resolve(response.entityId);
    } catch (error) {
      console.log(error);
      resolve('');
    }
  });
}

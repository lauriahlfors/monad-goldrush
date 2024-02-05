import { Action, GameInstance, Message, NoWayOutState } from '@/types';
import {
  GameInstanceSchema,
  NoWayOutStateSchema,
  RotationSchema,
} from '@/zod.schemas';
import { stringifyMessage } from './stringifyMessage';
import { wallDetect } from './wallDetect';

const GOLDRUSH_BACKEND = process.env.GOLDRUSH_BACKEND ?? '';
const PLAYER_TOKEN = process.env.PLAYER_TOKEN ?? '';
const LEVEL_ID = process.env.LEVEL_ID ?? '';

/**
 * Send user action to the game server using WebSocket connection.
 * @param gameId
 * @param userAction
 */
export async function sendGameAction(gameId: string, userAction: Action) {
  const gameState: NoWayOutState = await getGameState(gameId);
  const walls = wallDetect(gameState.square);

  const wsSendCommand = (action: Action) => {
    // Create new WebSocket connection.
    const ws = new WebSocket(`wss://${GOLDRUSH_BACKEND}/${PLAYER_TOKEN}/`);

    ws.addEventListener('open', () => {
      ws.send(
        stringifyMessage('run-command', {
          gameId: gameId,
          payload: action,
        })
      );
      ws.close();
    });

    ws.addEventListener('close', () => {
      console.log('[WebSocket] Closed [GameAction] connection.');
    });
  };

  // Procesess users action.
  switch (userAction.action) {
    case 'rotate': {
      // Init rotation parser.
      const rotationParse = RotationSchema.safeParse(userAction.rotation);

      // Rotation & wall validation.
      // If it is possible to move to users selected rotation direction, rotate player.
      if (rotationParse.success && !walls[rotationParse.data]) {
        console.log(userAction.rotation);
        wsSendCommand({
          action: userAction.action,
          rotation: rotationParse.data,
        });
      }
      break;
    }
    case 'move':
    case 'reset': {
      // Wall validation.
      // If players current rotation direction allows for a movement, move player.
      if (!walls[gameState.player.rotation]) {
        wsSendCommand({
          action: userAction.action,
        });
      }
      break;
    }
  }
}

/**
 * Get game state data from the game instance data, based on the given game id.
 * @param gameId
 * @returns Game state data.
 */

export async function getGameState(gameId: string): Promise<NoWayOutState> {
  return new Promise(async (resolve, reject) => {
    try {
      const gameInstance = await getGameInstance(gameId);

      const parse = NoWayOutStateSchema.safeParse(
        JSON.parse(gameInstance.gameState)
      );

      if (!parse.success) {
        reject('[GameState] Validation failed.');
      } else {
        console.log(`[GameState] Acquired game state of: ${gameId}`);
        resolve(parse.data);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

/**
 * Get game instance data from the sercer using WebSocket connection, based on the given game id.
 * @param gameId
 * @returns Game instance data.
 */
export async function getGameInstance(gameId: string): Promise<GameInstance> {
  return new Promise((resolve, reject) => {
    // Create new WebSocket conenction.
    const ws = new WebSocket(`wss://${GOLDRUSH_BACKEND}/${PLAYER_TOKEN}/`);

    ws.addEventListener('open', () => {
      console.log('[WebSocket] Opened [GameInstance] connection.');
      ws.send(stringifyMessage('sub-game', { id: gameId }));
    });

    ws.addEventListener('message', ({ data }) => {
      const [action, payload] = JSON.parse(
        data.toString()
      ) as Message<'game-instance'>;

      // Reject if action type is not "game-instance"
      if (action !== 'game-instance') {
        reject(`[GameInstance] Action is not "game-instance"`);
      }

      const parse = GameInstanceSchema.safeParse(payload);

      if (!parse.success) {
        reject(`[GameInstance] Validation failed. ${parse.error.message}`);
      } else {
        console.log(
          `[GameInstance] Acquired game instance of: ${parse.data.entityId}`
        );

        // Close the WebSocket connection.
        ws.close();

        // Return game instance data.
        resolve(parse.data);
      }
    });

    ws.addEventListener('close', () => {
      console.log(`[WebSocket] Closed [GameInstance] connection.`);
    });
  });
}

/**
 * Creates a new game instance on the server based on the game id declared in the .env file.
 * @returns Game instance data
 */
export async function createNewGame(): Promise<GameInstance> {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://${GOLDRUSH_BACKEND}/api/levels/${LEVEL_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: PLAYER_TOKEN,
        },
      }
    );

    if (!response.ok) {
      reject('[New GameInstance] Failed to create a new game instance.');
    }

    const data = await response.json();
    const parse = GameInstanceSchema.safeParse(data);

    if (!parse.success) {
      reject('[New GameInstance] Failed validation.');
    } else {
      console.log(
        `[GameInstance] Created new game with id: ${parse.data.entityId}`
      );
      resolve(parse.data);
    }
  });
}

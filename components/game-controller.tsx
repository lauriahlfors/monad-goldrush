import { serverCreateNewGame, serverSendUserAction } from '@/app/actions';
import { useGameIdFromUrl } from '@/lib/hooks/useGameIdFromUrl';
import { Action, ActionType, Rotation } from '@/types';
import { ActionSchema } from '@/zod.schemas';
import GameButton from './game-button';

export default function GameController() {
  const gameId = useGameIdFromUrl();

  const clientAction = (action: ActionType, rotation?: Rotation) => {
    const userAction: Action = {
      action: action,
      rotation: rotation,
    };

    serverSendUserAction(gameId, userAction);
  };

  const buttons: Action[] = [
    { action: 'rotate', rotation: 315 },
    { action: 'rotate', rotation: 0 },
    { action: 'rotate', rotation: 45 },
    { action: 'rotate', rotation: 270 },
    { action: 'move' },
    { action: 'rotate', rotation: 90 },
    { action: 'rotate', rotation: 225 },
    { action: 'rotate', rotation: 180 },
    { action: 'rotate', rotation: 135 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full justify-between">
        <GameButton onClick={() => serverCreateNewGame()}>
          <AddIcon />
        </GameButton>

        <GameButton onClick={() => serverCreateNewGame()}>
          <RestartIcon />
        </GameButton>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {buttons.map((button, index) => {
          const parse = ActionSchema.safeParse(button);

          if (parse.success) {
            return (
              <GameButton
                key={index}
                onClick={() =>
                  parse.data.action === 'rotate'
                    ? clientAction(parse.data.action, parse.data.rotation)
                    : clientAction(parse.data.action)
                }
              >
                {parse.data.action === 'rotate' ? (
                  <ArrowIcon rotation={parse.data.rotation} />
                ) : (
                  <RocketIcon />
                )}
              </GameButton>
            );
          }
        })}
      </div>
    </div>
  );
}

function ArrowIcon({ rotation }: { rotation: number | undefined }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6 "
        transform={`rotate(${rotation})`}
      >
        <path
          fillRule="evenodd"
          d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function RocketIcon() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fill-rule="evenodd"
          d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
          clip-rule="evenodd"
        />
        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
      </svg>
    </div>
  );
}

function RestartIcon() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
  );
}

function AddIcon() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
}

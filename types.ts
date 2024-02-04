import { z } from 'zod';
import {
  ActionButtonSchema,
  ActionSchema,
  ActionTypeSchema,
  ErrTypeSchema,
  GameIdSchema,
  GameInstanceSchema,
  LocationSchema,
  MessagesSchema,
  NoWayOutStateSchema,
  PlayerSchema,
  RotationSchema,
} from './zod.schemas';

// Translate Zod schemas in to a TypeScript types.
export type Location = z.infer<typeof LocationSchema>;
export type Rotation = z.infer<typeof RotationSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type NoWayOutState = z.infer<typeof NoWayOutStateSchema>;
export type ActionType = z.infer<typeof ActionTypeSchema>;
export type Action = z.infer<typeof ActionSchema>;
export type GameInstance = z.infer<typeof GameInstanceSchema>;
export type ErrType = z.infer<typeof ErrTypeSchema>;
export type Messages = z.infer<typeof MessagesSchema>;
export type GameId = z.infer<typeof GameIdSchema>;
export type ActionButton = z.infer<typeof ActionButtonSchema>;

export type AllowedActions = keyof Messages;
export type AllowedPayload<K extends AllowedActions> = Messages[K];
export type Message<K extends AllowedActions> = K extends AllowedActions
  ? [K, AllowedPayload<K>]
  : never;
export type AnyMessage = Message<AllowedActions>;
export type Walls = Partial<{
  [key in Rotation]: boolean;
}>;

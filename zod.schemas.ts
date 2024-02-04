import { z } from 'zod';

export const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const RotationSchema = z.union([
  z.literal(0),
  z.literal(45),
  z.literal(90),
  z.literal(135),
  z.literal(180),
  z.literal(225),
  z.literal(270),
  z.literal(315),
]);

export const PlayerSchema = z.object({
  position: LocationSchema,
  rotation: RotationSchema,
});

export const NoWayOutStateSchema = z.object({
  player: PlayerSchema,
  moves: z.number(),
  timer: z.number(),
  start: LocationSchema,
  startRotation: RotationSchema,
  target: LocationSchema,
  rows: z.number(),
  columns: z.number(),
  square: z.number(),
});

export const ActionTypeSchema = z.enum(['move', 'reset', 'rotate']);

export const ActionSchema = z.union([
  z.object({
    action: z.enum([ActionTypeSchema.enum.move, ActionTypeSchema.enum.reset]),
  }),
  z.object({
    action: z.enum([ActionTypeSchema.enum.rotate]),
    rotation: RotationSchema.optional(),
  }),
]);

export const GameInstanceSchema = z.object({
  entityId: z.string(),
  gameState: z.string(),
  ownerId: z.string(),
  status: z.string(),
  reason: z.string(),
  createdAt: z.string(),
  gameType: z.string(),
  score: z.number(),
  levelId: z.string(),
});

export const ErrTypeSchema = z.enum([
  'Forbidden',
  'Internal Server Error',
  'Bad Request',
]);

export const GameIdSchema = z.string();

export const MessagesSchema = z.object({
  'sub-game': z.object({
    id: z.string(),
  }),
  'game-instance': z.object({
    gameState: z.string(),
    status: z.string(),
    reason: z.string(),
    createdAt: z.date(),
    gameType: z.string(),
    entityId: z.string(),
  }),
  'run-command': z.object({
    gameId: z.string(),
    payload: ActionSchema,
  }),
  success: z.object({
    message: z.string(),
  }),
  failure: z.object({
    reason: ErrTypeSchema,
    desc: z.optional(z.string()),
  }),
});

export const ActionButtonSchema = z.object({
  variant: z.enum(['move', 'rotate']),
  rotation: RotationSchema.optional(),
});

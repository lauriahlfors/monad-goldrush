import { AllowedActions, AllowedPayload } from '@/types';

/**
 * Stringifies given action & payload that are then being sent to the WebSocket connection.
 * @param action
 * @param payload
 * @returns
 */
export const stringifyMessage = <K extends AllowedActions>(
  action: K,
  payload?: AllowedPayload<K>
): string => JSON.stringify([action, { ...payload }]);

import { Walls } from '@/types';

/**
 * Detects walls around the player
 * @returns boolean values for surrounding walls and wall combinations.
 */
export const wallDetect = (square: number): Walls => {
  const masks = [0b1000, 0b0100, 0b0010, 0b0001] as const;

  // Using the bitwise AND operator and logical AND operator, return boolean values of each 8 directions.
  return {
    0: (square & masks[0]) !== 0,
    45: (square & masks[0] && square & masks[1]) !== 0,
    90: (square & masks[1]) !== 0,
    135: (square & masks[1] && square & masks[2]) !== 0,
    180: (square & masks[2]) !== 0,
    225: (square & masks[2] && square & masks[3]) !== 0,
    270: (square & masks[3]) !== 0,
    315: (square & masks[3] && square & masks[0]) !== 0,
  };
};

import { TCGCard } from "../card";
import { PrimitiveEnergy } from "../dsl/energy";
import { StatusValue } from "../dsl/status";

export interface GameState {
  currentTurn: number;
  startingPlayer: 0 | 1;
  player0: PlayerState;
  player1: PlayerState;
}

export interface PlayerState {
  points: number;
  deck: TCGCard[];
  hand: TCGCard[];
  active: CardInPlay;
  bench: [CardInPlay | null, CardInPlay | null, CardInPlay | null];
  discardPile: TCGCard[];
}

export interface CardInPlay {
  // evolutionStack.at(-1) is current -- used for evolutions
  evolutionStack: (TCGCard & { cardType: "pokemon" | "itemFossil" })[];
  energy: PrimitiveEnergy[];
  currentHp: number;
  maxHp: number;
  statusEffects: Record<StatusValue, boolean>;
  attachedTool: TCGCard & { cardType: "tool" };
}

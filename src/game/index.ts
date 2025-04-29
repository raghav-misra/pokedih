import { TCGCard } from "@/types/card";
import { GameState, PlayerState } from "@/types/game";

const createInitialPlayerState = (
  deck: TCGCard[],
  hand: TCGCard[],
  initialActivePokemon: TCGCard & { cardType: "pokemon" }
): PlayerState => ({
  points: 0,
  bench: [null, null, null],
  deck,
  hand,
  discardPile: [],
  active: {
    evolutionStack: [initialActivePokemon],
    maxHp: initialActivePokemon.attributes.hp,
    currentHp: initialActivePokemon.attributes.hp,
    energy: [],
    statusEffects: {
      Asleep: false,
      Burned: false,
      Paralyzed: false,
      Poisoned: false,
    },
    attachedTool: null,
  },
});

export const createInitialGameState = (
  player0Deck: TCGCard[],
  player0Hand: TCGCard[],
  player0Active: TCGCard & { cardType: "pokemon" },
  player1Deck: TCGCard[],
  player1Hand: TCGCard[],
  player1Active: TCGCard & { cardType: "pokemon" }
): GameState => ({
  player0: createInitialPlayerState(player0Deck, player0Hand, player0Active),
  player1: createInitialPlayerState(player1Deck, player1Hand, player1Active),
  startingPlayer: Math.round(Math.random()) as 0 | 1,
  currentTurn: 0,
});

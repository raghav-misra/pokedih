import { IntegerValue } from "./integer";

export type PlayerValue = "Self" | "Opponent";

export type PlayerAction = DrawCardsAction;

export interface DrawCardsAction {
  type: "DrawCards";
  args: { 0: PlayerValue; 1: IntegerValue };
}

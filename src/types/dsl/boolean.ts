import { Action } from ".";

export type BooleanAction = IfElseAction;
export type BooleanValue = true | false | SingleCoinFlipHeadsAction;

export interface SingleCoinFlipHeadsAction {
  type: "SingleCoinFlipHeads";
}

export interface IfElseAction {
  type: "IfElse";
  args: [BooleanValue, Action, Action];
}

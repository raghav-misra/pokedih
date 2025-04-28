import { Action } from ".";
import { IntegerValue } from "./integer";

export type BooleanAction = IfElseAction;
export type BooleanValue =
  | true
  | false
  | SingleCoinFlipHeadsAction
  | AndAction
  | OrAction
  | NotAction
  | GreaterThanAction
  | GreaterThanOrEqualAction
  | LessThanAction
  | LessThanOrEqualAction;

export interface GreaterThanAction {
  type: ">";
  args: [IntegerValue, IntegerValue];
}

export interface GreaterThanOrEqualAction {
  type: ">=";
  args: [IntegerValue, IntegerValue];
}

export interface LessThanAction {
  type: "<";
  args: [IntegerValue, IntegerValue];
}

export interface LessThanOrEqualAction {
  type: "<=";
  args: [IntegerValue, IntegerValue];
}

export interface SingleCoinFlipHeadsAction {
  type: "SingleCoinFlipHeads";
}

export interface AndAction {
  type: "And";
  args: [BooleanValue, BooleanValue];
}

export interface OrAction {
  type: "Or";
  args: [BooleanValue, BooleanValue];
}

export interface NotAction {
  type: "Not";
  args: [BooleanValue];
}

export interface IfElseAction {
  type: "IfElse";
  args: [BooleanValue, Action, Action];
}

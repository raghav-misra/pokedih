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
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface GreaterThanOrEqualAction {
  type: ">=";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface LessThanAction {
  type: "<";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface LessThanOrEqualAction {
  type: "<=";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface SingleCoinFlipHeadsAction {
  type: "SingleCoinFlipHeads";
}

export interface AndAction {
  type: "And";
  args: { 0: BooleanValue; 1: BooleanValue };
}

export interface OrAction {
  type: "Or";
  args: { 0: BooleanValue; 1: BooleanValue };
}

export interface NotAction {
  type: "Not";
  args: BooleanValue;
}

export interface IfElseAction {
  type: "IfElse";
  args: { 0: BooleanValue; 1: Action; 2: Action };
}

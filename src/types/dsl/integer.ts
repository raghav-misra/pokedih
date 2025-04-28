import { BooleanValue } from "./boolean";

export type IntegerValue =
  | number
  | NumberOfFlipsUntilTailsAction
  | CountHeadsAction
  | AddAction
  | SubtractAction
  | MultiplyAction
  | FloorDivideAction
  | IfElseIntegerAction;

export interface NumberOfFlipsUntilTailsAction {
  type: "NumberOfFlipsUntilTails";
}

export interface IfElseIntegerAction {
  type: "IfElseInteger";
  args: [BooleanValue, IntegerValue, IntegerValue];
}

export interface CountHeadsAction {
  type: "CountHeads";
  args: [IntegerValue];
}

export interface AddAction {
  type: "+";
  args: [IntegerValue, IntegerValue];
}

export interface SubtractAction {
  type: "-";
  args: [IntegerValue, IntegerValue];
}

export interface MultiplyAction {
  type: "*";
  args: [IntegerValue, IntegerValue];
}

export interface FloorDivideAction {
  type: "//";
  args: [IntegerValue, IntegerValue];
}

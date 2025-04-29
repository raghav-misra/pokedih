import { BooleanAction } from "./boolean";
import { IntegerValue } from "./integer";
import { EnergyAction } from "./energy";
import { HealthAction } from "./health";
import { StatusAction } from "./status";

// DSL Action definitions
export type Action =
  | EnergyAction
  | BooleanAction
  | HealthAction
  | StatusAction
  | DoNothingAction
  | EndTurnAction
  | ChainAction
  | RepeatAction;

export interface DoNothingAction {
  type: "DoNothing";
}

export interface EndTurnAction {
  type: "EndTurn";
}

export interface ChainAction {
  type: "Chain";
  args: { 0: Action; 1: Action };
}

export interface RepeatAction {
  type: "Repeat";
  args: { 0: IntegerValue; 1: Action };
}

import { BooleanAction } from "./boolean";
import { IntegerValue } from "./integer";
import { EnergyAction } from "./energy";
import { HealthAction } from "./health";

// DSL Action definitions
export type Action =
  | EnergyAction
  | BooleanAction
  | HealthAction
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
  args: [Action, Action];
}

export interface RepeatAction {
  type: "Repeat";
  args: [IntegerValue, Action];
}

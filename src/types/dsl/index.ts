import { BooleanAction, BooleanValue } from "./boolean";
import { IntegerValue } from "./coin";
import { EnergyAction, EnergyValue } from "./energy";
import { HealthAction } from "./health";
import { MemberValue } from "./member";

// DSL Action definitions
export type Action =
  | MemberValue
  | EnergyValue
  | EnergyAction
  | BooleanValue
  | BooleanAction
  | IntegerValue
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

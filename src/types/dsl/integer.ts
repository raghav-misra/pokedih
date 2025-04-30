import { BooleanValue } from "./boolean";
import { EnergyValue } from "./energy";
import { MemberValue } from "./member";

export type IntegerValue =
  | number
  | NumberOfFlipsUntilTailsAction
  | CountHeadsAction
  | AddAction
  | SubtractAction
  | MultiplyAction
  | FloorDivideAction
  | IfElseIntegerAction
  | CountEnergyAction
  | CountEnergyOfTypeAction;

export interface NumberOfFlipsUntilTailsAction {
  type: "NumberOfFlipsUntilTails";
}

export interface IfElseIntegerAction {
  type: "IfElseInteger";
  args: { 0: BooleanValue; 1: IntegerValue; 2: IntegerValue };
}

export interface CountHeadsAction {
  type: "CountHeads";
  args: IntegerValue;
}

export interface AddAction {
  type: "+";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface SubtractAction {
  type: "-";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface MultiplyAction {
  type: "*";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface FloorDivideAction {
  type: "//";
  args: { 0: IntegerValue; 1: IntegerValue };
}

export interface CountEnergyAction {
  type: "CountEnergy";
  args: MemberValue;
}

export interface CountEnergyOfTypeAction {
  type: "CountEnergyOfType";
  args: { 0: MemberValue; 1: EnergyValue };
}

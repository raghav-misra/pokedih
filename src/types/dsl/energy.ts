import { MemberValue } from "./member";

export type EnergyAction = AttachEnergyAction | RemoveEnergyAction;

export interface AttachEnergyAction {
  type: "AttachEnergy";
  args: { 0: MemberValue; 1: EnergyValue };
}

export interface RemoveEnergyAction {
  type: "RemoveEnergy";
  args: { 0: MemberValue; 1: EnergyValue };
}

export type EnergyValue =
  | PrimitiveEnergy
  | PickEnergyAction
  | PickSpecificEnergyAction;

export interface PickEnergyAction {
  type: "PickEnergy";
  args: MemberValue;
}

export interface PickSpecificEnergyAction {
  type: "PickSpecificEnergy";
  args: MemberValue;
}

export type PrimitiveEnergy =
  | "F"
  | "C"
  | "R"
  | "G"
  | "P"
  | "D"
  | "W"
  | "Any"
  | "Basic";

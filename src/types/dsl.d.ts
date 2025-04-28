// Energy types
export type EnergyType =
  | "F"
  | "C"
  | "R"
  | "G"
  | "P"
  | "D"
  | "W"
  | "Any"
  | "Basic";

// Group types
export type Group =
  | "OpponentActivePokemon"
  | "OpponentBenchPokemon"
  | "OpponentAllPokemon"
  | "SelfActivePokemon"
  | "SelfBenchPokemon"
  | "SelfAllPokemon";

// DSL Action definitions
export type Action =
  | DoNothingAction
  | EndTurnAction
  | ChainAction
  | RepeatAction
  | ModifyHPByAction
  | ChangeMaxHPByAction
  | AttachEnergyAction
  | RemoveEnergyAction
  | PickActeeAction
  | PickMemberAction
  | PickSpecificMemberAction
  | PickEnergyAction
  | PickSpecificEnergyAction
  | SingleCoinFlipHeadsAction
  | NumberOfFlipsUntilTailsAction
  | CountHeadsAction;

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
  args: [number, Action];
}

export interface ModifyHPByAction {
  type: "ModifyHPBy";
  args: [Action, number];
}

export interface ChangeMaxHPByAction {
  type: "ChangeMaxHPBy";
  args: [Action, number];
}

export interface AttachEnergyAction {
  type: "AttachEnergy";
  args: [Action, EnergyType];
}

export interface RemoveEnergyAction {
  type: "RemoveEnergy";
  args: [Action, EnergyType];
}

export interface PickActeeAction {
  type: "PickActee";
}

export interface PickMemberAction {
  type: "PickMember";
  args: [Group];
}

export interface PickSpecificMemberAction {
  type: "PickSpecificMember";
  args: [Group];
}

export interface PickEnergyAction {
  type: "PickEnergy";
  args: [Action];
}

export interface PickSpecificEnergyAction {
  type: "PickSpecificEnergy";
  args: [Action];
}

export interface SingleCoinFlipHeadsAction {
  type: "SingleCoinFlipHeads";
}

export interface NumberOfFlipsUntilTailsAction {
  type: "NumberOfFlipsUntilTails";
}

export interface CountHeadsAction {
  type: "CountHeads";
  args: [number];
}

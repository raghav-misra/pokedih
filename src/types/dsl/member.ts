export type MemberValue =
  | PickActeeAction
  | PickRandomMemberAction
  | PickSpecificMemberAction;

export interface PickActeeAction {
  type: "PickActee";
}

export interface PickRandomMemberAction {
  type: "PickMember";
  args: Group;
}

export interface PickSpecificMemberAction {
  type: "PickSpecificMember";
  args: Group;
}

// Group types
export type Group =
  | "OpponentActivePokemon"
  | "OpponentBenchPokemon"
  | "OpponentAllPokemon"
  | "SelfActivePokemon"
  | "SelfBenchPokemon"
  | "SelfAllPokemon";

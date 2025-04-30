import { IntegerValue } from "./integer";

export type MemberValue =
  | Group
  | PickActeeAction
  | PickAllMembersAction
  | PickAnyMemberAction
  | PickNMembersOfGroupAction;

export interface PickActeeAction {
  type: "PickActee";
}

export interface PickAllMembersAction {
  type: "PickAllMembers";
  args: Group;
}

export interface PickAnyMemberAction {
  type: "PickAnyMember";
  args: Group;
}

export interface PickNMembersOfGroupAction {
  type: "PickNMembers";
  args: { 0: IntegerValue; 1: Group };
}

// Group types
export type Group =
  | "OpponentActivePokemon"
  | "OpponentBenchPokemon"
  | "OpponentAllPokemon"
  | "SelfActivePokemon"
  | "SelfBenchPokemon"
  | "SelfAllPokemon";

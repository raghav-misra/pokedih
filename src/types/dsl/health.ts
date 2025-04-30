import { IntegerValue } from "./integer";
import { MemberValue } from "./member";

export type HealthAction = DealDamageByAction | HealByAction | ChangeMaxHPByAction;

export interface DealDamageByAction {
  type: "DealDamageBy";
  args: { 0: MemberValue; 1: IntegerValue };
}

export interface HealByAction {
  type: "HealBy";
  args: { 0: MemberValue; 1: IntegerValue };
}

export interface ChangeMaxHPByAction {
  type: "ChangeMaxHPBy";
  args: { 0: MemberValue; 1: IntegerValue };
}

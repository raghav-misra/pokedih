import { IntegerValue } from "./integer";
import { MemberValue } from "./member";

export type HealthAction = ModifyHPByAction | ChangeMaxHPByAction;

export interface ModifyHPByAction {
  type: "ModifyHPBy";
  args: { 0: MemberValue; 1: IntegerValue };
}

export interface ChangeMaxHPByAction {
  type: "ChangeMaxHPBy";
  args: { 0: MemberValue; 1: IntegerValue };
}

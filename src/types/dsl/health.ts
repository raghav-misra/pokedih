import { IntegerValue } from "./integer";
import { MemberValue } from "./member";

export type HealthAction = ModifyHPByAction | ChangeMaxHPByAction;

export interface ModifyHPByAction {
  type: "ModifyHPBy";
  args: [MemberValue, IntegerValue];
}

export interface ChangeMaxHPByAction {
  type: "ChangeMaxHPBy";
  args: [MemberValue, IntegerValue];
}

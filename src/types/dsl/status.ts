import { MemberValue } from "./member";

export type StatusValue = "Burned" | "Poisoned" | "Paralyzed" | "Asleep";

export type StatusAction =
  | ApplyStatusAction
  | RemoveAllStatusAction
  | RemoveStatusAction;

export interface ApplyStatusAction {
  type: "ApplyStatus";
  args: [MemberValue, StatusValue];
}

export interface RemoveAllStatusAction {
  type: "RemoveAllStatus";
  args: [MemberValue];
}

export interface RemoveStatusAction {
  type: "RemoveStatus";
  args: [MemberValue, StatusValue];
}

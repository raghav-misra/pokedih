export type IntegerValue =
  | number
  | NumberOfFlipsUntilTailsAction
  | CountHeadsAction
  | AddAction
  | SubtractAction
  | MultiplyAction
  | FloorDivideAction;

export interface NumberOfFlipsUntilTailsAction {
  type: "NumberOfFlipsUntilTails";
}

export interface CountHeadsAction {
  type: "CountHeads";
  args: [IntegerValue];
}

export interface AddAction {
  type: "+";
  args: [IntegerValue, IntegerValue];
}

export interface SubtractAction {
  type: "-";
  args: [IntegerValue, IntegerValue];
}

export interface MultiplyAction {
  type: "*";
  args: [IntegerValue, IntegerValue];
}

export interface FloorDivideAction {
  type: "//";
  args: [IntegerValue, IntegerValue];
}

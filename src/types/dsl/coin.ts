export type IntegerValue =
  | number
  | NumberOfFlipsUntilTailsAction
  | CountHeadsAction;

export interface NumberOfFlipsUntilTailsAction {
  type: "NumberOfFlipsUntilTails";
}

export interface CountHeadsAction {
  type: "CountHeads";
  args: [IntegerValue];
}

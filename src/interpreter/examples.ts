import { Action } from "@/types/dsl";

export const manaphyOceanicGift: Action = {
  type: "Repeat",
  args: [
    2,
    {
      type: "AttachEnergy",
      args: [{ type: "PickMember", args: ["SelfBenchPokemon"] }, "W"],
    },
  ],
};

export const wugtrioExPopOutThroughout: Action = {
  type: "Repeat",
  args: [
    3,
    {
      type: "ModifyHPBy",
      args: [{ type: "PickMember", args: ["OpponentAllPokemon"] }, -50],
    },
  ],
};

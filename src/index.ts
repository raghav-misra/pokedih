import dotenv from "dotenv";
dotenv.config();

import { getAttackSchema } from "@/interpreter/test";
import { Action } from "@/types/dsl";

import { inspect } from "util";

// end turn after an attack
const makeActionAttack = (action: Action): Action => ({
  type: "Chain",
  args: [action, { type: "EndTurn" }],
});

// Flip 4 coins. This attack does 50 damage for each heads.
const zapdosExThunderingHurricane: Action = makeActionAttack({
  type: "ModifyHPBy",
  args: [
    { type: "PickSpecificMember", args: ["OpponentActivePokemon"] },
    { type: "*", args: [50, { type: "CountHeads", args: [4] }] },
  ],
});

getAttackSchema(
  "Rising Lunge \t40+\nFlip a coin. If heads, this attack does 60 more damage."
)
  // .then(JSON.parse)
  // .then((val) => inspect(val, { depth: null }))
  .then(console.log);

// [Base Damage 40] Flip a coin. If heads, this attack does 60 more damage.
const rapidashRisingLunge: Action = makeActionAttack({
  type: "ModifyHPBy",
  args: [
    { type: "PickSpecificMember", args: ["OpponentActivePokemon"] },
    {
      type: "+",
      args: [
        40,
        {
          type: "IfElseInteger",
          args: [{ type: "SingleCoinFlipHeads" }, 60, 0],
        },
      ],
    },
  ],
});

const centiskorchFireBlast: Action = makeActionAttack({
  type: "Chain",
  args: [
    {
      type: "ModifyHPBy",
      args: [
        {
          type: "PickMember",
          args: ["OpponentActivePokemon"],
        },
        -130,
      ],
    },
    {
      type: "RemoveEnergy",
      args: [{ type: "PickActee" }, "R"],
    },
  ],
});
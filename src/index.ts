import dotenv from "dotenv";
dotenv.config();


import { Action } from "@/types/dsl";
import { getAttackSchema } from "./interpreter/generate";

// // end turn after an attack
// const makeActionAttack = (action: Action): Action => ({
//   type: "Chain",
//   args: [action, { type: "EndTurn" }],
// });

// // Flip 4 coins. This attack does 50 damage for each heads.
// const zapdosExThunderingHurricane: Action = makeActionAttack({
//   type: "ModifyHPBy",
//   args: [
//     { type: "PickSpecificMember", args: ["OpponentActivePokemon"] },
//     { type: "*", args: [50, { type: "CountHeads", args: [4] }] },
//   ],
// });

// // [Base Damage 40] Flip a coin. If heads, this attack does 60 more damage.
// const rapidashRisingLunge: Action = makeActionAttack({
//   type: "ModifyHPBy",
//   args: [
//     { type: "PickSpecificMember", args: ["OpponentActivePokemon"] },
//     {
//       type: "+",
//       args: [
//         40,
//         {
//           type: "IfElseInteger",
//           args: [{ type: "SingleCoinFlipHeads" }, 60, 0],
//         },
//       ],
//     },
//   ],
// });

// const centiskorchFireBlast: Action = makeActionAttack({
//   type: "Chain",
//   args: [
//     {
//       type: "ModifyHPBy",
//       args: [
//         {
//           type: "PickMember",
//           args: ["OpponentActivePokemon"],
//         },
//         -130,
//       ],
//     },
//     {
//       type: "RemoveEnergy",
//       args: [{ type: "PickActee" }, "R"],
//     },
//   ],
// });

// getAttackSchema({
//   name: "Guillotine Rush",
//   baseDamage: 50,
//   damageModifier: "plus",
//   cost: ["G", "C", "C"],
//   text: "Flip a coin until you get tails. This attack does 40 more damage for each heads."
// }).then(x => JSON.stringify(x, null, 2)).then(console.log);

getAttackSchema({
  name: "Rising Lunge",
  baseDamage: 40,
  damageModifier: "plus",
  cost: ["R", "C", "C"],
  text: "Flip a coin. If heads, this attack does 60 more damage."
}).then(x => JSON.stringify(x, null, 2)).then(console.log);

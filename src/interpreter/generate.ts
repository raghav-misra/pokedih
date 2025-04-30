import { Attack } from "@/types/card";
import OpenAI from "openai";
import { createGenerator, Schema } from "ts-json-schema-generator";

let schema: Schema | null = null;

async function generateSchema() {
  if (schema != null) {
    console.log("Found existing schema!");
    return schema;
  }

  const config = {
    path: "./src/types/dsl/index.ts",
    tsconfig: "./tsconfig.json",
    type: "Action",
  };

  schema = createGenerator(config).createSchema(config.type);
  schema = {
    ...schema,
    type: "object",
    properties: {
      response: {
        $ref: "#/definitions/Action",
      },
      justifyYourResponse: { type: "string" },
    },
    required: ["response", "justifyYourResponse"],
    additionalProperties: false,
  };
  delete schema["$ref"];
  console.log("Generated new schema.");
  return schema;
}

const FORM_PROMPT = (attack: Attack) => `
# OBJECTIVE

You are a structured data translator for a Pokémon TCG Pocket game engine.

Your task is:  
Given the description of an attack or ability in natural language, output the corresponding Action JSON object according to the following JSON Schema.

The structure must match exactly.  
No extra fields, no missing fields, no comments.  
Only output strict JSON.  

# EXAMPLES:

Input:
"Flip 4 coins. This attack does 50 damage for each heads."

Output:
{
  "type": "DealDamageBy",
  "args": [
    { "type": "PickSpecificMember", "args": "OpponentActivePokemon" },
    {
      "type": "*",
      "args": { 0: 50, 1: { "type": "CountHeads", "args": 4 } }
    }
  ]
}

---

Input:
"Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."

Output:
{
  "type": "IfElse",
  "args": [
    { "type": "SingleCoinFlipHeads" },
    {
      "type": "ApplyStatus",
      "args": {
        0: { "type": "PickSpecificMember", "args": "OpponentActivePokemon" },
        1: "Paralyzed"
      }
    },
    { "type": "DoNothing" }
  ]
}

---

Input:
"Insightful Slap: 10 (info about damage to opponent active pokemon)
Draw 2 cards."

Output:
{
  "type": "DrawCards",
  "args": { 0: "Self", 1: 2 }
}

---

# IMPORTANT NOTES

- Always output valid JSON only, no explanation.
- Always match types and arguments exactly per the schema.
- Use the simplest structure needed.
- Omit no required fields.
- No free-form text, no pseudocode, no comments.
- Sequential actions should be "Chain"ed.
- Operations across multiple actions/values are binary (two arguments).
- ModifyHPBy is used for healing AND damage. Negative values imply damage, positive imply healing.
- IfElse returns no value. To compute conditional values, use IfElseInteger or IfElseMember.
- Pay close attention to the types of energies, members, and how general they are. Do not over-assume or make an example of an attack.
- The example outputs have no associated justification. But you are expected to provide reasoning for your response in the justifyYourResponse value of the output JSON.

# YOUR JOB

Input:
"${attack.name}${
  attack.baseDamage != null
    ? `: ${attack.baseDamage}${
        attack.damageModifier === "plus"
          ? "+"
          : attack.damageModifier === "times"
          ? "x"
          : ""
      } (damage to opponent active pokemon)`
    : ""
}
${attack.text}"
Output:`;

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function getAttackSchema(attack: Attack) {
  console.log("Sending LLM request.");
  const response = await client.responses.parse({
    model: "gpt-4o-mini",
    input: FORM_PROMPT(attack),
    text: {
      format: {
        name: "tcg_pocket_card_action",
        type: "json_schema",
        schema: (await generateSchema()) as Record<string, unknown>,
      },
    },
  });

  console.log("Received LLM response.");

  return response.output_parsed;
}

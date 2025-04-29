import { Attack } from "@/types/card";
import fs from "fs/promises";
import OpenAI from "openai";
import { createGenerator, Schema } from "ts-json-schema-generator";

let schema: Schema | null = null;

async function generateSchema() {
  if (schema != null) return schema;

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
    },
    required: ["response"],
    additionalProperties: false,
  };
  delete schema["$ref"];
  await fs.writeFile("schema.json", JSON.stringify(schema, null, 2));
  return schema;
}

const FORM_PROMPT = (
  attack: Attack
) => `You are a structured data translator for a Pokémon TCG Pocket game engine.

Your task is:  
Given the description of an attack or ability in natural language, output the corresponding Action JSON object according to the following JSON Schema.

The structure must match exactly.  
No extra fields, no missing fields, no comments.  
Only output strict JSON.  

---

---

Examples:

Input:
"Flip 4 coins. This attack does 50 damage for each heads."

Output:
{
  "type": "ModifyHPBy",
  "args": [
    { "type": "PickSpecificMember", "args": ["OpponentActivePokemon"] },
    {
      "type": "*",
      "args": [50, { "type": "CountHeads", "args": [4] }]
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
      "args": [
        { "type": "PickSpecificMember", "args": ["OpponentActivePokemon"] },
        "Paralyzed"
      ]
    },
    { "type": "DoNothing" }
  ]
}

---

Input:
"Draw 2 cards."

Output:
{
  "type": "DrawCards",
  "args": [2]
}

---

IMPORTANT:

- Always output valid JSON only, no explanation.
- Always match types and arguments exactly per the schema.
- Use the simplest structure needed.
- Omit no required fields.
- No free-form text, no pseudocode, no comments.
- Operations across multiple actions/values are binary (two arguments).
- ModifyHPBy is used for healing AND damage. Negative values imply damage, positive imply healing.
- IfElse returns no value. To compute conditional values, use IfElseInteger or IfElseMember.

---

Input:
${attack.name}${
  attack.baseDamage != null
    ? `: ${attack.baseDamage}${
        attack.damageModifier === "plus"
          ? "+"
          : attack.damageModifier === "times"
          ? "x"
          : ""
      }`
    : ""
}
${attack.text}
Output:`;

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function getAttackSchema(attack: Attack) {
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

  return response.output_parsed;
}

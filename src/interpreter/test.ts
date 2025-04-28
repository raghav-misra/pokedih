import { Action } from "@/types/dsl";
import OpenAI from "openai";

const FORM_PROMPT = (
  attack: string
) => `You are a structured data translator for a Pokémon TCG Pocket game engine.

Your task is:  
Given the description of an attack or ability in natural language, output the corresponding Action JSON object according to the following JSON Schema.

The structure must match exactly.  
No extra fields, no missing fields, no comments.  
Only output strict JSON.  

---

JSON Schema (summary):

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Pocket TCG DSL Action",
  "type": "object",
  "oneOf": [
    { "$ref": "#/definitions/Action" }
  ],
  "definitions": {
    "Action": { "type": "object", "properties": { "type": { "enum": [...] }, "args": { "type": "array", "items": { "$ref": "#/definitions/Argument" } } }, "required": ["type", "args"] },
    "Argument": { "oneOf": [ { "type": "number" }, { "type": "boolean" }, { "type": "string" }, { "$ref": "#/definitions/Action" }, { "$ref": "#/definitions/IntegerValue" }, { "$ref": "#/definitions/BooleanValue" }, { "$ref": "#/definitions/MemberValue" } ] },
    "IntegerValue": { "type": "object", "properties": { "type": { "enum": ["CountHeads", "NumberOfFlipsUntilTails", "+", "-", "*", "/", "//"] }, "args": { "type": "array" } }, "required": ["type", "args"] },
    "BooleanValue": { "type": "object", "properties": { "type": { "enum": ["SingleCoinFlipHeads", "And", "Or", "Not", ">", ">=", "<", "<="] }, "args": { "type": "array" } }, "required": ["type", "args"] },
    "MemberValue": { "type": "object", "properties": { "type": { "enum": ["PickActee", "PickMember", "PickSpecificMember"] }, "args": { "type": "array" } }, "required": ["type", "args"] }
  }
}

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
"${attack}"
Output:`;

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function getAttackSchema(attack: string) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: FORM_PROMPT(attack),
  });

  return response.output_text;
}

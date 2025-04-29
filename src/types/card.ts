export type TCGCard = { packCode: string; cardNumber: number } & (
  | { cardType: "pokemon"; attributes: PokemonAttributes }
  | { cardType: "itemNormal"; attributes: GeneralAttributes }
  | { cardType: "itemFossil"; attributes: GeneralAttributes }
  | { cardType: "supporter"; attributes: GeneralAttributes }
  | { cardType: "tool"; attributes: GeneralAttributes }
);

export type PokemonAttributes = {
  name: string;
  hp: number;
  ability?: Ability;
  type: string;
  attacks: Attack[];
  weakness?: Weakness;
  retreatCost: number;
  stage: Stage;
  evolvesFrom?: string;
};

export type Stage = "Basic" | "Stage 1" | "Stage 2" | "Unknown";

export type Ability = {
  name: string;
  text: string;
};

export type Attack = {
  cost: string[]; // like ["P", "C", "C"]
  name: string;
  baseDamage: number | undefined;
  damageModifier: "plus" | "times" | undefined;
  text?: string;
};

export type Weakness = {
  type: string; // like "Fighting"
  value: string; // like "x2"
};

export type GeneralAttributes = {
  name: string;
  effect: string; // normal item effect text
};

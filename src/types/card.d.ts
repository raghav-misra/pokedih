export type TCGCard = { packCode: string; cardNumber: number } & (
  | { cardType: "pokemon"; attributes: PokemonAttributes }
  | { cardType: "itemNormal"; attributes: ItemNormalAttributes }
  | { cardType: "itemFossil"; attributes: ItemFossilAttributes }
  | { cardType: "supporter"; attributes: SupporterAttributes }
);

export type PokemonAttributes = {
  name: string;
  hp: number | null;
  type: string;
  attacks: Attack[];
  weakness?: Weakness;
  retreatCost: number;
  stage: Stage;
  evolvesFrom?: string;
};

export type Stage = "Basic" | "Stage 1" | "Stage 2" | "Unknown";

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

export type ItemNormalAttributes = {
  name: string;
  effect: string; // normal item effect text
};

export type ItemFossilAttributes = {
  name: string;
  effect: string;
};

export type SupporterAttributes = {
  name: string;
  effect: string;
};

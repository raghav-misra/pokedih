export type TCGCard =
  | { cardType: "pokemon"; pokemon: PokemonAttributes }
  | { cardType: "itemNormal"; itemNormal: ItemNormalAttributes }
  | { cardType: "itemFossil"; itemFossil: ItemFossilAttributes }
  | { cardType: "supporter"; supporter: SupporterAttributes };

export type PokemonAttributes = {
  name: string;
  hp: number;
  types: string[]; // like ["Darkness", "Psychic"]
  attacks: Attack[];
  weaknesses?: Weakness[];
  retreatCost: number;
  stage:
    | "Basic"
    | "Stage 1"
    | "Stage 2"
    | "EX"
    | "V"
    | "VSTAR"
    | "VMAX"
    | "BREAK"
    | "Radiant"
    | string;
  evolvesFrom?: string;
};

export type Attack = {
  cost: string[]; // like ["P", "C", "C"]
  name: string;
  damage?: string; // like "130" or "30x"
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
  setsUpPokemon: string; // like "Omanyte", "Kabuto", whatever fossil dudes
};

export type SupporterAttributes = {
  name: string;
  effect: string;
};

export interface TCGPack {
  name: string;
  code: string;
  releaseDate: string | null; // null for promo-A
  cardCount: number;
  url: string;
}

export interface TCGCard {
  name: string;
  hp: number | null;
  type: string;
  stage: string | null;
  evolvesFrom: string | null;
  attacks: {
    cost: string;
    name: string;
    effect: string;
  }[];
  weakness: string | null;
  retreat: number | null;
  illustrator: string | null;
  flavorText: string | null;
  imageUrl: string;
  setCode: string;
  numberInSet: number;
}

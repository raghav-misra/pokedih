export interface TCGPack {
  name: string;
  code: string;
  releaseDate: [year: number, month: number, day: number] | null;
  cardCount: number;
}

import { scrapeTCGCard } from "./cards";
import { scrapeTCGPacks } from "./packs";
import fs from "fs/promises";

export async function scrapeAllTCGData() {
  console.log("Reading packs...");

  const packs = await scrapeTCGPacks();

  await fs.writeFile("./packs.json", JSON.stringify(packs, null, 2), "utf-8");

  console.log("Reading cards...");

  const allCardResponses = await Promise.allSettled(
    packs
      .flatMap(({ cardCount, code }) => {
        const els: [packCode: string, cardNum: number][] = [];

        for (let i = 1; i <= cardCount; i++) {
          els.push([code, i]);
        }

        return els;
      })
      .map((e) => scrapeTCGCard(...e))
  );

  const failedCards = allCardResponses.filter(
    (res) => res.status === "rejected"
  ).map(res => res.reason);

  console.log("Failed cards:", failedCards.length, failedCards);

  const allCards = allCardResponses
    .map((res) => (res.status === "fulfilled" ? res.value : null))
    .filter((card) => card != null);

  await fs.writeFile(
    "./cards.json",
    JSON.stringify(allCards, null, 2),
    "utf-8"
  );

  console.log(
    "Total cards from all packs:",
    packs.reduce((curr, p) => curr + p.cardCount, 0)
  );
  console.log("Total cards scraped:", allCards.length);
}

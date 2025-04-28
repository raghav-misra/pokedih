import { getCardsCollection, getPacksCollection } from "@/db";
import { scrapeTCGCard } from "./cards";
import { scrapeTCGPacks } from "./packs";

export async function scrapeAllTCGData() {
  const packsCollection = await getPacksCollection();
  const cardsCollection = await getCardsCollection();

  console.log("Reading packs...");

  const packs = await scrapeTCGPacks();

  console.log("Writing new packs to DB...");

  await packsCollection.bulkWrite(
    packs.map((pack) => ({
      updateOne: {
        filter: { code: pack.code },
        update: { $setOnInsert: pack },
        upsert: true,
      },
    }))
  );

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

  const failedCards = allCardResponses
    .filter((res) => res.status === "rejected")
    .map((res) => res.reason);

  console.log("Failed cards:", failedCards.length, failedCards);

  const allCards = allCardResponses
    .map((res) => (res.status === "fulfilled" ? res.value : null))
    .filter((card) => card != null);

  console.log(
    "Total cards from all packs:",
    packs.reduce((curr, p) => curr + p.cardCount, 0)
  );

  console.log("Total cards scraped:", allCards.length);

  console.log("Writing new cards to DB...");
  await cardsCollection.bulkWrite(
    allCards.map((card) => ({
      updateOne: {
        filter: { packCode: card.packCode, cardNumber: card.cardNumber },
        update: { $setOnInsert: card },
        upsert: true,
      },
    }))
  );

  console.log("Done!");
}

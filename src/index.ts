import { scrapeTCGPacks } from "@/scraper/packs";
import { scrapeTCGCard } from "./scraper/cards";

async function main() {
  // console.log("Scraping packs!");

  // const packs = await scrapeTCGPacks();

  // packs.forEach((pack) =>
  //   console.log(
  //     `Found ${pack.name} (${pack.code}): ${pack.cardCount} cards.`
  //   )
  // );

  console.log(await scrapeTCGCard("P-A", 6));
}

main();

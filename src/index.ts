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

  const red = await scrapeTCGCard("A1a", 85);
  console.log(red.cardType === "pokemon" && red);
}

main();

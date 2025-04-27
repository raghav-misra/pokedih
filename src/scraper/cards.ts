import { Attack, Stage, TCGCard, Weakness } from "@/types/card";
import * as cheerio from "cheerio";

const GET_PACKS_URL = (packCode: string, cardNumber: number) =>
  `https://pocket.limitlesstcg.com/cards/${packCode}/${cardNumber}`;

function createScraper(cardType: TCGCard["cardType"]) {
  if (cardType === "pokemon") {
    return (
      $: cheerio.CheerioAPI,
      packCode: string,
      cardNumber: number
    ): TCGCard => {
      const name = $(".card-text-name a").text().trim();

      const titleParts = $(".card-text-title")
        .text()
        .split("-")
        .map((p) => p.trim());
      const type = titleParts[1]?.trim() ?? "";
      const hpStr = titleParts[2]?.replace("HP", "").trim();
      const hp = hpStr ? parseInt(hpStr, 10) : null;

      const typeSection = $(".card-text-type").text().toLowerCase();
      let stage: Stage = "Basic";
      let evolvesFrom: string | undefined = undefined;

      if (typeSection.includes("stage 1")) stage = "Stage 1";
      else if (typeSection.includes("stage 2")) stage = "Stage 2";
      else if (typeSection.includes("basic")) stage = "Basic";
      else stage = "Unknown"; // ultra rare

      if (typeSection.includes("evolves from")) {
        evolvesFrom = $(".card-text-type a").text().trim();
      }

      const attacks: Attack[] = [];
      $(".card-text-attack").each((_, elem) => {
        const attackNameText = $(elem)
          .find(".card-text-attack-info")
          .text()
          .trim();
        const effectText = $(elem)
          .find(".card-text-attack-effect")
          .text()
          .trim();

        const costSymbols = $(elem)
          .find(".card-text-attack-info .ptcg-symbol")
          .text();
        const nameDamagePart = attackNameText.replace(costSymbols, "").trim();

        const nameMatch = nameDamagePart.match(/^(.+?)([\d+x+]*)$/i);
        const attackName = nameMatch?.[1]?.trim() ?? "";

        let baseDamage: number | undefined = undefined;
        let damageModifier: "plus" | "times" | undefined = undefined;

        if (nameMatch?.[2]) {
          const damageStr = nameMatch[2];
          const numberMatch = damageStr.match(/\d+/);
          if (numberMatch) {
            baseDamage = parseInt(numberMatch[0], 10);
          }
          if (damageStr.includes("+")) {
            damageModifier = "plus";
          } else if (damageStr.toLowerCase().includes("x")) {
            damageModifier = "times";
          }
        }

        attacks.push({
          cost: costSymbols.split(""),
          name: attackName,
          baseDamage,
          damageModifier,
          text: effectText || undefined,
        });
      });

      let weakness: Weakness | undefined = undefined;
      let retreatCost = 0;

      $(".card-text-wrr").each((_, elem) => {
        const text = $(elem).text().toLowerCase();
        if (text.includes("weakness")) {
          const weaknessMatch = text.match(/weakness:\s*(\w+)/);
          if (weaknessMatch) {
            weakness = {
              type: weaknessMatch[1],
              value: "+20",
            };
          }
        }
        if (text.includes("retreat")) {
          const retreatMatch = text.match(/retreat:\s*(\d+)/);
          if (retreatMatch) {
            retreatCost = parseInt(retreatMatch[1], 10);
          }
        }
      });

      return {
        packCode,
        cardNumber,
        cardType: "pokemon",
        attributes: {
          name,
          hp,
          type,
          attacks,
          weakness,
          retreatCost,
          stage,
          evolvesFrom,
        },
      };
    };
  } else {
    return (
      $: cheerio.CheerioAPI,
      packCode: string,
      cardNumber: number
    ): TCGCard => {
      const name = $(".card-text-name a").text().trim();

      const sections = $(".card-text-section");
      const effectSection = sections.eq(1).text().trim();

      return {
        packCode,
        cardNumber,
        cardType,
        attributes: {
          name,
          effect: effectSection,
        },
      };
    };
  }
}

const scrapePokemon = createScraper("pokemon");
const scrapeItemNormal = createScraper("itemNormal");
const scrapeItemFossil = createScraper("itemFossil");
const scrapeSupporter = createScraper("supporter");

export async function scrapeTCGCard(
  packCode: string,
  cardNumber: number
): Promise<TCGCard> {
  const PACKS_URL = GET_PACKS_URL(packCode, cardNumber);

  const res = await fetch(PACKS_URL);
  const html = await res.text();
  const $ = cheerio.load(html);

  const typeText = $(".card-text-type").text().trim().toLowerCase();

  if (typeText.includes("pokémon")) {
    return scrapePokemon($, packCode, cardNumber);
  } else if (typeText.includes("supporter")) {
    return scrapeSupporter($, packCode, cardNumber);
  } else if (typeText.includes("item")) {
    const fullText = $(".card-text")
      .text()
      .trim()
      .toLowerCase()
      .replace(/ /g, "");

    return fullText.includes("playthiscardasif")
      ? scrapeItemFossil($, packCode, cardNumber)
      : scrapeItemNormal($, packCode, cardNumber);
  } else {
    throw new Error(
      `Unknown card type for ${packCode}/${cardNumber}: ${typeText}`
    );
  }
}

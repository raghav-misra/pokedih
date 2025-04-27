import * as cheerio from "cheerio";

const GET_PACKS_URL = (packCode: string, cardNumber: number) =>
  `https://pocket.limitlesstcg.com/cards/${packCode}/${cardNumber}`;

export async function scrapeTCGCard(packCode: string, cardNumber: number) {
  const PACKS_URL = GET_PACKS_URL(packCode, cardNumber);

  const res = await fetch(PACKS_URL);
  const html = await res.text();
  const $ = cheerio.load(html);

  const typeText = $(".card-text-type").text().trim().toLowerCase();

  if (typeText.includes("pokémon")) {
    return scrapePokemon($);
  } else if (typeText.includes("supporter")) {
    return scrapeSupporter($);
  } else if (typeText.includes("item")) {
    return scrapeItem($);
  } else {
    throw new Error(
      `Unknown card type for ${packCode}/${cardNumber}: ${typeText}`
    );
  }
}

// --- handlers ---

function scrapePokemon($: cheerio.CheerioAPI) {
  return { cardType: "pokemon" } as const;
}

function scrapeSupporter($: cheerio.CheerioAPI) {
  return { cardType: "supporter" } as const;
}

function scrapeItem($: cheerio.CheerioAPI) {
  const fullText = $(".card-text")
    .text()
    .trim()
    .toLowerCase()
    .replace(/\s/g, "");

  if (fullText.includes("playthiscardasif")) {
    return scrapeItemFossil($);
  } else {
    return scrapeItemNormal($);
  }
}

function scrapeItemNormal($: cheerio.CheerioAPI) {
  return { cardType: "itemNormal" } as const;
}

function scrapeItemFossil($: cheerio.CheerioAPI) {
  return { cardType: "itemFossil" } as const;
}

import * as cheerio from "cheerio";
import { TCGCard, TCGPack } from "./types";

const PACKS_URL = "https://pocket.limitlesstcg.com/cards";

async function scrapeTCGPacks(): Promise<TCGPack[]> {
  const res = await fetch(PACKS_URL);
  const html = await res.text();
  const $ = cheerio.load(html);

  const packs: TCGPack[] = [];

  $("table.sets-table tr").each((_, el) => {
    const td = $(el).find("td");
    if (td.length !== 3) return;

    const nameCell = td.eq(0);
    const releaseCell = td.eq(1);
    const countCell = td.eq(2);

    const anchor = nameCell.find("a");
    const urlPath = anchor.attr("href") || "";
    const fullUrl = `https://pocket.limitlesstcg.com${urlPath}`;

    const name = anchor
      .contents()
      .filter((_, n) => n.type === "text")
      .text()
      .trim();

    const code = anchor.find(".code").text().trim();
    const releaseDate = releaseCell.text().trim() || null;
    const cardCount = parseInt(countCell.text().trim(), 10);

    packs.push({ name, code, releaseDate, cardCount, url: fullUrl });
  });

  return packs;
}

async function scrapeTCGCard(
  { code: setCode }: TCGPack,
  number: number
): Promise<TCGCard | null> {
  const url = `https://pocket.limitlesstcg.com/cards/${setCode}/${number}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const html = await res.text();
  const $ = cheerio.load(html);

  const name = $(".card-text-name a").text().trim();
  const typeLine = $(".card-text-title").text().trim();
  const [_, type, hpRaw] = typeLine.match(/- (\w+) *- *(\d+)? HP?/) || [];
  const hp = hpRaw ? parseInt(hpRaw, 10) : null;

  const stageLine = $(".card-text-type").text().trim();
  const stage = /Stage \d/.test(stageLine)
    ? stageLine.match(/Stage \d/)?.[0] ?? null
    : null;
  const evolvesFrom = $("a[href*='name:']").text().trim() || null;

  const attacks: TCGCard["attacks"] = [];
  $(".card-text-attack").each((_, el) => {
    const cost = $(el).find(".ptcg-symbol").text().trim();
    const name = $(el)
      .find("p.card-text-attack-info")
      .text()
      .replace(cost, "")
      .trim();
    const effect = $(el).find(".card-text-attack-effect").text().trim();
    attacks.push({ cost, name, effect });
  });

  const weaknessLine = $(".card-text-wrr").text();
  const weakness = weaknessLine.includes("Weakness:")
    ? weaknessLine.match(/Weakness:\s*(\w+)/)?.[1] ?? null
    : null;
  const retreat = weaknessLine.includes("Retreat:")
    ? parseInt(weaknessLine.match(/Retreat:\s*(\d+)/)?.[1] || "0", 10)
    : null;

  const illustrator = $(".card-text-artist a").text().trim() || null;
  const flavorText = $(".card-text-flavor").text().trim() || null;
  const imageUrl = $(".card-image img").attr("src") || "";

  return {
    name,
    hp,
    type,
    stage,
    evolvesFrom,
    attacks,
    weakness,
    retreat,
    illustrator,
    flavorText,
    imageUrl,
    setCode,
    numberInSet: number,
  };
}

async function main() {
  console.log("Reading packs...");
  const packs = await scrapeTCGPacks();
  console.log(`First pack is ${packs[0].name}. Finding 24th card...`);
  const card = await scrapeTCGCard(packs[0], 24);
  console.log(card);
}

main();
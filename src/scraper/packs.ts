import * as cheerio from "cheerio";
import { TCGPack } from "@/types/pack";
import { parsePackDateString } from "@/utils/parsing";

const PACKS_URL = "https://pocket.limitlesstcg.com/cards";

export async function scrapeTCGPacks(): Promise<TCGPack[]> {
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

    const name = anchor
      .contents()
      .filter((_, n) => n.type === "text")
      .text()
      .trim();

    const code = anchor.find(".code").text().trim();

    const releaseDate = parsePackDateString(releaseCell.text());

    const cardCount = parseInt(countCell.text().trim(), 10);

    packs.push({ name, code, releaseDate, cardCount });
  });

  return packs;
}

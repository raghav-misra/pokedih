import { MongoClient, Db, Collection, Document } from "mongodb";
import { TCGCard } from "@/types/card";
import { TCGPack } from "@/types/pack";


const client = new MongoClient(process.env.MONGO_DB_URL as string);

let db: Db;

async function connectToMongo(): Promise<void> {
  if (!db) {
    await client.connect();
    db = client.db("db");
    console.log("Connected to MongoDB!");
  }
}

async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  if (!db) {
    console.log("Requested DB collection without connection! Connecting...");
    await connectToMongo();
  }
  return db.collection<T>(name);
}

export const getPacksCollection = () => getCollection<TCGPack>("packs");
export const getCardsCollection = () => getCollection<TCGCard>("cards");

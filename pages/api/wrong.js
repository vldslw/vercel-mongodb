import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export default async function handler(req, res) {
  try {
    const mongoClient = await (new MongoClient(uri, options)).connect();
    console.log("Just connected to Mongo DB!");
    const db = mongoClient.db("sample_restaurants");
    const collection = db.collection("restaurants");
    const results = await collection
    .find({})
    .project({
      grades: 0,
      borough: 0,
      restaurant_id: 0,
    })
    .limit(4)
    .toArray();

    res.status(200).json(results);
  } catch(e) {
    console.log(e);
    res.status(500).json(e);

  }
}
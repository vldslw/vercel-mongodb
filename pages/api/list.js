import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("sample_restaurants");
    const collection = db.collection("restaurants");
    const results = await collection
    .find({})
    .project({
      grades: 0,
      borough: 0,
      restaurant_id: 0,
    })
    .limit(10)
    .toArray();

    res.status(200).json(results);
  } catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
}
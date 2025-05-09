import { MongoClient, ServerApiVersion } from "mongodb";
import { ServiceError } from "./errors.js";

let cachedClient = null;
let cachedDb = null;

async function getNewClient() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    const db = client.db("api-estudafatec").admin();

    cachedClient = client;
    cachedDb = db;

    return db;
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao conectar ao MongoDB.",
      cause: error,
    });
  }
}

async function query(queryObject) {
  try {
    const db = await getNewClient();
    const collection = db.collection("questoes");
    return await collection.find(queryObject).toArray();
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao executar a consulta no MongoDB.",
      cause: error,
    });
  }
}

const mongo = {
  query,
  getNewClient,
};

export default mongo;

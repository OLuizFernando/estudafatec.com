import { MongoClient } from "mongodb";
import { ServiceError } from "./errors.js";

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();
    const db = client.db("api-estudafatec");

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

async function closeDb() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

async function query(queryObject) {
  try {
    const db = await getDb();
    const collection = db.collection("questoes");
    return await collection.find(queryObject).toArray();
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao executar a consulta no MongoDB.",
      cause: error,
    });
  }
}

async function insertMany(documents) {
  try {
    const db = await getDb();
    const collection = db.collection("questoes");

    const result = await collection.insertMany(documents);

    return result;
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao inserir documentos no MongoDB.",
      cause: error,
    });
  }
}

async function deleteMany(filter) {
  try {
    const db = await getDb();
    const collection = db.collection("questoes");

    const result = await collection.deleteMany(filter);

    return result;
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao remover documentos no MongoDB.",
      cause: error,
    });
  }
}

const mongo = {
  getDb,
  query,
  insertMany,
  deleteMany,
  closeDb,
};

export default mongo;

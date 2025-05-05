import { MongoClient, ServerApiVersion } from "mongodb";
import { ServiceError } from "./errors.js";

async function find(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const db = client.db("api-estudafatec");
    const collection = db.collection("questoes");
    const result = await collection.find(queryObject).toArray();
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com Banco ou na query.",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await client?.close();
  }
}

async function getNewClient() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  return client;
}

const database = {
  find,
  getNewClient,
};

export default database;

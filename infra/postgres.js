import { Pool } from "pg";
import { ServiceError } from "./errors.js";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.NODE_ENV === "production" ? true : false,
  max: 20,
  allowExitOnIdle: true,
});

async function query(queryObject) {
  let client;
  try {
    client = await getDb();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com o Postgres ou na Query.",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    client?.release();
  }
}

async function getDb() {
  return pool.connect();
}

const postgres = {
  query,
  getDb,
};

export default postgres;

import { Pool } from "pg";
import { ServiceError } from "./errors.js";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function query(queryObject) {
  try {
    const result = await pool.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com o Postgres ou na Query.",
      cause: error,
    });
    throw serviceErrorObject;
  }
}

async function getDb() {
  return pool;
}

const database = {
  query,
  getDb,
};

export default database;

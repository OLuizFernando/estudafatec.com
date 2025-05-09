import { createRouter } from "next-connect";
import postgres from "infra/postgres";
import mongo from "infra/mongo";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  // Postgres Status
  const postgresVersion = await postgres.query("SHOW server_version;");

  const postgresName = process.env.POSTGRES_DB;
  const openedPostgresConnections = await postgres.query({
    text: "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [postgresName],
  });

  const maxPostgresConnections = await postgres.query("SHOW max_connections;");

  // Mongo Status
  const mongoClient = await mongo.getDb();
  const mongoStatus = await mongoClient.serverStatus();

  const mongoVersion = mongoStatus.version;
  const openedMongoConnections = mongoStatus.connections.current;
  const maxMongoConnections =
    mongoStatus.connections.current + mongoStatus.connections.available;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      postgres: {
        max_connections: parseInt(
          maxPostgresConnections.rows[0].max_connections,
        ),
        opened_connections: parseInt(
          openedPostgresConnections.rows[0].opened_connections,
        ),
        version: postgresVersion.rows[0].server_version,
      },
      mongo: {
        max_connections: maxMongoConnections,
        opened_connections: openedMongoConnections,
        version: mongoVersion,
      },
    },
  });
}

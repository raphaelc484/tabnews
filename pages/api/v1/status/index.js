import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const pgVersion = await database.query("SHOW server_version;");
    const maxConnections = await database.query("SHOW max_connections;");

    const databaseName = process.env.POSTGRES_DB;
    const usedConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: pgVersion.rows[0].server_version,
          max_connections: parseInt(maxConnections.rows[0].max_connections),
          opened_connections: usedConnections.rows[0].count,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });
    console.log("\n Erro dentro do catch do controller: ");
    console.log(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

export default status;

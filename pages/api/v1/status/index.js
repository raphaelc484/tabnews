import database from "../../../../infra/database.js";

async function status(reqeust, response) {
  const result = await database.query("SELECT 1 + 1 as SUM;");
  console.log(result.rows);
  response.status(200).json({ chave: "valor" });
}

export default status;

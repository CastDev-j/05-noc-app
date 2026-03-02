import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { ServerApp } from "./presentation/server";
import { prisma } from "./data/postgres/conection";
// import { MongoDatabase } from "./data/mongo/init";

async function main() {
  const cronTime = process.env.CRON_TIME ?? "*/5 * * * * *";
  const serviceUrl = process.env.SERVICE_URL ?? "http://localhost:3000";

  // await MongoDatabase.connect({
  //   mongoUri: process.env.MONGO_URL || "mongodb://root:123456@localhost:27017/",
  //   dbName: process.env.MONGO_DB_NAME || "noc-app-db",
  // });

  console.log(await prisma.logModel.findMany());

  ServerApp.start({ cronTime, serviceUrl });
}

main();

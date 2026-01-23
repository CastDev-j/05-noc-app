import "dotenv/config";
import { ServerApp } from "./presentation/server";

function main() {
  const cronTime = process.env.CRON_TIME ?? "*/5 * * * * *";
  const serviceUrl = process.env.SERVICE_URL ?? "http://localhost:3000";

  ServerApp.start({ cronTime, serviceUrl });
}

main();

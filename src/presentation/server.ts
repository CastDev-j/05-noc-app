import { CheckService } from "@/domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

const successCallback = () => {
  console.log("Service is reachable");
};

const errorCallback = (error: Error) => {
  console.error("Service is not reachable");
};

export class ServerApp {
  static start(): void {
    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: async () => {
        const isReachable = await new CheckService(
          successCallback,
          errorCallback,
        ).execute("http://localhost:3000");
        console.log({ isReachable });
      },
    });
  }
}

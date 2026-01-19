import { CheckService } from "@/domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system";

const successCallback = () => {
  console.log("Service is reachable");
};

const errorCallback = (error: Error) => {
  console.error("Service is not reachable");
};

const logRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class ServerApp {
  static start(): void {
    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: async () => {
        const isReachable = await new CheckService(
          logRepository,
          successCallback,
          errorCallback,
        ).execute("http://localhost:3000");
        console.log({ isReachable });
      },
    });
  }
}

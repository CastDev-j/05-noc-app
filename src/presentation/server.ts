import { CheckService } from "@/domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system";
import { EmailService } from "./email/email";

interface StartOptions {
  cronTime?: string;
  serviceUrl?: string;
}

const successCallback = () => {
  console.log("Service is reachable");
};

const errorCallback = (error: Error) => {
  console.error("Service is not reachable");
};

const logRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class ServerApp {
  static start({
    cronTime = "*/5 * * * * *",
    serviceUrl = "http://localhost:3000",
  }: StartOptions = {}): void {
    console.log("Server is running...");

    // CronService.createJob({
    //   cronTime,
    //   onTick: async () => {
    //     const isReachable = await new CheckService(
    //       logRepository,
    //       successCallback,
    //       errorCallback,
    //     ).execute(serviceUrl);
    //     console.log({ isReachable });
    //   },
    // });

    const emailService = new EmailService();

    // emailService.sendEmailWithFileSystemLogs("josejoseandre7@gmail.com");
  }
}

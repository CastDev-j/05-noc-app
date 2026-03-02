import { CheckService } from "@/domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log";
import { EmailService } from "./email/email";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system";
import { SendEmailLogs } from "@/domain/use-cases/email/send-email-logs";
import { MongoLog } from "@/infrastructure/datasources/mongo-log";
import { LogModel } from "@/data/mongo/models/log";

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

const logRepository = new LogRepositoryImpl(new MongoLog());

export class ServerApp {
  static async start({
    cronTime = "*/5 * * * * *",
    serviceUrl = "http://localhost:3000",
  }: StartOptions = {}): Promise<void> {
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
    // new SendEmailLogs(emailService, logRepository).execute(
    //   "josejoseandre7@gmail.com",
    // );

    // emailService.sendEmailWithFileSystemLogs("josejoseandre7@gmail.com");
  }
}

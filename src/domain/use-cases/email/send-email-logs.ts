import { LogEntity } from "@/domain/entities/log";
import { LogRepository } from "@/domain/repository/log";
import { EmailService } from "@/presentation/email/email";

interface SendEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) throw new Error("Failed to send email with logs");

      await this.logRepository.saveLog(
        new LogEntity({
          level: "low",
          message: `Email with logs sent to ${Array.isArray(to) ? to.join(", ") : to}`,
          createdAt: new Date(),
          origin: "SendEmailLogsUseCase",
        }),
      );

      return true;
    } catch (error) {
      await this.logRepository.saveLog(
        new LogEntity({
          level: "high",
          message: `Failed to send email with logs: ${(error as Error).message}`,
          createdAt: new Date(),
          origin: "SendEmailLogsUseCase",
        }),
      );

      return false;
    }
  }
}

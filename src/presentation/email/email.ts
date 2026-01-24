import { LogEntity } from "@/domain/entities/log";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log";
import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  constructor(
    private readonly logRepository = new LogRepositoryImpl(
      new FileSystemDataSource(),
    ),
  ) {}

  async sendEmail({
    to,
    subject,
    htmlBody,
    attachments = [],
  }: SendMailOptions): Promise<boolean> {
    try {
      const sentInformatioin = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "System Logs";
    const htmlBody = "<h1>Attached are the system logs.</h1>";
    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs-low.log",
        path: "./logs/logs-low.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}

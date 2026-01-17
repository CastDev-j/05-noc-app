import fs from "fs";
import { LogDataSource } from "@/domain/datasources/log";
import { LogLevel } from "@/domain/entities/log";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly lowLogsPath = "/logs/logs-low.log";
  private readonly mediumLogsPath = "/logs/logs-medium.log";
  private readonly highLogsPath = "/logs/logs-high.log";

  constructor() {
    this.createLogFileIfNotExists(this.logPath + this.lowLogsPath);
    this.createLogFileIfNotExists(this.logPath + this.mediumLogsPath);
    this.createLogFileIfNotExists(this.logPath + this.highLogsPath);
  }

  getLogs(severityLevel: LogLevel): Promise<void> {
    return Promise.resolve();
  }

  saveLog(log: LogLevel): Promise<void> {
    return Promise.resolve();
  }

  private createLogFileIfNotExists(path: string): void {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "");
    }
  }
}

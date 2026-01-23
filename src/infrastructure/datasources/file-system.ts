import fs from "fs";
import { LogDataSource } from "@/domain/datasources/log";
import { LogLevel, LogEntity } from "@/domain/entities/log";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs";
  private readonly allLogsPath = `${this.logPath}/logs-all.log`;
  private readonly lowLogsPath = `${this.logPath}/logs-low.log`;
  private readonly mediumLogsPath = `${this.logPath}/logs-medium.log`;
  private readonly highLogsPath = `${this.logPath}/logs-high.log`;
  constructor() {
    this.createLogFileIfNotExists(this.allLogsPath);
    this.createLogFileIfNotExists(this.lowLogsPath);
    this.createLogFileIfNotExists(this.mediumLogsPath);
    this.createLogFileIfNotExists(this.highLogsPath);
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(log)}\n`;

    switch (log.level) {
      case "low":
        fs.appendFileSync(this.lowLogsPath, logAsJSON);
        break;
      case "medium":
        fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        break;
      case "high":
        fs.appendFileSync(this.highLogsPath, logAsJSON);
        break;
    }

    fs.appendFileSync(this.allLogsPath, logAsJSON);
  }

  getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    const content = (() => {
      switch (severityLevel) {
        case "all":
          return this.readFileContent(this.allLogsPath);
        case "low":
          return this.readFileContent(this.lowLogsPath);
        case "medium":
          return this.readFileContent(this.mediumLogsPath);
        case "high":
          return this.readFileContent(this.highLogsPath);
        default:
          return "";
      }
    })();

    const logs = FileSystemDataSource.fromJSON(content);

    return Promise.resolve(logs);
  }

  private createLogFileIfNotExists(path: string): void {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "");
    }
  }

  private readFileContent(path: string): string {
    return fs.readFileSync(path, "utf-8");
  }

  // {level: "low", message: "...", createdAt: "2024-01-01T00:00:00.000Z"}
  static fromJSON(content: string): LogEntity[] {
    return content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const { createdAt, level, message, origin } = JSON.parse(
          line,
        ) as LogEntity;

        return {
          createdAt: new Date(createdAt),
          level: level as LogLevel,
          message,
          origin,
        };
      });
  }
}

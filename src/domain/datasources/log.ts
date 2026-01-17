import { LogLevel } from "../entities/log";

export abstract class LogDataSource {
  abstract saveLog(log: LogLevel): Promise<void>;

  abstract getLogs(severityLevel: LogLevel): Promise<void>;
}

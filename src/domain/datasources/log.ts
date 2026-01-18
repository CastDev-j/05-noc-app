import { LogEntity, LogLevel } from "../entities/log";

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;

  abstract getLogs(severityLevel: LogLevel): Promise<LogEntity[]>;
}

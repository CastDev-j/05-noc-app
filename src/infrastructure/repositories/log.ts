import { LogDataSource } from "@/domain/datasources/log";
import { LogLevel, LogEntity } from "@/domain/entities/log";
import { LogRepository } from "@/domain/repository/log";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}

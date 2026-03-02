import { LogModel } from "@/data/mongo/models/log";
import { LogDataSource } from "@/domain/datasources/log";
import { LogLevel, LogEntity } from "@/domain/entities/log";

export class MongoLog implements LogDataSource {
  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    const filter = severityLevel === "all" ? {} : { level: severityLevel };

    const logs = await LogModel.find(filter);

    return logs.map(LogEntity.fromObject);
  }
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
  }
}

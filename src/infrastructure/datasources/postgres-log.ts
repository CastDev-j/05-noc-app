import { prisma } from "@/data/postgres/conection";
import { LogDataSource } from "@/domain/datasources/log";
import { LogLevel, LogEntity } from "@/domain/entities/log";
import { LogLevel as LogModel } from "generated/prisma/client";

export class PostgresLog implements LogDataSource {
  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    const filter =
      severityLevel === "all"
        ? undefined
        : { where: { level: severityLevel.toUpperCase() as LogModel } };

    const logs = await prisma.logModel.findMany(filter);

    return logs.map(LogEntity.fromObject);
  }
  async saveLog(log: LogEntity): Promise<void> {
    await prisma.logModel.create({
      data: {
        message: log.message,
        level: log.level.toUpperCase() as LogModel,
        origin: log.origin,
      },
    });
  }
}

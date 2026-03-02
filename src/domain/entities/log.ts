export type LogLevel = "low" | "medium" | "high" | "all";

interface LogEntityProps {
  level: LogLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({ level, message, origin, createdAt }: LogEntityProps) {
    this.level = level as LogLevel;
    this.message = message;
    this.createdAt = createdAt ?? new Date();
    this.origin = origin;
  }

  static fromObject(obj: any): LogEntity {
    const isNotValidObject =
      !obj ||
      typeof obj.level !== "string" ||
      typeof obj.message !== "string" ||
      typeof obj.origin !== "string";

    if (isNotValidObject) throw new Error("Invalid log object");

    return new LogEntity({
      level: obj.level,
      message: obj.message,
      origin: obj.origin,
      createdAt: obj.createdAt ? new Date(obj.createdAt) : undefined,
    });
  }
}

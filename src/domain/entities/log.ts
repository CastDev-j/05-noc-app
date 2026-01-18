export type LogLevel = "low" | "medium" | "high" | "all";

export class LogEntity {
  public level: LogLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogLevel, message: string) {
    this.level = level as LogLevel;
    this.message = message;
    this.createdAt = new Date();
  }
}

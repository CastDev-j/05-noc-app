import { LogEntity } from "@/domain/entities/log";
import { LogRepository } from "@/domain/repository/log";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: Error) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error("Failed to fetch the URL");

      const log = new LogEntity({
        level: "low",
        message: `Service at ${url} is reachable.`,
        origin: url,
      });
      this.logRepository.saveLog(log);

      this.successCallback();
      return req.ok;
    } catch (error) {
      const log = new LogEntity({
        level: "high",
        message: `Service at ${url} is unreachable. Error: ${(error as Error).message}`,
        origin: url,
      });
      this.logRepository.saveLog(log);
      0;

      this.errorCallback(error as Error);

      return false;
    }
  }
}

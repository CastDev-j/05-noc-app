import { CronJob } from "cron";

interface CreateJobParams {
  cronTime: string;
  onTick: () => void;
}

export class CronService {
  static createJob({ cronTime, onTick }: CreateJobParams): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}

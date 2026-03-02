import { LogLevel } from "@/domain/entities/log";
import mongoose from "mongoose";

const validLevels: LogLevel[] = ["all", "high", "low", "medium"];

const logSchema = new mongoose.Schema({
  level: { type: String, required: true, enum: validLevels, default: "low" },
  message: { type: String, required: true },
  origin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LogModel = mongoose.model("Log", logSchema);

export { LogModel };

/*      
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
*/

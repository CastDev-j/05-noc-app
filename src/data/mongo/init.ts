import mongoose from "mongoose";

interface ConectionOptions {
  mongoUri: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect({ dbName, mongoUri }: ConectionOptions): Promise<void> {
    try {
      await mongoose.connect(mongoUri, {
        dbName,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}

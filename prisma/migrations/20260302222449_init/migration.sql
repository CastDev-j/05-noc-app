-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'ALL');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" TEXT NOT NULL,
    "level" "LogLevel" NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);

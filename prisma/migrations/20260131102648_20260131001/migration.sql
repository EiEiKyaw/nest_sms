-- CreateEnum
CREATE TYPE "CourseTimelineStatus" AS ENUM ('UPCOMING', 'ONGOING');

-- CreateEnum
CREATE TYPE "GeneralStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('MMK', 'USD', 'THB');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT,
    "batchNo" INTEGER NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "fees" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    "status" "CourseTimelineStatus" NOT NULL,
    "courseStatus" "GeneralStatus" NOT NULL,
    "originalImageUrl" TEXT,
    "thumbImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_batchNo_key" ON "Course"("code", "batchNo");

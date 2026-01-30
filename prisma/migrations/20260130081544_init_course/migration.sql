/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,batchNo]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batchNo` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseStatus` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMonths` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fees` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseTimelineStatus" AS ENUM ('UPCOMING', 'ONGOING');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('MMK', 'USD', 'THB');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description",
DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "batchNo" INTEGER NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "courseStatus" "CourseStatus" NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "durationMonths" INTEGER NOT NULL,
ADD COLUMN     "fees" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "originalImageUrl" TEXT,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "status" "CourseTimelineStatus" NOT NULL,
ADD COLUMN     "thumbImageUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_batchNo_key" ON "Course"("code", "batchNo");

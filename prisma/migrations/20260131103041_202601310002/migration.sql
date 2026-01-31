/*
  Warnings:

  - You are about to drop the column `batchNo` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseStatus` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `durationMonths` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `isPublish` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `longDescription` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `originalImageUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `thumbImageUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,batch_no]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch_no` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_status` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_months` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_code_batchNo_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "batchNo",
DROP COLUMN "courseStatus",
DROP COLUMN "createdAt",
DROP COLUMN "durationMonths",
DROP COLUMN "isPublish",
DROP COLUMN "longDescription",
DROP COLUMN "originalImageUrl",
DROP COLUMN "shortDescription",
DROP COLUMN "thumbImageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "batch_no" INTEGER NOT NULL,
ADD COLUMN     "course_status" "GeneralStatus" NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration_months" INTEGER NOT NULL,
ADD COLUMN     "is_publish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "long_description" TEXT,
ADD COLUMN     "original_image_url" TEXT,
ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "thumb_image_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_batch_no_key" ON "Course"("code", "batch_no");

/*
  Warnings:

  - You are about to drop the column `currency` on the `Course` table. All the data in the column will be lost.
  - Added the required column `currency_type` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `course_status` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "currency",
ADD COLUMN     "currency_type" "CurrencyType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "GeneralStatus" NOT NULL,
DROP COLUMN "course_status",
ADD COLUMN     "course_status" "CourseTimelineStatus" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `session_id` on the `patients_schedule` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `patients_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "patients_schedule" DROP CONSTRAINT "patients_schedule_session_id_fkey";

-- DropIndex
DROP INDEX "patients_schedule_session_id_idx";

-- AlterTable
ALTER TABLE "patients_schedule" DROP COLUMN "session_id",
ADD COLUMN     "schedule_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "patients_schedule_schedule_id_idx" ON "patients_schedule"("schedule_id");

-- AddForeignKey
ALTER TABLE "patients_schedule" ADD CONSTRAINT "patients_schedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

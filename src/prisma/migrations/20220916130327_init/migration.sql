/*
  Warnings:

  - Added the required column `professional_id` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "professional_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "resources_professional_id_idx" ON "resources"("professional_id");

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `catched` on the `TripsDogs` table. All the data in the column will be lost.
  - You are about to drop the column `dropped` on the `TripsDogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TripsDogs" DROP COLUMN "catched",
DROP COLUMN "dropped",
ADD COLUMN     "caughtAt" TIMESTAMP(3),
ADD COLUMN     "droppedAt" TIMESTAMP(3);

/*
  Warnings:

  - Added the required column `addressesId` to the `Trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trips" ADD COLUMN     "addressesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

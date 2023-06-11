/*
  Warnings:

  - The primary key for the `Addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_telephone_key" ON "Users"("telephone");

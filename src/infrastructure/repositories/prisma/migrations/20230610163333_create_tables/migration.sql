-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('TUTOR', 'DOGWALKER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DogSizeEnum" AS ENUM ('TINY', 'SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "DogTemperamentEnum" AS ENUM ('COOL', 'SHY', 'ANGRY');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRoleEnum" NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("UserId","zipCode","number")
);

-- CreateTable
CREATE TABLE "Dogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "size" "DogSizeEnum" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "temperament" "DogTemperamentEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "TutorId" TEXT NOT NULL,

    CONSTRAINT "Dogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "DogWalkerId" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "dogType" "DogTemperamentEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripsDogs" (
    "TripId" TEXT NOT NULL,
    "DogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "catched" TIMESTAMP(3),
    "dropped" TIMESTAMP(3),

    CONSTRAINT "TripsDogs_pkey" PRIMARY KEY ("TripId","DogId")
);

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dogs" ADD CONSTRAINT "Dogs_TutorId_fkey" FOREIGN KEY ("TutorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_DogWalkerId_fkey" FOREIGN KEY ("DogWalkerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsDogs" ADD CONSTRAINT "TripsDogs_TripId_fkey" FOREIGN KEY ("TripId") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsDogs" ADD CONSTRAINT "TripsDogs_DogId_fkey" FOREIGN KEY ("DogId") REFERENCES "Dogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

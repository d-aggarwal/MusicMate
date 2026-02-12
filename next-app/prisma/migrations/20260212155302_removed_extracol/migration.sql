/*
  Warnings:

  - You are about to drop the column `addedBy` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `spaceId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the `CurrentStream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_addedBy_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_spaceId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "addedBy",
DROP COLUMN "spaceId";

-- DropTable
DROP TABLE "CurrentStream";

-- DropTable
DROP TABLE "Space";

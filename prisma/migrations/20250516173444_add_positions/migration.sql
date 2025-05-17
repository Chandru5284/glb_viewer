/*
  Warnings:

  - You are about to drop the column `position` on the `Annotation` table. All the data in the column will be lost.
  - Added the required column `positionX` to the `Annotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionY` to the `Annotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionZ` to the `Annotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annotation" DROP COLUMN "position",
ADD COLUMN     "positionX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "positionY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "positionZ" DOUBLE PRECISION NOT NULL;

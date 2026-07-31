-- AlterTable
ALTER TABLE "profecias_mesianicas" ADD COLUMN     "categoria" TEXT;

-- CreateTable
CREATE TABLE "milagros_jesus" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "cita" TEXT NOT NULL,
    "paralelos" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "milagros_jesus_pkey" PRIMARY KEY ("id")
);

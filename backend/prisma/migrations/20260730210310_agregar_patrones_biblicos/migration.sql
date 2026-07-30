-- AlterTable
ALTER TABLE "espiritu_santo" ADD COLUMN     "orden" INTEGER,
ADD COLUMN     "referenciasAdicionales" JSONB NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "patrones_biblicos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patrones_biblicos_pkey" PRIMARY KEY ("id")
);

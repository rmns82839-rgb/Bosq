-- AlterTable
ALTER TABLE "numeros_biblicos" ADD COLUMN     "categoria" TEXT;

-- CreateTable
CREATE TABLE "jesus_en_libros" (
    "id" TEXT NOT NULL,
    "libro" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "testamento" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jesus_en_libros_pkey" PRIMARY KEY ("id")
);

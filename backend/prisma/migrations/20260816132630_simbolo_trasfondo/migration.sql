-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "fuentes" TEXT,
ADD COLUMN     "trasfondoAutor" TEXT,
ADD COLUMN     "trasfondoEpoca" TEXT;

-- AlterTable
ALTER TABLE "Simbolo" ADD COLUMN     "trasfondoCultural" TEXT;

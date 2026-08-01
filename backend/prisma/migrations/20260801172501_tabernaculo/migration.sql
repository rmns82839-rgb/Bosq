-- CreateTable
CREATE TABLE "elementos_tabernaculo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "cita" TEXT,
    "tipologiaCristo" TEXT,
    "descripcion" TEXT,
    "orden" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "elementos_tabernaculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "figuras_iglesia" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cita" TEXT,
    "cristoEnLaFigura" TEXT,
    "descripcion" TEXT,
    "orden" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "figuras_iglesia_pkey" PRIMARY KEY ("id")
);

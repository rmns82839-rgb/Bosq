-- CreateTable
CREATE TABLE "angeles" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "angeles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titulos_mesias" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "titulos_mesias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "numeros_biblicos" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "significado" TEXT NOT NULL,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "numeros_biblicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reyes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "reino" TEXT NOT NULL,
    "inicioAc" INTEGER,
    "finAc" INTEGER,
    "evaluacion" TEXT,
    "cita" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reyes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profecias_mesianicas" (
    "id" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "citaProfecia" TEXT NOT NULL,
    "citaCumplimiento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profecias_mesianicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "juicios_jehova" (
    "id" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT,
    "cita" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "juicios_jehova_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palabras_jesus" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "cita" TEXT NOT NULL,
    "resumen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "palabras_jesus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espiritu_santo" (
    "id" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "cita" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "espiritu_santo_pkey" PRIMARY KEY ("id")
);

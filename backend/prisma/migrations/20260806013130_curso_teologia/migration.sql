-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "autor" TEXT,
    "fechaEscritura" TEXT,
    "contextoGeneral" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leccion" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "semana" INTEGER,
    "titulo" TEXT NOT NULL,
    "tema" TEXT,
    "pasajeBase" TEXT,
    "introduccion" TEXT,
    "contextoHistorico" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersiculoMemoria" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "cita" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VersiculoMemoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretacion" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "escuela" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "esPosturaPropia" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Interpretacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simbolo" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "significado" TEXT NOT NULL,
    "referencias" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Simbolo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipologia" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "elemento" TEXT NOT NULL,
    "cristoEnEl" TEXT NOT NULL,
    "cita" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tipologia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profecia" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "citaBase" TEXT,
    "citaCumplimiento" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Profecia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "nombreBiblico" TEXT NOT NULL,
    "ubicacion" TEXT,
    "equivalenteActual" TEXT,
    "nota" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opcion" (
    "id" TEXT NOT NULL,
    "preguntaId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "esCorrecta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Opcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progreso" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'no_iniciada',
    "completadaEn" TIMESTAMP(3),
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntentoExamen" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "leccionId" TEXT NOT NULL,
    "numeroIntento" INTEGER NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "respuestas" JSONB,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntentoExamen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_slug_key" ON "Curso"("slug");

-- CreateIndex
CREATE INDEX "Curso_activo_orden_idx" ON "Curso"("activo", "orden");

-- CreateIndex
CREATE INDEX "Leccion_cursoId_idx" ON "Leccion"("cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "Leccion_cursoId_orden_key" ON "Leccion"("cursoId", "orden");

-- CreateIndex
CREATE INDEX "VersiculoMemoria_leccionId_idx" ON "VersiculoMemoria"("leccionId");

-- CreateIndex
CREATE INDEX "Interpretacion_leccionId_idx" ON "Interpretacion"("leccionId");

-- CreateIndex
CREATE INDEX "Simbolo_leccionId_idx" ON "Simbolo"("leccionId");

-- CreateIndex
CREATE INDEX "Tipologia_leccionId_idx" ON "Tipologia"("leccionId");

-- CreateIndex
CREATE INDEX "Profecia_leccionId_idx" ON "Profecia"("leccionId");

-- CreateIndex
CREATE INDEX "Ciudad_leccionId_idx" ON "Ciudad"("leccionId");

-- CreateIndex
CREATE INDEX "Pregunta_leccionId_idx" ON "Pregunta"("leccionId");

-- CreateIndex
CREATE INDEX "Opcion_preguntaId_idx" ON "Opcion"("preguntaId");

-- CreateIndex
CREATE INDEX "Progreso_usuarioId_idx" ON "Progreso"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Progreso_usuarioId_leccionId_key" ON "Progreso"("usuarioId", "leccionId");

-- CreateIndex
CREATE INDEX "IntentoExamen_usuarioId_leccionId_idx" ON "IntentoExamen"("usuarioId", "leccionId");

-- CreateIndex
CREATE UNIQUE INDEX "IntentoExamen_usuarioId_leccionId_numeroIntento_key" ON "IntentoExamen"("usuarioId", "leccionId", "numeroIntento");

-- AddForeignKey
ALTER TABLE "Leccion" ADD CONSTRAINT "Leccion_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersiculoMemoria" ADD CONSTRAINT "VersiculoMemoria_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpretacion" ADD CONSTRAINT "Interpretacion_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simbolo" ADD CONSTRAINT "Simbolo_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipologia" ADD CONSTRAINT "Tipologia_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profecia" ADD CONSTRAINT "Profecia_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciudad" ADD CONSTRAINT "Ciudad_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opcion" ADD CONSTRAINT "Opcion_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntentoExamen" ADD CONSTRAINT "IntentoExamen_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

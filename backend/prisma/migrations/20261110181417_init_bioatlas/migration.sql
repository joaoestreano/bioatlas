-- CreateEnum
CREATE TYPE "SpeciesCategory" AS ENUM ('ANIMAL', 'PLANT', 'FUNGI', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'ILLUSTRATION', 'FOSSIL', 'OTHER');

-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('WEIGHT', 'LENGTH', 'HEIGHT', 'WINGSPAN', 'LIFESPAN');

-- CreateEnum
CREATE TYPE "DistributionType" AS ENUM ('NATIVE', 'INTRODUCED', 'EXTINCT_RANGE', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "commonName" TEXT,
    "category" "SpeciesCategory" NOT NULL,
    "description" TEXT,
    "extinct" BOOLEAN NOT NULL DEFAULT false,
    "conservationStatus" TEXT,
    "taxonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "externalId" TEXT,
    "provider" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "type" "MeasurementType" NOT NULL,
    "minimum" DOUBLE PRECISION,
    "maximum" DOUBLE PRECISION,
    "average" DOUBLE PRECISION,
    "unit" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesMedia" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "type" "MediaType" NOT NULL,
    "license" TEXT,
    "author" TEXT,
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeciesMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeciesSource" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "retrievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeciesSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "countryCode" TEXT,
    "type" "DistributionType" NOT NULL DEFAULT 'UNKNOWN',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "eventDate" TIMESTAMP(3),
    "locality" TEXT,
    "source" TEXT,
    "externalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_scientificName_key" ON "Species"("scientificName");

-- CreateIndex
CREATE INDEX "Species_category_idx" ON "Species"("category");

-- CreateIndex
CREATE INDEX "Species_extinct_idx" ON "Species"("extinct");

-- CreateIndex
CREATE INDEX "Species_commonName_idx" ON "Species"("commonName");

-- CreateIndex
CREATE INDEX "Taxonomy_scientificName_idx" ON "Taxonomy"("scientificName");

-- CreateIndex
CREATE INDEX "Taxonomy_rank_idx" ON "Taxonomy"("rank");

-- CreateIndex
CREATE INDEX "Taxonomy_parentId_idx" ON "Taxonomy"("parentId");

-- CreateIndex
CREATE INDEX "Measurement_speciesId_idx" ON "Measurement"("speciesId");

-- CreateIndex
CREATE INDEX "Measurement_type_idx" ON "Measurement"("type");

-- CreateIndex
CREATE INDEX "SpeciesMedia_speciesId_idx" ON "SpeciesMedia"("speciesId");

-- CreateIndex
CREATE INDEX "SpeciesSource_speciesId_idx" ON "SpeciesSource"("speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "SpeciesSource_provider_externalId_key" ON "SpeciesSource"("provider", "externalId");

-- CreateIndex
CREATE INDEX "Distribution_speciesId_idx" ON "Distribution"("speciesId");

-- CreateIndex
CREATE INDEX "Distribution_countryCode_idx" ON "Distribution"("countryCode");

-- CreateIndex
CREATE INDEX "Occurrence_speciesId_idx" ON "Occurrence"("speciesId");

-- CreateIndex
CREATE INDEX "Occurrence_latitude_longitude_idx" ON "Occurrence"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "Species" ADD CONSTRAINT "Species_taxonId_fkey" FOREIGN KEY ("taxonId") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taxonomy" ADD CONSTRAINT "Taxonomy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesMedia" ADD CONSTRAINT "SpeciesMedia_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeciesSource" ADD CONSTRAINT "SpeciesSource_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;

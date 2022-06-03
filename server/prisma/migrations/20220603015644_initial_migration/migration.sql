/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserMediaList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MPAARating" AS ENUM ('G', 'PG', 'PG13', 'R', 'NC17');

-- CreateEnum
CREATE TYPE "CastRole" AS ENUM ('WRITER', 'DIRECTOR', 'ACTOR', 'PRODUCER', 'EXECUTIVE_PRODUCER');

-- CreateEnum
CREATE TYPE "TVOrMovie" AS ENUM ('TV', 'MOVIE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UserMediaList";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Person" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "suffix" TEXT,
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "fullTitle" TEXT,
    "releaseDate" TIMESTAMP(3),
    "runtimeMins" INTEGER,
    "overview" TEXT,
    "alternateOverview" TEXT,
    "tagline" TEXT,
    "mpaaRating" "MPAARating" NOT NULL,
    "imdbRating" INTEGER,
    "imdbVoteCount" INTEGER,
    "metacriticRating" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ratingVoteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TVShow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "fullTitle" TEXT,
    "type" TEXT NOT NULL DEFAULT E'TV Show',
    "releaseDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "runtimeMins" INTEGER,
    "overview" TEXT,
    "alternateOverview" TEXT,
    "tagline" TEXT,
    "imdbRating" INTEGER,
    "imdbVoteCount" INTEGER,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ratingVoteCount" INTEGER NOT NULL DEFAULT 0,
    "airTime" TEXT NOT NULL,
    "nextScheduledAirtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TVShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "awardType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "personId" UUID NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie_Cast" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movieId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "role" "CastRole" NOT NULL,
    "characterName" TEXT,

    CONSTRAINT "Movie_Cast_pkey" PRIMARY KEY ("personId","movieId","role")
);

-- CreateTable
CREATE TABLE "TV_Cast" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvEpisodeId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "role" "CastRole" NOT NULL,
    "characterName" TEXT,
    "tvShowId" UUID,

    CONSTRAINT "TV_Cast_pkey" PRIMARY KEY ("personId","tvEpisodeId","role")
);

-- CreateTable
CREATE TABLE "Genre" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mediaId" UUID NOT NULL,
    "genre" TEXT NOT NULL,
    "type" "TVOrMovie" NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre","mediaId")
);

-- CreateTable
CREATE TABLE "TV_Episodes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvShowId" UUID NOT NULL,
    "season" INTEGER NOT NULL,

    CONSTRAINT "TV_Episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_List" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "listTitle" TEXT NOT NULL,
    "type" "TVOrMovie" NOT NULL,

    CONSTRAINT "User_List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies_On_List" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movieId" UUID NOT NULL,
    "userListId" UUID NOT NULL,

    CONSTRAINT "Movies_On_List_pkey" PRIMARY KEY ("movieId","userListId")
);

-- CreateTable
CREATE TABLE "TV_Shows_On_List" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvShowId" UUID NOT NULL,
    "userListId" UUID NOT NULL,

    CONSTRAINT "TV_Shows_On_List_pkey" PRIMARY KEY ("tvShowId","userListId")
);

-- CreateTable
CREATE TABLE "TV_On_Network" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvShowId" UUID NOT NULL,
    "networkId" UUID NOT NULL,

    CONSTRAINT "TV_On_Network_pkey" PRIMARY KEY ("tvShowId","networkId")
);

-- CreateTable
CREATE TABLE "User_Ratings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "tvShowId" UUID,
    "movieId" UUID,
    "type" "TVOrMovie" NOT NULL,

    CONSTRAINT "User_Ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie_Cast" ADD CONSTRAINT "Movie_Cast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie_Cast" ADD CONSTRAINT "Movie_Cast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Cast" ADD CONSTRAINT "TV_Cast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Cast" ADD CONSTRAINT "TV_Cast_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TVShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Cast" ADD CONSTRAINT "TV_Cast_tvEpisodeId_fkey" FOREIGN KEY ("tvEpisodeId") REFERENCES "TV_Episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Episodes" ADD CONSTRAINT "TV_Episodes_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TVShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_List" ADD CONSTRAINT "User_List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies_On_List" ADD CONSTRAINT "Movies_On_List_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies_On_List" ADD CONSTRAINT "Movies_On_List_userListId_fkey" FOREIGN KEY ("userListId") REFERENCES "User_List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Shows_On_List" ADD CONSTRAINT "TV_Shows_On_List_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TVShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_Shows_On_List" ADD CONSTRAINT "TV_Shows_On_List_userListId_fkey" FOREIGN KEY ("userListId") REFERENCES "User_List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_On_Network" ADD CONSTRAINT "TV_On_Network_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TVShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TV_On_Network" ADD CONSTRAINT "TV_On_Network_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Ratings" ADD CONSTRAINT "User_Ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Ratings" ADD CONSTRAINT "User_Ratings_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Ratings" ADD CONSTRAINT "User_Ratings_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TVShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

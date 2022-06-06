/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMediaList` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MPAARating" AS ENUM ('G', 'PG', 'PG13', 'R', 'NC17');

-- CreateEnum
CREATE TYPE "CastRole" AS ENUM ('WRITER', 'DIRECTOR', 'ACTOR', 'PRODUCER', 'EXECUTIVE_PRODUCER');

-- CreateEnum
CREATE TYPE "TVOrMovie" AS ENUM ('TV', 'MOVIE');

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserMediaList";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "suffix" TEXT,
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "tmdbPopularity" REAL,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "tmdbPopularity" REAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "fullTitle" TEXT,
    "releaseDate" TIMESTAMP(3),
    "USReleaseDate" TIMESTAMP(3),
    "runtimeMins" INTEGER,
    "overview" TEXT,
    "alternateOverview" TEXT,
    "tagline" TEXT,
    "mpaaRating" "MPAARating" NOT NULL,
    "imdbRating" INTEGER,
    "imdbVoteCount" INTEGER,
    "metacriticRating" INTEGER,
    "rtRating" INTEGER,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_show" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imdbId" TEXT,
    "tmdbId" TEXT,
    "tmdbPopularity" REAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "fullTitle" TEXT,
    "type" TEXT NOT NULL DEFAULT E'TV Show',
    "releaseDate" TIMESTAMP(3),
    "USReleaseDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "runtimeMins" INTEGER,
    "overview" TEXT,
    "alternateOverview" TEXT,
    "tagline" TEXT,
    "imdbRating" INTEGER,
    "imdbVoteCount" INTEGER,
    "airTime" TEXT NOT NULL,
    "nextScheduledAirtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tv_show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_company" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tmdbId" TEXT,
    "imdbId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "production_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "network" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tmdbId" TEXT,
    "imdbId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "awardType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_list_item" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movieId" UUID NOT NULL,
    "userListId" UUID NOT NULL,

    CONSTRAINT "movie_list_item_pkey" PRIMARY KEY ("movieId","userListId")
);

-- CreateTable
CREATE TABLE "tv_show_list_item" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvSeriesId" UUID NOT NULL,
    "userListId" UUID NOT NULL,

    CONSTRAINT "tv_show_list_item_pkey" PRIMARY KEY ("tvSeriesId","userListId")
);

-- CreateTable
CREATE TABLE "tv_episode" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvSeriesId" UUID NOT NULL,
    "season" INTEGER NOT NULL,
    "tmdbId" TEXT NOT NULL,
    "imdbRating" INTEGER,
    "metacriticRating" INTEGER,
    "imdbVoteCount" INTEGER,

    CONSTRAINT "tv_episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies_casts" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movieId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "role" "CastRole" NOT NULL,
    "characterName" TEXT,

    CONSTRAINT "movies_casts_pkey" PRIMARY KEY ("personId","movieId","role")
);

-- CreateTable
CREATE TABLE "tv_casts" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvEpisodeId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "role" "CastRole" NOT NULL,
    "characterName" TEXT,
    "tvSeriesId" UUID NOT NULL,

    CONSTRAINT "tv_casts_pkey" PRIMARY KEY ("personId","tvEpisodeId","role")
);

-- CreateTable
CREATE TABLE "media_genres" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,
    "tvSeriesId" UUID,
    "movieId" UUID,

    CONSTRAINT "media_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_lists" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "listTitle" TEXT NOT NULL,
    "type" "TVOrMovie",

    CONSTRAINT "users_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_series_networks" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tvSeriesId" UUID NOT NULL,
    "networkId" UUID NOT NULL,

    CONSTRAINT "tv_series_networks_pkey" PRIMARY KEY ("tvSeriesId","networkId")
);

-- CreateTable
CREATE TABLE "users_ratings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "tvSeriesId" UUID,
    "movieId" UUID,

    CONSTRAINT "users_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_awards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "awardId" UUID NOT NULL,
    "tvSeriesId" UUID,
    "tvEpisodeId" UUID,
    "movieId" UUID,

    CONSTRAINT "media_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_production_companies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" UUID NOT NULL,
    "tvSeriesId" UUID,
    "movieId" UUID,

    CONSTRAINT "media_production_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "movie_list_item" ADD CONSTRAINT "movie_list_item_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_list_item" ADD CONSTRAINT "movie_list_item_userListId_fkey" FOREIGN KEY ("userListId") REFERENCES "users_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_show_list_item" ADD CONSTRAINT "tv_show_list_item_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_show_list_item" ADD CONSTRAINT "tv_show_list_item_userListId_fkey" FOREIGN KEY ("userListId") REFERENCES "users_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_episode" ADD CONSTRAINT "tv_episode_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_casts" ADD CONSTRAINT "tv_casts_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_casts" ADD CONSTRAINT "tv_casts_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_casts" ADD CONSTRAINT "tv_casts_tvEpisodeId_fkey" FOREIGN KEY ("tvEpisodeId") REFERENCES "tv_episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_lists" ADD CONSTRAINT "users_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_series_networks" ADD CONSTRAINT "tv_series_networks_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_series_networks" ADD CONSTRAINT "tv_series_networks_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_ratings" ADD CONSTRAINT "users_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_ratings" ADD CONSTRAINT "users_ratings_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_ratings" ADD CONSTRAINT "users_ratings_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_awards" ADD CONSTRAINT "media_awards_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_awards" ADD CONSTRAINT "media_awards_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_awards" ADD CONSTRAINT "media_awards_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "award"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_awards" ADD CONSTRAINT "media_awards_tvEpisodeId_fkey" FOREIGN KEY ("tvEpisodeId") REFERENCES "tv_episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_production_companies" ADD CONSTRAINT "media_production_companies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_production_companies" ADD CONSTRAINT "media_production_companies_tvSeriesId_fkey" FOREIGN KEY ("tvSeriesId") REFERENCES "tv_show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_production_companies" ADD CONSTRAINT "media_production_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "production_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

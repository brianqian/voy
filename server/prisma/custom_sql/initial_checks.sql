ALTER TABLE
  media_production_companies
ADD
  CONSTRAINT tv_or_movie_check CHECK (
    (
      media_production_companies."tvShowId" IS NULL
      and media_production_companies."movieId" IS NOT NULL
    )
    or (
      media_production_companies."tvShowId" IS NOT NULL
      and media_production_companies."movieId" IS NULL
    )
  )
ALTER TABLE
  media_genres
ADD
  CONSTRAINT tv_or_movie_check CHECK (
    (
      media_genres."tvShowId" IS NULL
      and media_genres."movieId" IS NOT NULL
    )
    or (
      media_genres."tvShowId" IS NOT NULL
      and media_genres."movieId" IS NULL
    )
  )
ALTER TABLE
  users_ratings
ADD
  CONSTRAINT tv_or_movie_check CHECK (
    (
      users_ratings."tvShowId" IS NULL
      and users_ratings."movieId" IS NOT NULL
    )
    or (
      users_ratings."tvShowId" IS NOT NULL
      and users_ratings."movieId" IS NULL
    )
  )
ALTER TABLE
  media_awards
ADD
  CONSTRAINT tv_or_movie_check CHECK (
    (
      media_awards."tvShowId" IS NULL
      and media_awards."movieId" IS NOT NULL
    )
    or (
      media_awards."tvShowId" IS NOT NULL
      and media_awards."movieId" IS NULL
    )
  )
ALTER TABLE
  users_ratings
ADD
  CONSTRAINT users_ratings_check CHECK (users_ratings.rating <= 20)
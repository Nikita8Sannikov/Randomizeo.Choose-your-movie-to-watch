export async function findMovieByExternalIds(Movie, body) {
  const tmdbId = body.tmdbId != null && body.tmdbId !== "" ? Number(body.tmdbId) : null;
  const kinopoiskId =
    body.kinopoiskId != null && body.kinopoiskId !== "" ? Number(body.kinopoiskId) : null;

  if (Number.isFinite(tmdbId) && tmdbId > 0) {
    const query = { tmdbId };
    if (body.tmdbMediaType === "tv" || body.tmdbMediaType === "movie") {
      query.tmdbMediaType = body.tmdbMediaType;
    } else if (typeof body.isSeries === "boolean") {
      query.tmdbMediaType = body.isSeries ? "tv" : "movie";
    }
    const byTmdb = await Movie.findOne(query);
    if (byTmdb) return byTmdb;
  }

  if (Number.isFinite(kinopoiskId) && kinopoiskId > 0) {
    return Movie.findOne({ kinopoiskId });
  }

  return null;
}

export function movieDocFromBody(body) {
  return {
    title: body.title,
    img: body.img,
    shortDescription: body.shortDescription,
    shortDescriptionEn: body.shortDescriptionEn,
    description: body.description,
    descriptionEn: body.descriptionEn,
    titleEn: body.titleEn,
    year: body.year === "" || body.year == null ? undefined : body.year,
    genres: body.genres,
    rating: body.rating,
    movieLength: body.movieLength,
    kinopoiskId: body.kinopoiskId || undefined,
    tmdbId: body.tmdbId || undefined,
    tmdbMediaType: body.tmdbId ? (body.tmdbMediaType || (body.isSeries ? "tv" : "movie")) : undefined,
    isSeries: body.isSeries,
  };
}

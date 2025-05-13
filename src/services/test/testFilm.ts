import { faker } from "@faker-js/faker";
import { Film } from "@/types/film";

export function getFakeFilmByMediaId(mediaId: string): Film {
  const directors = Array.from({ length: 2 }, (_, i) => ({
    id: `director${i}`,
    name: faker.person.fullName(),
  }));
  const actors = Array.from({ length: 3 }, (_, i) => ({
    id: `actor${i}`,
    name: faker.person.fullName(),
  }));

  return {
    filmId: faker.string.uuid(),
    mediaContent: {
      mediaContentId: mediaId,
      title: faker.lorem.words(3),
      mainPictureLink: faker.image.urlLoremFlickr({ category: "film" }),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 10 }),
      releaseDate: faker.date.past(),
      genres: [{ genreId: "g3", name: "Comedy" }],
      mediaContentType: { typeId: "4", name: "Film" },
    },
    movieInfo: {
      movieInfoId: faker.string.uuid(),
      durationInMinutes: faker.number.int({ min: 80, max: 180 }),
      directors: directors,
      actors: actors,
    },
  };
}

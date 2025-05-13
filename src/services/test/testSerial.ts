import { faker } from "@faker-js/faker";
import { Serial } from "@/types/serial";

export function getFakeSerialByMediaId(mediaId: string): Serial {
  const directors = Array.from({ length: 2 }, (_, i) => ({
    id: `director${i}`,
    name: faker.person.fullName(),
  }));
  const actors = Array.from({ length: 3 }, (_, i) => ({
    id: `actor${i}`,
    name: faker.person.fullName(),
  }));

  return {
    serialId: faker.string.uuid(),
    mediaContent: {
      mediaContentId: mediaId,
      title: faker.lorem.words(3),
      mainPictureLink: faker.image.urlLoremFlickr({ category: "serial" }),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 10 }),
      releaseDate: faker.date.past(),
      genres: [{ genreId: "g4", name: "Drama" }],
      mediaContentType: { typeId: "5", name: "Serial" },
    },
    movieInfo: {
      movieInfoId: faker.string.uuid(),
      durationInMinutes: faker.number.int({ min: 40, max: 60 }),
      directors: directors,
      actors: actors,
    },
    numberOfSeasons: faker.number.int({ min: 1, max: 5 }),
    numberOfEpisodes: faker.number.int({ min: 10, max: 100 }),
  };
}

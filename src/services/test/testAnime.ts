import { faker } from "@faker-js/faker";
import { Anime } from "@/types/anime";

export function getFakeAnimeByMediaId(mediaId: string): Anime {
  const animeStudios = Array.from({ length: 2 }, (_, i) => ({
    id: `studio${i}`,
    name: faker.company.name(),
  }));

  return {
    animeId: faker.string.uuid(),
    rank: faker.number.int({ min: 1, max: 5000 }),
    numberOfEpisodes: faker.number.int({ min: 1, max: 50 }),
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    mediaContent: {
      mediaContentId: mediaId,
      title: faker.lorem.words(3),
      mainPictureLink: faker.image.urlLoremFlickr({ category: "anime" }),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 10 }),
      releaseDate: faker.date.past(),
      genres: [{ genreId: "g1", name: "Action" }],
      mediaContentType: { typeId: "2", name: "Anime" },
    },
    animeStudios: animeStudios,
  };
}

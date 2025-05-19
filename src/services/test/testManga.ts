import { faker } from "@faker-js/faker";
import { Manga } from "@/types/manga";

export function getFakeMangaByMediaId(mediaId: string): Manga {
  const authors = Array.from({ length: 2 }, (_, i) => ({
    id: `author${i}`,
    name: faker.person.fullName(),
  }));

  return {
    mangaId: faker.string.uuid(),
    rank: faker.number.int({ min: 1, max: 100 }),
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    numberOfVolumes: faker.number.int({ min: 1, max: 30 }),
    numberOfChapters: faker.number.int({ min: 10, max: 200 }),
    mediaContent: {
      mediaContentId: mediaId,
      title: faker.lorem.words(3),
      mainPictureLink: faker.image.urlLoremFlickr({ category: "manga" }),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 10 }),
      releaseDate: faker.date.past(),
      genres: [{ genreId: "g2", name: "Adventure" }],
      mediaContentType: { typeId: "3", name: "Manga" },
    },
    mangaAuthors: authors,
  };
}

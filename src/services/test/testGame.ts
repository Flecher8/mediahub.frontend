import { faker } from "@faker-js/faker";
import { Game } from "@/types/game";
import { GameDeveloper } from "@/types/gameDeveloper";
import { GamePublisher } from "@/types/gamePublisher";
import { Platform } from "@/types/platform";

// Fake function to simulate an API call returning a Game by mediaId
export function getFakeGameByMediaId(mediaId: string): Game {
  // Generate random devs/pubs/platforms for demonstration
  const devs: GameDeveloper[] = Array.from({ length: 2 }, (_, i) => ({
    gameDeveloperId: `dev${i}`,
    name: faker.company.name(),
  }));
  const pubs: GamePublisher[] = Array.from({ length: 2 }, (_, i) => ({
    id: `pub${i}`,
    name: faker.company.name(),
  }));
  const plats: Platform[] = [
    { gamePlatformId: "p1", name: "PC" },
    { gamePlatformId: "p2", name: "PlayStation 5" },
    { gamePlatformId: "p3", name: "Xbox Series X" },
  ];

  // Return a new Game object
  return {
    gameId: faker.string.uuid(),
    metacriticRating: faker.number.int({ min: 1, max: 100 }),
    playtimeHours: faker.number.int({ min: 1, max: 200 }),
    esrbRating: faker.helpers.arrayElement([10, 13, 17, 18]),
    gameDevelopers: devs,
    gamePublishers: pubs,
    gamePlatforms: faker.helpers.arrayElements(plats),
    mediaContent: {
      mediaContentId: mediaId,
      title: faker.lorem.words(3),
      mainPictureLink: faker.image.urlLoremFlickr({ category: "abstract" }),
      description: faker.lorem.paragraph({min: 20, max: 30}),
      rating: faker.number.float({ min: 1, max: 10 }),
      releaseDate: faker.date.past(),
      genres: [{ genreId: "g1", name: "Action" }],
      mediaContentType: { typeId: "1", name: "Game" },
    },
  };
}
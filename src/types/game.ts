import { GameDeveloper } from "./gameDeveloper";
import { MediaContent } from "./mediaContent";
import { Platform } from "./platform";
import { GamePublisher } from "./gamePublisher";
import { GameTag } from "./gameTag";

export interface Game {
  gameId: string;
  metacriticRating: number;
  playtimeHours: number;
  esrbRating: number;
  mediaContent: MediaContent;
  gameDevelopers: GameDeveloper[];
  gamePublishers: GamePublisher[];
  gamePlatforms: Platform[];
  gameTags: GameTag[];
}
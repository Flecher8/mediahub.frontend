import { faker } from '@faker-js/faker';
import { MediaContent } from '@/types/mediaContent';
import { MediaContentType } from '@/types/mediaContentType';
import { Genre } from '@/types/genre';

const genreOptions: Genre[] = [
  { genreId: '1', name: 'Action' },
  { genreId: '2', name: 'Adventure' },
  { genreId: '3', name: 'Comedy' },
  { genreId: '4', name: 'Drama' },
  { genreId: '5', name: 'Sci-Fi' },
  { genreId: '6', name: 'Horror' },
];

const mediaContentTypes: MediaContentType[] = [
  { typeId: '1', name: 'Game' },
  { typeId: '2', name: 'Anime' },
  { typeId: '3', name: 'Manga' },
  { typeId: '4', name: 'Film' },
  { typeId: '5', name: 'Serial' },
];

export const testMedia: MediaContent[] = Array.from({ length: 10 }, (_, index) => {
  const shuffledGenres = [...genreOptions].sort(() => 0.5 - Math.random());
  const numGenres = Math.floor(Math.random() * 2) + 1; // 1 or 2 genres
  const selectedGenres = shuffledGenres.slice(0, numGenres);

  // Randomly select a media content type
  const randomMediaContentType = faker.helpers.arrayElement(mediaContentTypes);

  return {
    mediaContentId: (index + 1).toString(),
    title: `${randomMediaContentType.name} ${index + 1}`,
    mainPictureLink:
      'https://as1.ftcdn.net/v2/jpg/00/95/33/18/1000_F_95331883_vDtEwXTSqXWdhHn7iSvnICpHHIF5ihtU.jpg',
    description: faker.lorem.paragraph({ min: 20, max: 30 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    releaseDate: faker.date.past(),
    genres: selectedGenres,
    mediaContentType: randomMediaContentType,
  };
});

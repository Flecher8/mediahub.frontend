import MediaCard, { MediaItem } from "./mediaCard";

interface MediaGridProps {
  mediaList: MediaItem[];
}

export default function MediaGrid({ mediaList }: MediaGridProps) {
  return (
    <div className="grid content-between place-content-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mediaList.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  );
}

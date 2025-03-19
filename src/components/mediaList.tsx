import { Media } from "@/types/media";
import MediaListItem from "./mediaListItem";


interface MediaListProps {
  mediaItems: Media[];
  collectionId: string;
}

export default function MediaList({ mediaItems, collectionId }: MediaListProps) {
  return (
    <div className="flex flex-col gap-4">
      {mediaItems.map((media) => (
        <MediaListItem key={media.id} media={media} collectionId={collectionId} />
      ))}
    </div>
  );
}

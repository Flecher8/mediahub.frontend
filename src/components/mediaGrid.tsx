import { Media } from "@/types/media";
import MediaCard from "./mediaCard";

interface MediaGridProps {
  mediaList: Media[];
}

export default function MediaGrid({ mediaList }: MediaGridProps) {
  return (
    <div className="flex flex-wrap items-center md:justify-between justify-center gap-3">
      {mediaList.map((media) => (
        <div key={media.id}>
          <MediaCard media={media} />
        </div>
      ))}
    </div>
  );
}

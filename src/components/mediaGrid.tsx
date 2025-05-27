import { MediaContent } from "@/types/mediaContent";
import MediaCard from "./mediaCard";

interface MediaGridProps {
  mediaList: MediaContent[];
}

export default function MediaGrid({ mediaList }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 justify-items-center">
      {mediaList.map((media) => (
        <div key={media.mediaContentId} className="w-[300px] h-[600px]">
          <MediaCard media={media} />
        </div>
      ))}
    </div>
  );
}

import { MediaContent } from "@/types/mediaContent";
import MediaCard from "./mediaCard";

interface MediaGridProps {
  mediaList: MediaContent[];
}

export default function MediaGrid({ mediaList }: MediaGridProps) {
  return (
    // <div className="flex flex-wrap items-center md:justify-between justify-center gap-3">
    <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-12 w-full">
      {mediaList.map((media) => (
        <div key={media.mediaContentId}>
          <MediaCard media={media} />
        </div>
      ))}
    </div>
  );
}

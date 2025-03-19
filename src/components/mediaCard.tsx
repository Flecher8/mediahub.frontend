import { MediaItem } from "@/types/mediaItem";
import Link from "next/link";

interface MediaCardProps {
  media: MediaItem;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <Link href={`/media/${media.id}`} className="flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer max-w-[300px] max-h-[500px]">
        <figure>
          <img
            src={media.image}
            alt={media.name}
            className="object-cover w-full h-82"
          />
        </figure>
        <div className="card-body m-1">
          <h2 className="card-title text-lg truncate">{media.name}</h2>
        </div>
      </div>
    </Link>
  );
}

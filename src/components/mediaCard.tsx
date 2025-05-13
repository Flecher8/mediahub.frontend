import { MediaContent } from "@/types/mediaContent";
import Link from "next/link";

interface MediaCardProps {
  media: MediaContent;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <Link href={`/media/${media.mediaContentId}`} className="flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
        <figure>
          <img
            src={media.mainPictureLink}
            alt={media.title}
            className="object-cover w-full h-82"
          />
        </figure>
        <div className="card-body m-1">
          <h2 className="card-title text-lg truncate">{media.title}</h2>
        </div>
      </div>
    </Link>
  );
}

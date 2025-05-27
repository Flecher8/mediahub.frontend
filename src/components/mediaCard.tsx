// components/mediaCard.tsx
import { MediaContent } from "@/types/mediaContent";
import Link from "next/link";

interface MediaCardProps {
	media: MediaContent;
}

const defaultImg = "https://as1.ftcdn.net/v2/jpg/00/95/33/18/1000_F_95331883_vDtEwXTSqXWdhHn7iSvnICpHHIF5ihtU.jpg";

export default function MediaCard({ media }: MediaCardProps) {
	return (
		<Link href={`/media/${media.mediaContentId}`} className="block w-full h-full">
			<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer w-full h-full flex flex-col">
				<figure className="h-4/5 overflow-hidden">
					<img
						src={media.mainPictureLink ?? defaultImg}
						alt={media.title}
						className="object-cover w-full h-full"
					/>
				</figure>
				<div className="card-body p-2 h-1/5 flex items-center justify-center">
					<h2
						className="
              card-title
              text-lg
              text-center
              whitespace-normal
              break-words
              ">
						{media.title}
					</h2>
				</div>
			</div>
		</Link>
	);
}

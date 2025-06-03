import { MediaContent } from "@/types/mediaContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface MediaListItemProps {
	media: MediaContent;
	collectionId: string;
	onRequestDelete: (media: MediaContent) => void;
}

const isMissingImage = "https://as1.ftcdn.net/v2/jpg/00/95/33/18/1000_F_95331883_vDtEwXTSqXWdhHn7iSvnICpHHIF5ihtU.jpg";

export default function MediaListItem({ media, onRequestDelete }: MediaListItemProps) {
	return (
		<div className="bg-base-200 p-4 rounded flex flex-wrap items-start justify-between gap-4">
			{/* Left: image + info */}
			<Link href={`/media/${media.mediaContentId}`}>
				<div className="flex gap-4 flex-1 min-w-0">
					<img
						src={media.mainPictureLink ?? isMissingImage}
						alt={media.title}
						className="object-cover rounded w-32 h-32 flex-shrink-0"
					/>
					<div className="flex flex-col justify-center flex-1 min-w-0">
						<h2 className="text-2xl font-bold break-words whitespace-normal">{media.title}</h2>
						<p className="text-lg break-words whitespace-normal">
							<strong>Type:</strong> {media.mediaContentType.name || "Unknown"}
						</p>
						<p className="text-lg break-words whitespace-normal">
							<strong>Genres:</strong> {media.genres.map(g => g.name).join(", ")}
						</p>
					</div>
				</div>
			</Link>

			{/* Right: delete button */}
			<button className="btn btn-accent flex-shrink-0 self-start" onClick={() => onRequestDelete(media)}>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</div>
	);
}

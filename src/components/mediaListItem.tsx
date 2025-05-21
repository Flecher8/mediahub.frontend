"use client";
import { MediaContent } from "@/types/mediaContent";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface MediaListItemProps {
	media: MediaContent;
	collectionId: string;
	onRequestDelete: (media: MediaContent) => void;
}

export default function MediaListItem({ media, collectionId, onRequestDelete }: MediaListItemProps) {
	return (
		<div className="bg-base-200 p-4 rounded flex items-center justify-between">
			{/* Left side: Image + Info */}
			<div className="flex gap-4 w-full">
				<img
					src={media.mainPictureLink}
					alt={media.title}
					className="object-cover rounded max-w-[300px] max-h-[400px]"
				/>
				<div className="flex flex-col justify-center">
					<h2 className="text-5xl font-bold truncate">{media.title}</h2>
					<p className="text-2xl">Type: {media.mediaContentType.name || "Unknown"}</p>
					<p className="text-2xl">Genres: {media.genres.map(g => g.name).join(", ")}</p>
				</div>
			</div>

			{/* Right side: Delete button */}
			<button className="btn btn-accent" onClick={() => onRequestDelete(media)}>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</div>
	);
}

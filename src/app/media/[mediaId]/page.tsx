"use client";
import { useParams } from "next/navigation";
import GameView from "@/components/mediaTypes/gameView";
import AnimeView from "@/components/mediaTypes/animeView";
import MangaView from "@/components/mediaTypes/mangaView";
import FilmView from "@/components/mediaTypes/filmView";
import SerialView from "@/components/mediaTypes/serialView";
import { useEffect, useState } from "react";
import { MediaContent } from "@/types/mediaContent";
import { MediaService } from "@/services/mediaService";

export default function MediaPage() {
	const params = useParams();
	const mediaId = params?.mediaId as string;

	if (!mediaId) {
		return <div>Media not found</div>;
	}

	const [mediaContent, setMediaContent] = useState<MediaContent | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaId) return;
		MediaService.getMediaById(mediaId)
			.then(setMediaContent)
			.catch(e => setError(e.message));
	}, [mediaId]);

	if (error !== null) {
		return <div>Media not found123</div>;
	}

	if (!mediaContent) {
		return <div>Media not found333</div>;
	}

	switch (mediaContent.mediaContentType.name) {
		case "Game":
			return <GameView mediaContent={mediaContent} />;
		case "Anime":
			return <AnimeView mediaContent={mediaContent} />;
		case "Manga":
			return <MangaView mediaContent={mediaContent} />;
		case "Film":
			return <FilmView mediaContent={mediaContent} />;
		case "Serial":
			return <SerialView mediaContent={mediaContent} />;
		default:
			return <div>Unsupported media type</div>;
	}
}

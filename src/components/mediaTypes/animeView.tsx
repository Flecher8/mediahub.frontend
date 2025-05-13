"use client";
import { Anime } from "@/types/anime";
import MediaLayout from "@/components/mediaLayout";
import { MediaContent } from "@/types/mediaContent";
import { useEffect, useState } from "react";
import { getFakeAnimeByMediaId } from "@/services/test/testAnime";
import { AnimesService } from "@/services/animesService";

interface AnimeViewProps {
	mediaContent: MediaContent;
}

export default function AnimeView({ mediaContent }: AnimeViewProps) {
	const [anime, setAnime] = useState<Anime | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaContent) return;
		AnimesService.getAnimeByMediaId(mediaContent.mediaContentId)
			.then(setAnime)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	if (!anime) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	const { rank, numberOfEpisodes, animeStudios, startDate, endDate } = anime;

	return (
		<MediaLayout mediaContent={mediaContent}>
			<div className="mt-2">
				<p>Rank: {rank}</p>
				<p>Episodes: {numberOfEpisodes}</p>
				<p>Studios: {animeStudios.map(st => st.name).join(", ")}</p>
				<p>Start: {startDate.toDateString()}</p>
				<p>End: {endDate.toDateString()}</p>
			</div>
		</MediaLayout>
	);
}

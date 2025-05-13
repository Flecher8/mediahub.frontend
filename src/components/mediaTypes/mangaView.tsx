"use client";
import { useEffect, useState } from "react";
import { Manga } from "@/types/manga";
import MediaLayout from "@/components/mediaLayout";
import { MediaContent } from "@/types/mediaContent";
import { MangasService } from "@/services/mangasService";

interface MangaViewProps {
	mediaContent: MediaContent;
}

export default function MangaView({ mediaContent }: MangaViewProps) {
	const [manga, setManga] = useState<Manga | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaContent) return;
		MangasService.getMangaByMediaId(mediaContent.mediaContentId)
			.then(setManga)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	if (!manga) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	const { rank, numberOfVolumes, numberOfChapters, startDate, endDate, authors } = manga;

	return (
		<MediaLayout mediaContent={mediaContent}>
			<div className="mt-2 space-y-3">
				<p>Rank: {rank}</p>
				<p>Volumes: {numberOfVolumes}</p>
				<p>Chapters: {numberOfChapters}</p>
				<p>Start Date: {startDate.toDateString()}</p>
				<p>End Date: {endDate.toDateString()}</p>
				<p>Authors: {authors.map(a => a.name).join(", ")}</p>
			</div>
		</MediaLayout>
	);
}

"use client";
import { useEffect, useState } from "react";
import { Film } from "@/types/film";
import MediaLayout from "@/components/mediaLayout";
import { MediaContent } from "@/types/mediaContent";
import { FilmsService } from "@/services/filmsService";

interface FilmViewProps {
	mediaContent: MediaContent;
}

export default function FilmView({ mediaContent }: FilmViewProps) {
	const [film, setFilm] = useState<Film | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaContent) return;
		FilmsService.getFilmByMediaId(mediaContent.mediaContentId)
			.then(setFilm)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	if (!film) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	const { movieInfo } = film;

	return (
		<MediaLayout mediaContent={mediaContent}>
			<div className="mt-2 space-y-3">
				<p>Duration: {movieInfo.durationInMinutes} minutes</p>
				<p>Directors: {movieInfo.directors.map(d => d.name).join(", ")}</p>
				<p>Actors: {movieInfo.actors.map(a => a.name).join(", ")}</p>
			</div>
		</MediaLayout>
	);
}

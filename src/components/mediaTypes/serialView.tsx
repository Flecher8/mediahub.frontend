"use client";
import { useEffect, useState } from "react";
import MediaLayout from "@/components/mediaLayout";
import { MediaContent } from "@/types/mediaContent";
import { Serial } from "@/types/serial";
import { getFakeSerialByMediaId } from "@/services/test/testSerial";
import { SerialsService } from "@/services/serialsService";

interface SerialViewProps {
	mediaContent: MediaContent;
}

export default function SerialView({ mediaContent }: SerialViewProps) {
	const [serial, setSerial] = useState<Serial | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaContent) return;
		SerialsService.getSerialByMediaId(mediaContent.mediaContentId)
			.then(setSerial)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	if (!serial) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	const { movieInfo, numberOfSeasons, numberOfEpisodes } = serial;

	return (
		<MediaLayout mediaContent={mediaContent}>
			<div className="mt-2 space-y-3">
				<p>Duration per Episode: {movieInfo.durationInMinutes} minutes</p>
				<p>Seasons: {numberOfSeasons}</p>
				<p>Episodes: {numberOfEpisodes}</p>
				<p>Directors: {movieInfo.directors.map(d => d.name).join(", ")}</p>
				<p>Actors: {movieInfo.actors.map(a => a.name).join(", ")}</p>
			</div>
		</MediaLayout>
	);
}

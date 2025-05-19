"use client";
import { Game } from "@/types/game";
import MediaLayout from "@/components/mediaLayout";
import { MediaContent } from "@/types/mediaContent";
import { useEffect, useState } from "react";
import { getFakeGameByMediaId } from "@/services/test/testGame";
import { GamesService } from "@/services/gamesService";

interface GameViewProps {
	mediaContent: MediaContent;
}

export default function GameView({ mediaContent }: GameViewProps) {
	const [game, setGame] = useState<Game | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mediaContent) return;
		GamesService.getGameByMediaId(mediaContent.mediaContentId)
			.then(setGame)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	if (!game) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	const {
		gameDevelopers: developers,
		gamePublishers: publishers,
		gamePlatforms: platforms,
		gameTags: tags,
		metacriticRating,
		playtimeHours
	} = game;

	return (
		<MediaLayout mediaContent={mediaContent}>
			<div className="space-y-3">
				<p>Metacritic: {metacriticRating}</p>
				<p>Playtime: {playtimeHours} hours</p>
				<p>Developers: {developers.map(d => d.name).join(", ")}</p>
				<p>Tags: {tags.map(d => d.name).join(", ")}</p>
				<p>Publishers: {publishers.map(p => p.name).join(", ")}</p>
				<p>Platforms: {platforms.map(pl => pl.name).join(", ")}</p>
			</div>
		</MediaLayout>
	);
}

"use client";
import { MediaContent } from "@/types/mediaContent";
import React, { useEffect, useState } from "react";
import { MediaService } from "@/services/mediaService";
import { AuthStore } from "@/services/auth/auth";

interface UserInteractionProps {
	mediaContent: MediaContent;
}

export default function UserInteraction({ mediaContent }: UserInteractionProps) {
	const [score, setScore] = useState<number | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	const user = AuthStore.getUserData();

	useEffect(() => {
		if (!mediaContent) return;
		if (!user) return;
		MediaService.getMediaScore(mediaContent.mediaContentId, user.id)
			.then(setScore)
			.catch(e => setError(e.message));
	}, [mediaContent]);

	const handleAddToCollection = () => {
		console.log("Add to collection with user score = ", score);
	};

	const handleSetScore = (value: string) => {
		const score = Number(value);
		// TODO Add score to current collection
		// MediaService.setMediaScore(Collection, mediaContent.mediaContentId, score);
		// setScore(score);
	};

	return (
		<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
			{/* Score Select */}
			<div className="form-control flex flex-col md:flex-row lg:items-center">
				<div className="flex flex-col md:flex-row gap-4">
					<label className="label text-white font-bold text-2xl">Your Score:</label>
					<select className="select select-bordered" value={score} onChange={e => handleSetScore(e.target.value)}>
						<option value={0}>Select</option>
						<option value={10}>(10) Masterpiece</option>
						<option value={9}>(9) Great</option>
						<option value={8}>(8) Very Good</option>
						<option value={7}>(7) Good</option>
						<option value={6}>(6) Fine</option>
						<option value={5}>(5) Average</option>
						<option value={4}>(4) Bad</option>
						<option value={3}>(3) Very Bad</option>
						<option value={2}>(2) Horrible</option>
						<option value={1}>(1) Appalling</option>
					</select>
				</div>
			</div>
			<div>
				{/* Add to Collection Button */}
				<button className="btn btn-accent" onClick={handleAddToCollection}>
					Add to current collection
				</button>
			</div>
		</div>
	);
}

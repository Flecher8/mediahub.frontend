"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MediaContent } from "@/types/mediaContent";
import { SelectedCollectionService } from "@/services/storages/selectedCollectionService";
import { MediaInteractionStatus } from "@/types/mediaInteractionStatus";
import { MediaInteractionStatusService } from "@/services/mediaInteractionStatusService";
import { ContentStatus } from "@/types/contentStatus";
import { ContentStatusService } from "@/services/contentStatusService";
import { Evaluation } from "@/types/evaluation";
import { EvaluationService } from "@/services/evaluationService";

interface Props {
	mediaContent: MediaContent;
}

export default function UserInteraction({ mediaContent }: Props) {
	const [interaction, setInteraction] = useState<MediaInteractionStatus | null>(null);
	const [statuses, setStatuses] = useState<ContentStatus[]>([]);
	const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// once-only
	const currentCollection = useMemo(() => SelectedCollectionService.get(), []);

	// your fixed label map:
	const evaluationLabels: Record<string, string> = {
		"10": "Masterpiece",
		"9": "Great",
		"8": "Very Good",
		"7": "Good",
		"6": "Fine",
		"5": "Average",
		"4": "Bad",
		"3": "Very Bad",
		"2": "Horrible",
		"1": "Appalling"
	};
	// descending numeric order:
	const numericOptions = useMemo(
		() => Object.entries(evaluationLabels).sort((a, b) => Number(b[0]) - Number(a[0])),
		[]
	);

	// load global lists once
	useEffect(() => {
		ContentStatusService.getAll()
			.then(setStatuses)
			.catch(e => setError(e.message));
		EvaluationService.getAll()
			.then(setEvaluations)
			.catch(e => setError(e.message));
	}, []);

	// load this one interaction whenever content or collection changes
	useEffect(() => {
		if (!currentCollection) {
			setLoading(false);
			return;
		}
		setLoading(true);
		MediaInteractionStatusService.getStatus(currentCollection.id, mediaContent.mediaContentId)
			.then(stat => setInteraction(stat))
			.catch(e => setError(e.message))
			.finally(() => setLoading(false));
	}, [currentCollection?.id, mediaContent.mediaContentId]);

	const handleAdd = async () => {
		if (!currentCollection) return;
		try {
			const stat = await MediaInteractionStatusService.add(currentCollection.id, mediaContent.mediaContentId);
			setInteraction(stat);
		} catch (e: any) {
			setError(e.message);
		}
	};

	const handleUpdateEvaluation = async (newEvalId: string) => {
		if (!interaction) return;
		try {
			const updated = await MediaInteractionStatusService.update(
				interaction.mediaInteractionStatusId,
				newEvalId, // always send the GUID
				interaction.contentStatus.contentStatusId
			);
			setInteraction(updated);
		} catch (e: any) {
			setError(e.message);
		}
	};

	const handleUpdateContentStatus = async (newStatusId: string) => {
		if (!interaction) return;
		try {
			const updated = await MediaInteractionStatusService.update(
				interaction.mediaInteractionStatusId,
				interaction.evaluation.evaluationId,
				newStatusId
			);
			setInteraction(updated);
		} catch (e: any) {
			setError(e.message);
		}
	};

	const handleRemove = async () => {
		if (!currentCollection) return;
		try {
			await MediaInteractionStatusService.remove(currentCollection.id, mediaContent.mediaContentId);
			setInteraction(null);
		} catch (e: any) {
			setError(e.message);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	// no interaction yet?
	if (!interaction) {
		return (
			<button className="btn btn-accent" onClick={handleAdd}>
				Add media to current collection
			</button>
		);
	}

	// find your “None” record from the fetched evaluations
	const noneEval = evaluations.find(ev => ev.name === "None");

	return (
		<div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
			{/* Evaluation dropdown */}
			<div className="flex flex-col md:flex-row items-center gap-4">
				<label className="label font-bold">Score:</label>
				<select
					className="select select-bordered"
					value={interaction.evaluation.evaluationId}
					onChange={e => handleUpdateEvaluation(e.target.value)}>
					{noneEval && (
						<option key={noneEval.evaluationId} value={noneEval.evaluationId}>
							None
						</option>
					)}
					{numericOptions.map(([score, label]) => {
						// find the real record with this name
						const ev = evaluations.find(ev => ev.name === score);
						if (!ev) return null;
						return (
							<option key={ev.evaluationId} value={ev.evaluationId}>
								({score}) {label}
							</option>
						);
					})}
				</select>
			</div>

			{/* Content Status dropdown */}
			<div className="flex flex-col md:flex-row items-center gap-4">
				<label className="label font-bold">Status:</label>
				<select
					className="select select-bordered"
					value={interaction.contentStatus.contentStatusId}
					onChange={e => handleUpdateContentStatus(e.target.value)}>
					{statuses.map(st => (
						<option key={st.contentStatusId} value={st.contentStatusId}>
							{st.name}
						</option>
					))}
				</select>
			</div>

			{/* Remove button */}
			<button className="btn btn-error" onClick={handleRemove}>
				Remove media from current collection
			</button>
		</div>
	);
}

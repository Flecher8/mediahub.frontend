"use client";
import MediaGrid from "@/components/mediaGrid";
import { RecommendationService } from "@/services/recommendationService";
// import { testMedia } from "@/services/test/testMedia";
import { MediaContent } from "@/types/mediaContent";
import { useEffect, useState } from "react";

import { AuthStore } from "@/services/auth/auth";
import { SelectedCollectionService } from "@/services/storages/selectedCollectionService";
const MEDIA_TYPES = ["Film", "Serial", "Game", "Anime", "Manga"];

export default function LibraryPage() {
	const [mediaList, setMediaList] = useState<MediaContent[]>([]);
	const [error, setError] = useState<string | null>(null);

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	const currentCollection = SelectedCollectionService.get();

	useEffect(() => {
		RecommendationService.getRecommendations(currentCollection !== null ? currentCollection.id : null)
			.then(setMediaList)
			.catch(e => setError(e.message));
	}, [currentCollection]);

	// Toggle a type filter on/off
	const toggleType = (type: string) => {
		setSelectedTypes(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]));
	};

	// Combine search + type filters
	const filteredMediaList = mediaList
		.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
		.filter(m => selectedTypes.length === 0 || selectedTypes.includes(m.mediaContentType.name));

	return (
		<div className="p-4 container">
			{/* Large screen layout: 2 columns (empty cell + search bar in row 1, filters and grid in row 2) */}
			<div className="hidden lg:grid grid-cols-[1fr_5fr] gap-4">
				{/* Row 1, Column 1: Empty cell with fixed height */}
				<div className="h-10"></div>

				{/* Row 1, Column 2: Search Bar with fixed height */}
				<div className="container h-10">
					<input
						type="text"
						placeholder="Search media..."
						className="input input-bordered input-accent w-full h-full"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Row 2, Column 1: Filters Panel */}
				<div>
					<div className="card bg-base-100 shadow-xl p-4 space-y-2">
						<h2 className="text-xl font-bold mb-2">Filter by Type</h2>
						{MEDIA_TYPES.map(type => (
							<div className="form-control" key={type}>
								<label className="label cursor-pointer flex justify-between">
									<span className="label-text">{type}</span>
									<input
										type="checkbox"
										className="checkbox"
										checked={selectedTypes.includes(type)}
										onChange={() => toggleType(type)}
									/>
								</label>
							</div>
						))}
					</div>
				</div>

				{/* Row 2, Column 2: Media Grid and Pagination */}
				<div className="flex flex-col items-center justify-center w-full">
					<MediaGrid mediaList={filteredMediaList} />
					<div className="flex justify-center mt-4"></div>
				</div>
			</div>

			{/* Small and medium screens layout: 1 column ordering: search bar, filters, media grid & pagination */}
			<div className="grid grid-cols-1 gap-4 lg:hidden">
				{/* Search Bar */}
				<div className="h-10">
					<input
						type="text"
						placeholder="Search media..."
						className="input input-bordered input-accent w-full h-full"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Filter by type */}
				<div>
					<div className="card bg-base-100 shadow-xl p-4 space-y-2">
						<h2 className="text-xl font-bold mb-2">Filter by Type</h2>
						{MEDIA_TYPES.map(type => (
							<div className="form-control" key={type}>
								<label className="label cursor-pointer flex justify-between">
									<span className="label-text">{type}</span>
									<input
										type="checkbox"
										className="checkbox"
										checked={selectedTypes.includes(type)}
										onChange={() => toggleType(type)}
									/>
								</label>
							</div>
						))}
					</div>
				</div>

				{/* Media Grid and Pagination */}
				<div className="flex flex-col items-center justify-center w-full">
					<MediaGrid mediaList={filteredMediaList} />
					<div className="flex justify-center mt-4"></div>
				</div>
			</div>
		</div>
	);
}

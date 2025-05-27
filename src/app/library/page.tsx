"use client";
import React, { useEffect, useState, useRef } from "react";
import MediaGrid from "@/components/mediaGrid";
import Pagination from "@/components/pagination";
import { RecommendationService } from "@/services/recommendationService";
import { SearchService } from "@/services/searchService";
import { MediaContent } from "@/types/mediaContent";
import { SelectedCollection, SelectedCollectionService } from "@/services/storages/selectedCollectionService";

const MEDIA_TYPES = ["Film", "Serial", "Game", "Anime", "Manga"];

export default function LibraryPage() {
	const [mediaList, setMediaList] = useState<MediaContent[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// pagination
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// search & filters
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	const [currentCollection, setCurrentCollection] = useState<SelectedCollection | null>(null);

	// debounce timer
	const searchTimeout = useRef<NodeJS.Timeout | null>(null);

	// load selected collection once
	useEffect(() => {
		SelectedCollectionService.get()
			.then(setCurrentCollection)
			.catch(e => setError(e.message));
	}, []);

	// refresh totalPages when collection changes
	useEffect(() => {
		RecommendationService.getTotalPages(currentCollection?.id ?? null)
			.then(setTotalPages)
			.catch(e => setError(e.message));
		setPage(1);
	}, [currentCollection]);

	// Main loader: search only at >=3 chars; empty → recs; 1–2 chars → do nothing
	useEffect(() => {
		setIsLoading(true);
		const term = searchTerm.trim();

		// 1–2 chars: cancel timer, stop loading, keep current list
		if (term.length > 0 && term.length < 3) {
			if (searchTimeout.current) clearTimeout(searchTimeout.current);
			setIsLoading(false);
			return;
		}

		// >=3 chars: debounce + search
		if (term.length >= 3) {
			if (searchTimeout.current) clearTimeout(searchTimeout.current);
			searchTimeout.current = setTimeout(() => {
				SearchService.searchMedia(term)
					.then(setMediaList)
					.catch(e => setError(e.message))
					.finally(() => setIsLoading(false));
			}, 2000);
			return;
		}

		// exactly empty: paginated recs
		if (searchTimeout.current) clearTimeout(searchTimeout.current);
		RecommendationService.getRecommendations(currentCollection?.id ?? null, page)
			.then(setMediaList)
			.catch(e => setError(e.message))
			.finally(() => setIsLoading(false));

		return () => {
			if (searchTimeout.current) clearTimeout(searchTimeout.current);
		};
	}, [searchTerm, currentCollection, page]);

	const toggleType = (type: string) =>
		setSelectedTypes(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]));

	const filtered = mediaList.filter(m =>
		selectedTypes.length === 0 ? true : selectedTypes.includes(m.mediaContentType.name)
	);

	if (error) return <div className="p-4 text-red-500">Error loading library: {error}</div>;

	return (
		<div className="p-4 container">
			{/* desktop */}
			<div className="hidden lg:grid grid-cols-[1fr_5fr] gap-4">
				<div className="h-10" />
				<div className="h-10">
					<input
						type="text"
						placeholder="Search media…"
						className="input input-bordered input-accent w-full h-full"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<aside>
					<div className="card bg-base-100 shadow-xl p-4 space-y-2">
						<h2 className="text-xl font-bold">Filter by Type</h2>
						{MEDIA_TYPES.map(t => (
							<div className="form-control" key={t}>
								<label className="label cursor-pointer flex justify-between">
									<span className="label-text">{t}</span>
									<input
										type="checkbox"
										className="checkbox"
										checked={selectedTypes.includes(t)}
										onChange={() => toggleType(t)}
									/>
								</label>
							</div>
						))}
					</div>
				</aside>
				<section className="flex flex-col items-center w-full">
					{isLoading ? (
						<span className="loading loading-spinner text-accent" />
					) : filtered.length > 0 ? (
						<>
							<MediaGrid mediaList={filtered} />
							{searchTerm.trim() === "" && (
								<div className="mt-6">
									<Pagination current={page} total={totalPages} onChange={p => setPage(p)} />
								</div>
							)}
						</>
					) : (
						<div className="py-8 text-center text-gray-500">No media found.</div>
					)}
				</section>
			</div>

			{/* mobile/tablet */}
			<div className="grid lg:hidden gap-4">
				<div className="h-10">
					<input
						type="text"
						placeholder="Search media…"
						className="input input-bordered input-accent w-full h-full"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div>
					<div className="card bg-base-100 shadow-xl p-4 space-y-2">
						<h2 className="text-xl font-bold">Filter by Type</h2>
						{MEDIA_TYPES.map(t => (
							<div className="form-control" key={t}>
								<label className="label cursor-pointer flex justify-between">
									<span className="label-text">{t}</span>
									<input
										type="checkbox"
										className="checkbox"
										checked={selectedTypes.includes(t)}
										onChange={() => toggleType(t)}
									/>
								</label>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col items-center w-full">
					{isLoading ? (
						<span className="loading loading-spinner text-accent" />
					) : filtered.length > 0 ? (
						<>
							<MediaGrid mediaList={filtered} />
							{searchTerm.trim() === "" && (
								<div className="mt-6">
									<Pagination current={page} total={totalPages} onChange={p => setPage(p)} />
								</div>
							)}
						</>
					) : (
						<div className="py-8 text-center text-gray-500">No media found.</div>
					)}
				</div>
			</div>
		</div>
	);
}

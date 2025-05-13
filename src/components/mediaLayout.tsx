"use client";
import React from "react";
import UserInteraction from "@/components/userInteraction";
import { MediaContent } from "@/types/mediaContent";
import { authStorage } from "@/services/auth/auth";

interface MediaLayoutProps {
	mediaContent: MediaContent;
	children: React.ReactNode; // For type-specific details
}

export default function MediaLayout({ mediaContent, children }: MediaLayoutProps) {
	return (
		<div className="container mx-auto p-4">
			{/* Responsive grid: on small screens, stack; on md+ use two columns */}
			<div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
				{/* Left column: Main Image */}
				<div className="min-h-[400px]">
					<img
						src={mediaContent.mainPictureLink}
						alt={mediaContent.title}
						className="object-cover w-full h-full rounded"
					/>
				</div>

				{/* Right column: Media info */}
				<div className="min-h-[400px] flex flex-col justify-between">
					<div className="space-y-3">
						<div className="flex justify-between items-center mb-2 border-b-2 border-accent pb-2">
							<h1 className="text-4xl font-bold truncate">{mediaContent.title}</h1>
							<span className="text-xl">{mediaContent.mediaContentType.name}</span>
						</div>
						<div className="flex flex-col lg:flex-row lg:items-center gap-4 space-x-15">
							<div className="w-25">
								<p className="text-2xl">Rating: {mediaContent.rating}</p>
							</div>

							{/* User interaction: score select + add to collection button */}
							{authStorage.isAuthorized() ? <UserInteraction mediaContent={mediaContent} /> : ""}
						</div>
						<p>Release Date: {mediaContent.releaseDate.toDateString()}</p>
						<div className="">
							Genres:{" "}
							{mediaContent.genres.map(g => (
								<span key={g.genreId} className="badge badge-accent mr-2">
									{g.name}
								</span>
							))}
						</div>
						{/* Type-specific details */}
						<div className="">{children}</div>
					</div>
				</div>

				{/* Bottom row: Description (spanning both columns on md+) */}
				<div className="col-span-1 md:col-span-2 mt-4">
					<h2 className="text-2xl font-bold">Description</h2>
					<p className="mt-2">{mediaContent.description}</p>
				</div>
			</div>
		</div>
	);
}

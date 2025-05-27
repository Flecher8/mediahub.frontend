"use client";
import React from "react";

interface PaginationProps {
	current: number;
	total: number;
	onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: PaginationProps) {
	if (total <= 1) return null;

	return (
		<div className="join">
			{/* Previous */}
			<button className="join-item btn" disabled={current === 1} onClick={() => onChange(current - 1)}>
				«
			</button>

			{/* Current page */}
			<button className="join-item btn btn-active" disabled>
				{current} / {total}
			</button>

			{/* Next */}
			<button className="join-item btn" disabled={current === total} onClick={() => onChange(current + 1)}>
				»
			</button>
		</div>
	);
}

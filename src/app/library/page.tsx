"use client";
import MediaGrid from "@/components/mediaGrid";
import { testMedia } from "@/services/test/testMedia";

export default function LibraryPage() {
  return (
    <div className="p-4">
      {/* Large screen layout: 2 columns (empty cell + search bar in row 1, filters and grid in row 2) */}
      <div className="hidden lg:grid grid-cols-[1fr_5fr] gap-4">
        {/* Row 1, Column 1: Empty cell with fixed height */}
        <div className="h-12"></div>

        {/* Row 1, Column 2: Search Bar with fixed height */}
        <div className="h-12">
          <input
            type="text"
            placeholder="Search media..."
            className="input input-bordered w-full h-full"
          />
        </div>

        {/* Row 2, Column 1: Filters Panel */}
        <div>
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            {/* Example filter options */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Option 1</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Option 2</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            {/* More filters can be added here */}
          </div>
        </div>

        {/* Row 2, Column 2: Media Grid and Pagination */}
        <div>
          <MediaGrid mediaList={testMedia} />
          <div className="flex justify-center mt-4">
            <div className="btn-group">
              <button className="btn">«</button>
              <button className="btn">1</button>
              <button className="btn">2</button>
              <button className="btn">3</button>
              <button className="btn">»</button>
            </div>
          </div>
        </div>
      </div>

      {/* Small and medium screens layout: 1 column ordering: search bar, filters, media grid & pagination */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {/* Search Bar */}
        <div className="h-12">
          <input
            type="text"
            placeholder="Search media..."
            className="input input-bordered w-full h-full"
          />
        </div>

        {/* Filters Panel */}
        <div>
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            {/* Example filter options */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Option 1</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Option 2</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            {/* More filters can be added here */}
          </div>
        </div>

        {/* Media Grid and Pagination */}
        <div>
          <MediaGrid mediaList={testMedia} />
          <div className="flex justify-center mt-4">
            <div className="btn-group">
              <button className="btn">«</button>
              <button className="btn">1</button>
              <button className="btn">2</button>
              <button className="btn">3</button>
              <button className="btn">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

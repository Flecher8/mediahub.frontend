import { RecommendationCollection } from "@/types/recommendationCollection";
import CollectionCard from "./collectionCard";

interface CollectionGridProps {
  collectionList: RecommendationCollection[];
}

export default function CollectionsGrid({ collectionList }: CollectionGridProps) {
  return (
    // <div className="flex flex-wrap items-center justify-center gap-3">
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(275px,_1fr))] gap-12">
      {collectionList.map((collection) => (
        <div key={collection.collectionId}>
          <CollectionCard collection={collection} />
        </div>
      ))}
    </div>
  );
}

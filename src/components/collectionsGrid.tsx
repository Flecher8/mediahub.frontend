import { CollectionItem } from "@/types/collectionItem";
import CollectionCard from "./collectionCard";

interface CollectionGridProps {
  collectionList: CollectionItem[];
}

export default function CollectionsGrid({ collectionList }: CollectionGridProps) {
  return (
    <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3">
      {collectionList.map((collection) => (
        <div key={collection.id}>
          <CollectionCard collection={collection} />
        </div>
      ))}
    </div>
  );
}

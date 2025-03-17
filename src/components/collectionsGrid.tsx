import CollectionCard, { CollectionItem } from "./collectionCard";

interface CollectionGridProps {
  collectionList: CollectionItem[];
}

export default function CollectionsGrid({ collectionList }: CollectionGridProps) {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
      {collectionList.map((collection) => (
        <div key={collection.id}>
          <CollectionCard collection={collection} />
        </div>
      ))}
    </div>
  );
}

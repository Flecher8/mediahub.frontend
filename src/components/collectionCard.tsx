import { CollectionItem } from "@/types/collectionItem";
import Link from "next/link";

interface CollectionCardProps {
  collection: CollectionItem;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.id}`} className="flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer max-w-[300px] max-h-[500px]">
        <figure>
          <img
            src={collection.image}
            alt={collection.name}
            className="object-cover w-full h-82"
          />
        </figure>
        <div className="card-body m-1">
          <h2 className="card-title text-lg truncate">{collection.name}</h2>
        </div>
      </div>
    </Link>
  );
}

import { RecommendationCollection } from "@/types/recommendationCollection";
import Link from "next/link";

interface CollectionCardProps {
  collection: RecommendationCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.collectionId}`} className="flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer max-w-[300px] max-h-[500px]">
        <figure>
          <img
            src={"https://as1.ftcdn.net/v2/jpg/00/95/33/18/1000_F_95331883_vDtEwXTSqXWdhHn7iSvnICpHHIF5ihtU.jpg"}
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

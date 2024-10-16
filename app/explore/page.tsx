import { getBuyNowIds, getPublications } from "@/lib/publicationUtils";
import ExploreClient from "./explore";

export default async function ExplorePage() {

  let publicationIds = await getBuyNowIds();
  
  publicationIds = [...new Set(publicationIds)];

  const { publications: initialPublications } = await getPublications(publicationIds, true); 

  return (
    <div>
      <ExploreClient
        initialPublications={initialPublications}
        allPublicationIds={publicationIds}  
      />
    </div>
  );
}

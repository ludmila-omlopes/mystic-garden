import { getProfileId } from "@/lib/profileUtils";
import ProfilePageClient from "./profilePageClient";
import {
  getAllCreatedPublicationsByCreator,
  getPublications,
  getTotalNumberAndAmountCollectedByProfile,
  getCollectedPublicationsByProfile,
} from "@/lib/publicationUtils";

export default async function ProfilePage({ params }) {
  // Fetch profile-related data
  const profileHandle = params.id;
  const profileId = await getProfileId(profileHandle);

  const totalCollectedInfo = await getTotalNumberAndAmountCollectedByProfile(profileId);

  // Get all created publication IDs for the profile
  const createdPublicationsIds = await getAllCreatedPublicationsByCreator(profileId);

  // Fetch the first batch of created publications
  const { publications: createdPublications, nextCursor: createdCursorNext } = await getPublications(createdPublicationsIds, false); // `false` if you don’t want to filter by verified artists

  // Fetch collected publications
  const {
    publications: collectedPublications,
    cursorNext: collectedCursorNext,
  } = await getCollectedPublicationsByProfile(profileId);

  const totalCreated = createdPublicationsIds.length;
  const totalCollected = totalCollectedInfo[0];

  return (
    <div>
      <ProfilePageClient
        profileId={profileId}
        allCreatedPublicationIds={createdPublicationsIds}
        createdPublications={createdPublications}
        totalCreated={totalCreated}
        totalCollected={totalCollected}
        collectedPublications={collectedPublications}
        collectedCursorNext={collectedCursorNext}
        createdCursorNext={createdCursorNext} // Pass the cursor for created publications
      />
    </div>
  );
}

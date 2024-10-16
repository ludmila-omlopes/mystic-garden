import { getProfileIdByHandle } from "@/app/api/lensGraphql";

export async function getProfileId(handle: string) {
    try {
        const data = await getProfileIdByHandle(handle);
        return data.profile.id;
    } catch (error) {
        console.error("Error fetching profile ID:", handle, JSON.stringify(error, null, 2));
        throw error;
    }
}
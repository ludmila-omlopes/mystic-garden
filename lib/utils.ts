import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  image,
  video,
  audio,
  article,
  MediaImageMimeType,
  MediaAudioMimeType,
  MediaVideoMimeType,
} from '@lens-protocol/metadata';
import { Post } from '@lens-protocol/react-web';

const AUCTION_OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MAX_TITLE_LENGTH = 50; // Set a maximum title length

export const getTitle = (publication) => {
  if (!publication || !publication.metadata) {
    return 'Untitled';
  }

  const title = publication.metadata.marketplace?.name;
  const description = publication.metadata.content;

  if (title && !title.toLowerCase().startsWith("image by") && !title.toLowerCase().startsWith("video by") && !title.toLowerCase().startsWith("post by") && !title.toLowerCase().startsWith("text by") && !title.toLowerCase().startsWith("audio by")) {
    return truncateText(title, MAX_TITLE_LENGTH);
  }

  if (description) {
    const firstLine = description.split('\n')[0];
    return truncateText(firstLine, MAX_TITLE_LENGTH);
  }

  return 'Untitled';
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/uploadFile', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return data.ipfsUri;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    return '';
  }
};

export const uploadData = async (metadata: any): Promise<string> => {
  //todo: substituir log de erro por toast de erro com interrupção
  try {
    const response = await fetch('/api/uploadMetadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metadata }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.receiptId;
  } catch (error) {
    console.error('Error uploading data:', error);
  }

  return '';
};

export const createMetadata = (fileUrl: string, title: string, description: string, file?: File) => {
  const commonMetadata = {
    title: title,
    content: description,
    appId: 'mysticgarden',
    marketplace: {
      name: title,
      description: description,
      external_url: "https://mysticgarden.xyz", //todo: colocar a página do artista
      image: file ? fileUrl : '',
    },
  };

  if (!file) {
    return article({
      ...commonMetadata,
      content: description,
    });
  }

  const extension = file?.name?.split('.')?.pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return image({
        ...commonMetadata,
        image: {
          item: fileUrl,
          type: file.type as MediaImageMimeType,
        },
      });
    case 'mp4':
    case 'mkv':
    case 'avi':
      return video({
        ...commonMetadata,
        video: {
          item: fileUrl,
          type: file.type as MediaVideoMimeType,
        },
      });
    case 'mp3':
    case 'wav':
    case 'flac':
      return audio({
        ...commonMetadata,
        audio: {
          item: fileUrl,
          type: file.type as MediaAudioMimeType,
        },
      });
    default:
      return article({
        ...commonMetadata,
        content: description,
      });
  }
};

export function getPostSellType(post: Post): 'auction' | 'buy_now' | 'none' {
  if (!post.openActionModules || post.openActionModules.length === 0) {
    return 'none';
  }

  const openActionModule = post.openActionModules[0];

  if (openActionModule.__typename === 'UnknownOpenActionModuleSettings' && openActionModule.contract.address === AUCTION_OPEN_ACTION_MODULE_ADDRESS) {
    return 'auction';
  }

  if (
    openActionModule.__typename === 'SimpleCollectOpenActionSettings' ||
    openActionModule.__typename === 'MultirecipientFeeCollectOpenActionSettings'
  ) {
    return 'buy_now';
  }

  return 'none';
}

/**
 * Converts BigInt profileId and publicationId to hex format string.
 * 
 * @param profileId - The BigInt profileId.
 * @param publicationId - The BigInt publicationId.
 * @returns The concatenated hex format string of profileId and publicationId.
 */
export function formatToLensHex(profileId: bigint, publicationId: bigint): string {
  const profileIdHex = profileId.toString(16);
  const publicationIdHex = publicationId.toString(16);

  return `${profileIdHex}-${publicationIdHex}`;
}

/**
 * Converts a hex format string to BigInt profileId and publicationId.
 * 
 * @param hexString - The hex format string.
 * @returns An object containing the BigInt profileId and publicationId.
 */
export function parseFromLensHex(hexString: string): { profileId: bigint; publicationId: bigint } {
  const [profileIdHex, publicationIdHex] = hexString.split('-');

  const profileId = BigInt(profileIdHex);
  const publicationId = BigInt(publicationIdHex);
  //console.log("converted: " + profileId + " - " + publicationId)

  return { profileId, publicationId };
}
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/utils.ts
const MAX_TITLE_LENGTH = 50; // Set a maximum title length

export const getTitle = (publication) => {
  if (!publication || !publication.metadata) {
    return 'Untitled';
  }

  const title = publication.metadata.marketplace?.name;
  const description = publication.metadata.content;

  if (title && !title.toLowerCase().startsWith("image by") && !title.toLowerCase().startsWith("video by") && !title.toLowerCase().startsWith("post by") && !title.toLowerCase().startsWith("text by")) {
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

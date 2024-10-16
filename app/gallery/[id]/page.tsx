import { Metadata } from 'next';
import GalleryPostDetails from './GalleryPostDetails';
import { FALLBACK_IMAGE_URL } from '../../constants';
import { PublicationId } from '@lens-protocol/metadata';
import { Post } from '@lens-protocol/react-web';
import { getPostMediaSource } from '@/lib/utils';
import { getPublicationsByIds } from "../../api/lensGraphql";

async function fetchPost(id: string): Promise<Post | null> {
  try {
    const { publications: publications, error }  = await getPublicationsByIds([id]);

    return publications[0] as Post;
  } catch (error) {
    console.error('Error fetching publication:', error);
    return null;
  }
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.id);
  if (!post)  {
    return {
      title: 'Mystic Garden | Exclusive art from curated artists.',
      description: 'No description available.',
      openGraph: {
        type: 'website',
        title: 'Mystic Garden | Exclusive art from curated artists.',
        description: 'No description available.',
        images: [
          {
            url: FALLBACK_IMAGE_URL,
          },
        ],
      },
    };
  }

  function truncateDescription(description: string, maxLength: number = 160): string {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  }

  const title = post && post.metadata && "title" in post.metadata ? post.metadata.title : 'Exclusive art from curated artists.';
  const description = (post && post.metadata && "content" in post.metadata) ? truncateDescription(post.metadata.content) : 'No description available.';

  const mediaSource = getPostMediaSource(post);

  const metadata: Metadata = {
    title: title,
    description: description,
    twitter: {
      card: 'summary_large_image',
      site: '@mysticgardenxyz',
      creator: '@definnthefarmer',
    },
    openGraph: {
      type: 'article',
      title: title,
      description: description,
      images: [
        {
          url: mediaSource.cover,
          alt: title,
        },
      ],
    },
  };

  if (mediaSource.type === 'video' && metadata.openGraph) {
    metadata.openGraph.videos = [
      {
        url: mediaSource.src,
      },
    ];
  }

  return metadata;
}

export default async function GalleryPage({ params }) {
  const post = await fetchPost(params.id);

  if (!post) {
    return <div>Post not found!</div>;
  }

  return <GalleryPostDetails id={params.id} />;
}

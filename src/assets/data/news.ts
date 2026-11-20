import newsJson from "./news.json";

// One post as it is written in news.json
export interface RawNewsPost {
    title: string;
    href: string;
    publishedDate: string; // "YYYY-MM-DD"
    createdAt: string; // "YYYY-MM-DD"
    categories: string[];
    excerpt: string;
    description: string;
    images: string; // folder name inside public/news/images/
    thumbnail: string; // file name inside that folder
}

// One post as the pages use it
export interface NewsPost extends RawNewsPost {
    thumbnailUrl: string; // full URL for <img src>, "" when there's no thumbnail
}

// All posts, newest first, so the order in news.json doesn't matter
export const newsPosts: NewsPost[] = [...(newsJson as RawNewsPost[])]
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .map((post) => ({
        ...post,
        thumbnailUrl: post.thumbnail
            ? `${import.meta.env.BASE_URL}news/images/${post.images}/${post.thumbnail}`
            : "",
    }));

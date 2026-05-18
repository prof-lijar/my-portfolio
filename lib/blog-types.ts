export type BlogPostStatus = "draft" | "published";

export type BlogBlockType =
  | "paragraph"
  | "heading"
  | "subheading"
  | "quote"
  | "list"
  | "code"
  | "image";

export type BlogBlock = {
  id: string;
  type: BlogBlockType;
  content?: string;
  url?: string;
  alt?: string;
};

export type BlogContent = {
  blocks: BlogBlock[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  content_json: BlogContent;
  status: BlogPostStatus;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
};

export type BlogPostInput = {
  id?: string;
  slug?: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string;
  contentJson: BlogContent;
  contentText: string;
  status: BlogPostStatus;
  tags: string[];
};


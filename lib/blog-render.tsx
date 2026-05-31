import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, BlogContent } from "@/lib/blog-types";

export const emptyBlogContent: BlogContent = {
  blocks: [
    {
      id: "intro",
      type: "paragraph",
      content: "",
    },
  ],
};

export function normalizeBlogContent(value: unknown): BlogContent {
  if (
    value &&
    typeof value === "object" &&
    Array.isArray((value as BlogContent).blocks)
  ) {
    return {
      blocks: (value as BlogContent).blocks.filter(
        (block) => block && typeof block.id === "string"
      ),
    };
  }

  return emptyBlogContent;
}

export function getBlogText(content: BlogContent) {
  return content.blocks
    .map((block) => {
      if (block.type === "image") return block.alt || "";
      return block.content || "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTime(content: BlogContent) {
  const words = getBlogText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getExcerpt(content: BlogContent, fallback = "") {
  const text = fallback || getBlogText(content);
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trim()}...`;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

function renderBlock(block: BlogBlock) {
  const content = block.content || "";

  switch (block.type) {
    case "heading":
      return <h2 key={block.id}>{renderInline(content)}</h2>;
    case "subheading":
      return <h3 key={block.id}>{renderInline(content)}</h3>;
    case "quote":
      return <blockquote key={block.id}>{renderInline(content)}</blockquote>;
    case "list": {
      const items = content
        .split("\n")
        .map((item) => item.replace(/^[-*]\s+/, "").trim())
        .filter(Boolean);

      return (
        <ul key={block.id}>
          {items.map((item, index) => (
            <li key={`${block.id}-${index}`}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    case "code":
      return (
        <pre key={block.id}>
          <code>{content}</code>
        </pre>
      );
    case "image":
      if (!block.url) return null;

      return (
        <figure key={block.id}>
          <Image
            src={block.url}
            alt={block.alt || ""}
            width={1200}
            height={720}
            className="h-auto w-full rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 860px"
          />
          {block.alt ? <figcaption>{block.alt}</figcaption> : null}
        </figure>
      );
    case "paragraph":
    default:
      return <p key={block.id}>{renderInline(content)}</p>;
  }
}

export function BlogContentView({ content }: { content: BlogContent }) {
  return (
    <div className="blog-content prose prose-invert max-w-none">
      {content.blocks.map(renderBlock)}
    </div>
  );
}

export function BlogTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-cyan-400/30 px-2.5 py-1 text-xs text-cyan-100"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function BackToBlogLink() {
  return (
    <Link className="text-sm text-cyan-300 hover:text-cyan-100" href="/blog">
      Back to blog
    </Link>
  );
}


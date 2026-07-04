"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useRef, useState, useTransition } from "react";
import {
  Bold,
  Code2,
  Heading2,
  Heading3,
  ImageIcon,
  Link2,
  List,
  Loader2,
  MessageSquareQuote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { emptyBlogContent, getBlogText, normalizeBlogContent } from "@/lib/blog-render";
import type { BlogBlock, BlogContent } from "@/lib/blog-types";

type BlogEditorProps = {
  name?: string;
  initialContent?: BlogContent;
};

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

function renderPreviewBlock(block: BlogBlock): ReactNode {
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

function blocksToMarkdown(content: BlogContent) {
  return content.blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `## ${block.content || ""}`;
        case "subheading":
          return `### ${block.content || ""}`;
        case "quote":
          return (block.content || "")
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n");
        case "list":
          return (block.content || "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => (line.startsWith("- ") || line.startsWith("* ") ? line : `- ${line}`))
            .join("\n");
        case "code":
          return `\`\`\`\n${block.content || ""}\n\`\`\``;
        case "image":
          return block.url ? `![${block.alt || ""}](${block.url})` : "";
        case "paragraph":
        default:
          return block.content || "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function markdownToBlocks(markdown: string): BlogContent {
  const lines = markdown.split("\n");
  const blocks: BlogBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push({
        id: crypto.randomUUID(),
        type: "code",
        content: codeLines.join("\n"),
      });
      continue;
    }

    const imageMatch = trimmed.match(/^!\[(.*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      blocks.push({
        id: crypto.randomUUID(),
        type: "image",
        alt: imageMatch[1] || "",
        url: imageMatch[2] || "",
      });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({
        id: crypto.randomUUID(),
        type: "subheading",
        content: trimmed.slice(4).trim(),
      });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        id: crypto.randomUUID(),
        type: "heading",
        content: trimmed.slice(3).trim(),
      });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push({
        id: crypto.randomUUID(),
        type: "quote",
        content: quoteLines.join("\n"),
      });
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listLines: string[] = [];
      while (i < lines.length) {
        const listLine = lines[i].trim();
        if (!listLine.startsWith("- ") && !listLine.startsWith("* ")) break;
        listLines.push(listLine);
        i += 1;
      }
      blocks.push({
        id: crypto.randomUUID(),
        type: "list",
        content: listLines.join("\n"),
      });
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const textLine = lines[i].trimEnd();
      const textTrim = textLine.trim();
      if (
        !textTrim ||
        textTrim.startsWith("```") ||
        textTrim.startsWith("## ") ||
        textTrim.startsWith("### ") ||
        textTrim.startsWith("> ") ||
        textTrim.startsWith("- ") ||
        textTrim.startsWith("* ") ||
        /^!\[(.*)\]\(([^)]+)\)$/.test(textTrim)
      ) {
        break;
      }
      paragraphLines.push(textLine);
      i += 1;
    }

    blocks.push({
      id: crypto.randomUUID(),
      type: "paragraph",
      content: paragraphLines.join("\n").trim(),
    });
  }

  return {
    blocks: blocks.length ? blocks : emptyBlogContent.blocks,
  };
}

export function BlogEditor({
  name = "contentJson",
  initialContent = emptyBlogContent,
}: BlogEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [markdown, setMarkdown] = useState(() =>
    blocksToMarkdown(normalizeBlogContent(initialContent))
  );

  const content = useMemo(() => markdownToBlocks(markdown), [markdown]);
  const contentText = useMemo(() => getBlogText(content), [content]);

  function insertSnippet(snippet: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const next = value.slice(0, start) + snippet + value.slice(end);
    setMarkdown(next);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + snippet.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  async function uploadImage(file: File) {
    setUploadError("");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/blog/images", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Image upload failed");
    }

    return data.url as string;
  }

  function onImageSelected(file?: File) {
    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadImage(file);
        const alt = file.name.replace(/\.[^.]+$/, "");
        const prefix = markdown.trim().length ? "\n\n" : "";
        insertSnippet(`${prefix}![${alt}](${url})\n`);
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : "Image upload failed");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    });
  }

  return (
    <div className="space-y-4">
      <input name={name} type="hidden" value={JSON.stringify(content)} />
      <input name="contentText" type="hidden" value={contentText} />

      <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-800 bg-gray-950/70 p-2">
        <Button
          type="button"
          variant={mode === "write" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMode("write")}
        >
          Write
        </Button>
        <Button
          type="button"
          variant={mode === "preview" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMode("preview")}
        >
          Preview
        </Button>
        <span className="mx-1 h-6 w-px bg-gray-800" />
        <Button type="button" variant="ghost" size="sm" onClick={() => insertSnippet("## ")}>
          <Heading2 className="mr-1 h-3.5 w-3.5" />
          H2
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertSnippet("### ")}>
          <Heading3 className="mr-1 h-3.5 w-3.5" />
          H3
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertSnippet("**bold**")}>
          <Bold className="mr-1 h-3.5 w-3.5" />
          Bold
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertSnippet("> ")}>
          <MessageSquareQuote className="mr-1 h-3.5 w-3.5" />
          Quote
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertSnippet("- ")}>
          <List className="mr-1 h-3.5 w-3.5" />
          List
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertSnippet("```\ncode\n```")}
        >
          <Code2 className="mr-1 h-3.5 w-3.5" />
          Code
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertSnippet("[link text](https://example.com)")}
        >
          <Link2 className="mr-1 h-3.5 w-3.5" />
          Link
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          {isPending ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
          ) : (
            <ImageIcon className="mr-1 h-3.5 w-3.5" />
          )}
          Image
        </Button>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => onImageSelected(event.target.files?.[0])}
        />
      </div>

      {uploadError ? (
        <p className="rounded-md border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {uploadError}
        </p>
      ) : null}

      {mode === "write" ? (
        <Textarea
          ref={textareaRef}
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          placeholder="Start writing your story..."
          className="min-h-[460px] resize-y border-gray-800 bg-gray-950/60 text-base leading-7"
        />
      ) : (
        <div className="min-h-[460px] rounded-md border border-gray-800 bg-gray-950/60 p-6">
          <div className="blog-content prose prose-invert max-w-none">
            {content.blocks.map(renderPreviewBlock)}
          </div>
        </div>
      )}
    </div>
  );
}

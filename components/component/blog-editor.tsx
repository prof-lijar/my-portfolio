"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  emptyBlogContent,
  getBlogText,
  normalizeBlogContent,
} from "@/lib/blog-render";
import type { BlogBlock, BlogBlockType, BlogContent } from "@/lib/blog-types";

type BlogEditorProps = {
  name?: string;
  initialContent?: BlogContent;
};

const blockTypes: Array<{ type: BlogBlockType; label: string }> = [
  { type: "paragraph", label: "Text" },
  { type: "heading", label: "H2" },
  { type: "subheading", label: "H3" },
  { type: "quote", label: "Quote" },
  { type: "list", label: "List" },
  { type: "code", label: "Code" },
];

function createBlock(type: BlogBlockType): BlogBlock {
  return {
    id: crypto.randomUUID(),
    type,
    content: type === "list" ? "- " : "",
  };
}

export function BlogEditor({
  name = "contentJson",
  initialContent = emptyBlogContent,
}: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blocks, setBlocks] = useState(
    normalizeBlogContent(initialContent).blocks.length
      ? normalizeBlogContent(initialContent).blocks
      : emptyBlogContent.blocks
  );
  const [activeBlockId, setActiveBlockId] = useState(blocks[0]?.id || "");
  const [uploadError, setUploadError] = useState("");
  const [isPending, startTransition] = useTransition();

  const content = useMemo<BlogContent>(() => ({ blocks }), [blocks]);
  const contentText = useMemo(() => getBlogText(content), [content]);

  function updateBlock(id: string, patch: Partial<BlogBlock>) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, ...patch } : block))
    );
  }

  function addBlock(type: BlogBlockType) {
    const block = createBlock(type);
    setBlocks((current) => [...current, block]);
    setActiveBlockId(block.id);
  }

  function removeBlock(id: string) {
    setBlocks((current) => {
      if (current.length === 1) return current;
      const next = current.filter((block) => block.id !== id);
      if (activeBlockId === id) {
        setActiveBlockId(next[0]?.id || "");
      }
      return next;
    });
  }

  function insertMarker(marker: "**" | "`") {
    setBlocks((current) =>
      current.map((block) => {
        if (block.id !== activeBlockId || block.type === "image") return block;
        return {
          ...block,
          content: `${block.content || ""}${marker}text${marker}`,
        };
      })
    );
  }

  function insertLink() {
    setBlocks((current) =>
      current.map((block) => {
        if (block.id !== activeBlockId || block.type === "image") return block;
        return {
          ...block,
          content: `${block.content || ""}[link text](https://example.com)`,
        };
      })
    );
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
        const block: BlogBlock = {
          id: crypto.randomUUID(),
          type: "image",
          url,
          alt: file.name.replace(/\.[^.]+$/, ""),
        };
        setBlocks((current) => [...current, block]);
        setActiveBlockId(block.id);
      } catch (error) {
        setUploadError(
          error instanceof Error ? error.message : "Image upload failed"
        );
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
        {blockTypes.map((item) => (
          <Button
            key={item.type}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addBlock(item.type)}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            {item.label}
          </Button>
        ))}
        <span className="mx-1 h-6 w-px bg-gray-800" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarker("**")}
        >
          B
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarker("`")}
        >
          Code
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertLink}>
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

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={cn(
              "rounded-md border bg-gray-950/60 p-3",
              activeBlockId === block.id
                ? "border-cyan-400/60"
                : "border-gray-800"
            )}
            onFocus={() => setActiveBlockId(block.id)}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label className="text-xs uppercase tracking-wide text-gray-400">
                {index + 1}. {block.type}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={blocks.length === 1}
                onClick={() => removeBlock(block.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove block</span>
              </Button>
            </div>

            {block.type === "image" ? (
              <div className="space-y-3">
                {block.url ? (
                  <Image
                    src={block.url}
                    alt={block.alt || ""}
                    width={1000}
                    height={560}
                    className="h-auto max-h-[360px] w-full rounded-md object-cover"
                  />
                ) : null}
                <Input
                  placeholder="Image alt text"
                  value={block.alt || ""}
                  onChange={(event) =>
                    updateBlock(block.id, { alt: event.target.value })
                  }
                />
              </div>
            ) : block.type === "code" ? (
              <Textarea
                className="min-h-[160px] font-mono"
                placeholder="Paste or write code..."
                value={block.content || ""}
                onChange={(event) =>
                  updateBlock(block.id, { content: event.target.value })
                }
              />
            ) : (
              <Textarea
                className={cn(
                  block.type === "heading" && "min-h-[72px] text-xl font-bold",
                  block.type === "subheading" &&
                    "min-h-[64px] text-lg font-semibold",
                  block.type === "quote" && "min-h-[96px] italic"
                )}
                placeholder={
                  block.type === "list"
                    ? "- First item\n- Second item"
                    : "Write here..."
                }
                value={block.content || ""}
                onChange={(event) =>
                  updateBlock(block.id, { content: event.target.value })
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


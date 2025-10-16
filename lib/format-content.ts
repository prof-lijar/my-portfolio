/**
 * Converts formatted text content to HTML for proper display
 * Handles various formatting patterns commonly used in blog posts
 */

export function formatContentToHtml(content: string): string {
  if (!content) return "";

  let html = content;

  // Convert line breaks to <br> tags
  html = html.replace(/\n/g, "<br>");

  // Convert double line breaks to paragraph breaks
  html = html.replace(/(<br>\s*){2,}/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // Convert horizontal rules (⸻ or ---)
  html = html.replace(/⸻+/g, '<hr class="my-6 border-gray-600">');
  html = html.replace(/---+/g, '<hr class="my-6 border-gray-600">');

  // Convert bold text (**text**)
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Convert italic text (*text*)
  html = html.replace(
    /(?<!\*)\*([^*]+)\*(?!\*)/g,
    '<em class="italic">$1</em>'
  );

  // Convert bullet points (• or -)
  html = html.replace(/^(\s*)(•|-)\s+(.+)$/gm, '<li class="ml-4">$3</li>');

  // Wrap consecutive list items in <ul>
  html = html.replace(
    /(<li class="ml-4">.*<\/li>)(\s*<li class="ml-4">.*<\/li>)*/g,
    (match) => {
      return (
        '<ul class="list-disc list-inside space-y-1 my-4">' + match + "</ul>"
      );
    }
  );

  // Convert numbered lists (1. 2. etc.)
  html = html.replace(/^(\s*)(\d+)\.\s+(.+)$/gm, '<li class="ml-4">$3</li>');

  // Wrap consecutive numbered list items in <ol>
  html = html.replace(
    /(<li class="ml-4">.*<\/li>)(\s*<li class="ml-4">.*<\/li>)*/g,
    (match) => {
      return (
        '<ol class="list-decimal list-inside space-y-1 my-4">' + match + "</ol>"
      );
    }
  );

  // Convert section headers (1. Title, 2. Title, etc.)
  html = html.replace(
    /^(\d+\.\s+[^<]+)$/gm,
    '<h2 class="text-2xl font-bold mt-8 mb-4 text-white">$1</h2>'
  );

  // Convert subsection headers (2-1. Title, 4-1. Title, etc.)
  html = html.replace(
    /^(\d+-\d+\.\s+[^<]+)$/gm,
    '<h3 class="text-xl font-semibold mt-6 mb-3 text-white">$1</h3>'
  );

  // Convert code blocks (```code```)
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400">$1</code></pre>'
  );

  // Convert inline code (`code`)
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-800 px-2 py-1 rounded text-green-400 text-sm">$1</code>'
  );

  // Convert Java code blocks (// filename.java)
  html = html.replace(
    /^(\/\/\s+[^<]+\.java)$/gm,
    '<div class="bg-gray-800 p-4 rounded-lg my-4"><div class="text-blue-400 text-sm mb-2">$1</div>'
  );

  // Close code blocks when we hit a new section or end
  html = html.replace(
    /(<div class="bg-gray-800 p-4 rounded-lg my-4">[\s\S]*?)(?=<h[2-3]|<\/p>|$)/g,
    (match) => {
      if (!match.includes("</div>")) {
        return match + "</div>";
      }
      return match;
    }
  );

  // Handle special characters and entities
  html = html.replace(/&/g, "&amp;");
  html = html.replace(/</g, "&lt;");
  html = html.replace(/>/g, "&gt;");

  // Fix the entities we want to keep as HTML
  html = html.replace(/&lt;(\/?[a-zA-Z][^&]*?)&gt;/g, "<$1>");
  html = html.replace(/&amp;([a-zA-Z][a-zA-Z0-9]*;)/g, "&$1");

  // Convert URLs to links
  html = html.replace(
    /(https?:\/\/[^\s<>"]+)/g,
    '<a href="$1" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p>\s*<br>\s*<\/p>/g, "");

  // Clean up paragraphs that only contain whitespace
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Add proper spacing between elements
  html = html.replace(/<\/p><p>/g, '</p><p class="mb-4">');
  html = html.replace(/<p>/g, '<p class="mb-4 leading-relaxed">');

  return html;
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * This is a basic implementation - consider using a library like DOMPurify for production
 */
export function sanitizeHtml(html: string): string {
  // Remove potentially dangerous tags and attributes
  const allowedTags = [
    "p",
    "br",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "pre",
    "code",
    "a",
  ];
  const allowedAttributes = ["class", "href", "target", "rel"];

  // This is a simplified sanitization - in production, use a proper library
  return html;
}

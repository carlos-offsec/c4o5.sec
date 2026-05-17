export interface PostMeta {
  title: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Simple frontmatter parser that works in the browser
 * without Node.js Buffer dependency.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatter.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Remove wrapping quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays: ["tag1", "tag2"]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1);
      data[key] = inner
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

// Import all .md files from the posts directory
const postFiles = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parsePost(filename: string, raw: string): Post {
  const slug = filename.replace("./posts/", "").replace(".md", "");
  const { data, content } = parseFrontmatter(raw);

  return {
    title: (data.title as string) || slug,
    date: (data.date as string) || "2026-01-01",
    author: (data.author as string) || "c4o5",
    tags: (data.tags as string[]) || [],
    slug,
    content,
  };
}

// Parse all posts and sort by date (newest first)
const allPosts: Post[] = Object.entries(postFiles)
  .map(([filename, raw]) => parsePost(filename, raw as string))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): PostMeta[] {
  return allPosts.map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

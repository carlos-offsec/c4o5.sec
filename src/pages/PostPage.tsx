import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import { getPostBySlug } from "../blog/loader";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <VideoBackground />
        <Navbar />
        <section
          className="min-h-screen flex items-center justify-center px-4"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="terminal-card p-8 text-center max-w-md">
            <p className="neon-text text-lg mb-4">404</p>
            <p style={{ color: "#6e7681" }} className="text-sm mb-4">
              <span style={{ color: "#00ff41" }}>$</span> cat post.md
              <br />
              <span style={{ color: "#ff5f56" }}>
                cat: post.md: Arquivo não encontrado
              </span>
            </p>
            <Link
              to="/blog"
              className="terminal-link text-sm"
            >
              ← Voltar ao blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <VideoBackground />
      <Navbar />
      <section
        className="min-h-screen px-6 sm:px-8 pt-24 pb-16"
        style={{ position: "relative", zIndex: 2 }}
        id="post"
      >
        <motion.div
          className="w-full mx-auto"
          style={{ maxWidth: "48rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Link */}
          <Link
            to="/blog"
            className="terminal-link text-xs mb-6 inline-block"
          >
            ← cd ../blog
          </Link>

          <div className="terminal-card p-6 sm:p-10" style={{ overflowX: "hidden" }}>
            {/* Terminal Bar */}
            <div
              className="flex items-center gap-2 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(0, 255, 65, 0.1)" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
              <span className="ml-3 text-xs" style={{ color: "#6e7681" }}>
                ~/c4o5.sec/blog/{slug}.md
              </span>
            </div>

            {/* Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "#6e7681" }}>
                <span style={{ color: "#00ff41" }}>-rwxr-xr-x</span>
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(0, 255, 65, 0.06)",
                        border: "1px solid rgba(0, 255, 65, 0.15)",
                        color: "#00ff41",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Markdown Content */}
            <article className="prose-terminal" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Bottom Prompt */}
            <div
              className="mt-8 pt-4"
              style={{ borderTop: "1px solid rgba(0, 255, 65, 0.05)" }}
            >
              <span style={{ color: "#00f0ff" }} className="text-xs">c4o5@sec</span>
              <span style={{ color: "#6e7681" }} className="text-xs">:~$ </span>
              <span className="cursor-blink text-xs" />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import { getAllPosts, getPostBySlug } from "../blog/loader";
import type { Post } from "../blog/loader";

export default function BlogPage() {
  const posts = getAllPosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function handleSelect(slug: string) {
    const post = getPostBySlug(slug);
    if (post) setSelectedPost(post);
  }

  return (
    <>
      <VideoBackground />
      <Navbar />
      <div
        className="h-screen flex"
        style={{ position: "relative", zIndex: 2, paddingTop: "56px" }}
        id="blog"
      >
        {/* === PAINEL ESQUERDO: Lista de Posts === */}
        <aside
          className={`h-full overflow-y-auto w-full lg:w-[360px] lg:min-w-[320px] p-6 sm:p-8 ${
            selectedPost ? "hidden lg:block" : "block"
          }`}
          style={{
            borderRight: "1px solid rgba(0, 255, 65, 0.1)",
            scrollbarWidth: "thin",
            scrollbarColor: "#00ff4130 transparent",
          }}
        >
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-sm font-semibold mb-2">
              <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
              <span style={{ color: "#6e7681" }}>:~$ </span>
              <span className="neon-text">ls -al ./Blog</span>
            </h1>
            <p className="text-xs" style={{ color: "#6e7681" }}>
              total {posts.length}
            </p>
          </motion.div>

          {/* Post Cards */}
          <div className="flex flex-col gap-5">
            {posts.map((post, i) => {
              const isActive = selectedPost?.slug === post.slug;
              return (
                <motion.button
                  key={post.slug}
                  onClick={() => handleSelect(post.slug)}
                  className="w-full text-left rounded-lg transition-all cursor-pointer"
                  style={{
                    padding: "1rem 1.25rem",
                    background: isActive
                      ? "rgba(0, 255, 65, 0.08)"
                      : "rgba(13, 17, 23, 0.75)",
                    border: isActive
                      ? "1px solid rgba(0, 255, 65, 0.4)"
                      : "1px solid rgba(0, 255, 65, 0.08)",
                    boxShadow: isActive
                      ? "0 0 20px rgba(0, 255, 65, 0.08), inset 0 0 20px rgba(0, 255, 65, 0.03)"
                      : "none",
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  whileHover={{
                    borderColor: "rgba(0, 255, 65, 0.3)",
                    background: "rgba(0, 255, 65, 0.05)",
                  }}
                  id={`post-card-${post.slug}`}
                >
                  {/* Date line */}
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ color: "#6e7681", fontSize: "11px" }}
                  >
                    <span style={{ color: "#00ff41" }}>-rwxr-xr-x</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-sm font-semibold leading-relaxed"
                    style={{ color: isActive ? "#00ff41" : "#00f0ff" }}
                  >
                    {post.title}
                  </h2>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded"
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            background: "rgba(0, 255, 65, 0.04)",
                            border: "1px solid rgba(0, 255, 65, 0.1)",
                            color: "#00ff41",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </aside>

        {/* === PAINEL DIREITO: Conteúdo do Post === */}
        <main
          className={`flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-10 ${
            selectedPost ? "block" : "hidden lg:block"
          }`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#00ff4130 transparent",
          }}
        >
          <AnimatePresence mode="wait">
            {selectedPost ? (
              <motion.div
                key={selectedPost.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mx-auto"
                style={{ maxWidth: "52rem" }}
              >
                {/* Botão Voltar para Mobile */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="lg:hidden terminal-link text-xs mb-5 inline-block cursor-pointer"
                >
                  ← cd ../Blog
                </button>

                <div
                  className="terminal-card"
                  style={{ padding: "2rem 2.5rem", overflowX: "hidden" }}
                >
                  {/* Terminal Bar */}
                  <div
                    className="flex items-center gap-2 pb-4 mb-6"
                    style={{ borderBottom: "1px solid rgba(0, 255, 65, 0.1)" }}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                    <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                    <span className="ml-3 text-xs" style={{ color: "#6e7681" }}>
                      ~/c4o5.sec/blog/{selectedPost.slug}.md
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mb-6">
                    <div
                      className="flex items-center gap-3 mb-3"
                      style={{ color: "#6e7681", fontSize: "12px" }}
                    >
                      <span style={{ color: "#00ff41" }}>-rwxr-xr-x</span>
                      <span>{selectedPost.author}</span>
                      <span>{selectedPost.date}</span>
                    </div>
                    {selectedPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag) => (
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
                  <article
                    className="prose-terminal"
                    style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedPost.content}
                    </ReactMarkdown>
                  </article>

                  {/* Prompt */}
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
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-sm mb-3" style={{ color: "#6e7681" }}>
                    <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
                    <span style={{ color: "#6e7681" }}>:~$ </span>
                    <span className="neon-text">cat readme.txt</span>
                  </p>
                  <p className="text-xs" style={{ color: "#484f58" }}>
                    ← Selecione um post para ler
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

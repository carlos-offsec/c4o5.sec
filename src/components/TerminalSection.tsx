import { motion } from "framer-motion";

interface TerminalLink {
  label: string;
  url: string;
  description?: string;
}

interface TerminalSectionProps {
  id: string;
  command: string;
  links: TerminalLink[];
  index: number;
}

export default function TerminalSection({ id, command, links, index }: TerminalSectionProps) {
  return (
    <motion.section className="py-12 sm:py-16 px-4" id={id}
      style={{ position: "relative", zIndex: 2 }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="terminal-card p-5 sm:p-8">
          {/* Barra do terminal */}
          <div className="flex items-center gap-2 mb-5 pb-3"
            style={{ borderBottom: "1px solid rgba(0, 255, 65, 0.1)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-3 text-xs" style={{ color: "#6e7681" }}>~/c4o5.sec</span>
          </div>

          {/* Comando */}
          <h3 className="section-header">
            <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
            <span style={{ color: "#6e7681" }}>:~$ </span>
            <span className="neon-text">{command}</span>
          </h3>

          {/* Saída */}
          <div className="space-y-2">
            <div className="text-xs mb-3" style={{ color: "#6e7681" }}>total {links.length}</div>
            {links.map((link, i) => (
              <motion.div key={i} className="flex items-start gap-3 py-1 group"
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }} viewport={{ once: true }}>
                <span className="text-xs mt-0.5 shrink-0 hidden sm:inline" style={{ color: "#00ff41" }}>
                  -rwxr-xr-x
                </span>
                <span className="text-xs mt-0.5 shrink-0 sm:hidden" style={{ color: "#00ff41" }}>
                  &gt;
                </span>
                <a href={link.url} target="_blank" rel="noopener noreferrer"
                  className="terminal-link text-sm" id={`link-${id}-${i}`}>
                  {link.label}
                </a>
                {link.description && (
                  <span className="hidden sm:inline text-xs ml-auto shrink-0" style={{ color: "#6e7681" }}>
                    # {link.description}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Prompt */}
          <div className="mt-5 pt-3" style={{ borderTop: "1px solid rgba(0, 255, 65, 0.05)" }}>
            <span style={{ color: "#00f0ff" }} className="text-xs">c4o5@sec</span>
            <span style={{ color: "#6e7681" }} className="text-xs">:~$ </span>
            <span className="cursor-blink text-xs" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

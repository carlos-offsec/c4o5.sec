import { motion } from "framer-motion";

export default function AboutSection() {
  const skills = [
    { skill: "Segurança Ofensiva", level: "██████████ 100%" },
    { skill: "Engenharia Reversa", level: "████████░░  80%" },
    { skill: "Assembly / Low-Level", level: "████████░░  80%" },
    { skill: "Segurança Web", level: "███████░░░  70%" },
    { skill: "Análise de Malware", level: "███████░░░  70%" },
    { skill: "Python / C", level: "████████░░  80%" },
  ];

  return (
    <motion.section className="py-12 sm:py-16 px-4" id="sobre"
      style={{ position: "relative", zIndex: 2 }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-50px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="terminal-card p-5 sm:p-8">
          {/* Barra do terminal */}
          <div className="flex items-center gap-2 mb-5 pb-3"
            style={{ borderBottom: "1px solid rgba(0,255,65,0.1)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-3 text-xs" style={{ color: "#6e7681" }}>~/c4o5.sec/sobre</span>
          </div>

          {/* Comando */}
          <h3 className="section-header">
            <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
            <span style={{ color: "#6e7681" }}>:~$ </span>
            <span className="neon-text">cat sobre_mim.txt</span>
          </h3>

          {/* Conteúdo */}
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#c9d1d9" }}>
            <p>
              <span className="neon-text">// </span>
              Estudante de Segurança da Informação apaixonado por hacking, engenharia reversa e desenvolvimento low-level.
            </p>
            <p>
              <span className="neon-text">// </span>
              Focado em Segurança Ofensiva, Desenvolvimento de Exploits e pesquisa de vulnerabilidades.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((item, i) => (
                <motion.div key={i} className="p-3 rounded-md"
                  style={{ background: "rgba(0,255,65,0.03)", border: "1px solid rgba(0,255,65,0.08)" }}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }} viewport={{ once: true }}>
                  <div className="text-xs mb-1" style={{ color: "#00f0ff" }}>{item.skill}</div>
                  <div className="text-xs font-mono neon-text">{item.level}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="mt-5 pt-3" style={{ borderTop: "1px solid rgba(0,255,65,0.05)" }}>
            <span style={{ color: "#00f0ff" }} className="text-xs">c4o5@sec</span>
            <span style={{ color: "#6e7681" }} className="text-xs">:~$ </span>
            <span className="cursor-blink text-xs" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

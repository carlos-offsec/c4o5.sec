import { motion } from "framer-motion";

const socials = [
  { name: "GitHub", url: "https://github.com/carlos-offsec", icon: "⌘" },
  { name: "TryHackMe", url: "https://tryhackme.com/", icon: "⚑" },
  { name: "HackTheBox", url: "https://app.hackthebox.eu/", icon: "◈" },
  { name: "LinkedIn", url: "https://linkedin.com/", icon: "◉" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 mt-8" id="contato"
      style={{ borderTop: "1px solid rgba(0,255,65,0.08)", position: "relative", zIndex: 2 }}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h3 className="text-sm mb-6" style={{ color: "#00ff41",
            textShadow: "0 0 5px rgba(0,255,65,0.3)" }}>
            <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
            <span style={{ color: "#6e7681" }}>:~$ </span>
            cat ./contato.txt
          </h3>
          <div className="flex justify-center gap-4 mb-8">
            {socials.map((s, i) => (
              <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="social-icon" title={s.name}
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}>
                {s.icon}
              </motion.a>
            ))}
          </div>
          <div className="text-xs" style={{ color: "#6e7681" }}>
            <p>© {new Date().getFullYear()} c4o5.sec — Todos os direitos reservados.</p>
            <p className="mt-1">
              <span className="neon-text">$</span> echo "Feito com 💀 e ☕"
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

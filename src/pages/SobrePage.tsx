import { motion } from "framer-motion";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";

export default function SobrePage() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <section
        className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
        style={{ position: "relative", zIndex: 2 }}
        id="sobre"
      >
        <motion.div
          className="max-w-3xl w-full mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="terminal-card p-6 sm:p-10">
            {/* Barra do terminal */}
            <div
              className="flex items-center gap-2 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(0, 255, 65, 0.1)" }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
              <span className="ml-3 text-xs" style={{ color: "#6e7681" }}>
                ~/c4o5.sec/sobre
              </span>
            </div>

            {/* Comando */}
            <h1 className="section-header text-base sm:text-lg mb-8">
              <span style={{ color: "#00f0ff" }}>c4o5@sec</span>
              <span style={{ color: "#6e7681" }}>:~$ </span>
              <span className="neon-text">cat sobre_mim.txt</span>
            </h1>

            {/* Conteúdo */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed" style={{ color: "#c9d1d9" }}>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="neon-text">// </span>
                Pode me chamar de <span style={{ color: "#00f0ff", fontWeight: 600 }}>c4o5</span>. Sou um entusiasta de tecnologia que passa a maior parte do tempo explorando o que acontece por baixo do capô, seja hackeando ou desenvolvendo.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="neon-text">// </span>
                Minha curiosidade começou cedo, e desde então, minha trajetória tem sido uma mistura de construir coisas e entender como elas podem ser quebradas. Comecei com o básico, criando scripts simples para automatizar tarefas, e logo percebi que o código era o meu playground. Passei pelo desenvolvimento, aprendi a estruturar sistemas, mas a segurança sempre foi o que me deu aquele <span style={{ color: "#00ff41", fontStyle: "italic" }}>'estalo'</span> de querer saber mais.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="neon-text">// </span>
                Hoje, o foco é na <span style={{ color: "#00f0ff" }}>Segurança da Informação</span> e <span style={{ color: "#00f0ff" }}>pentest</span> e em como unir o desenvolvimento com a defesa cibernética. Entre uma linha de código e um desafio de segurança, estou sempre buscando a próxima vulnerabilidade para entender como proteger melhor o que construímos.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="neon-text">// </span>
                Espero que você curta acompanhar o que ando aprontando por aqui!
              </motion.p>
            </div>

            {/* Prompt final */}
            <motion.div
              className="mt-8 pt-4"
              style={{ borderTop: "1px solid rgba(0, 255, 65, 0.05)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span style={{ color: "#00f0ff" }} className="text-xs">c4o5@sec</span>
              <span style={{ color: "#6e7681" }} className="text-xs">:~$ </span>
              <span className="cursor-blink text-xs" />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

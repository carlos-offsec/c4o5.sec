import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/carlos-offsec",
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/carlosincodeland/",
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "TryHackMe",
    url: "https://tryhackme.com/p/c4o5",
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0-.488.305.625.625 0 1 0 .731 1.013 3.245 3.245 0 0 1 1.912-.616 3.278 3.278 0 0 1 3.203 2.61.625.625 0 0 0 1.225-.251 4.533 4.533 0 0 0-4.428-3.61 4.54 4.54 0 0 0-.958.105C16.556 2.328 13.9 0 10.705 0zm5.192 10.64a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.054.514c0 .181.018.353.054.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .309-.296c.08-.124.137-.267.173-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.309-.291.917.917 0 0 0-.46-.108zm6.486 0a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.053.514c0 .181.017.353.053.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .31-.296c.078-.124.136-.267.172-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.308-.291.916.916 0 0 0-.461-.108zm-8.537.068l-.84.618.313.43.476-.368v1.877h.603v-2.557zm6.486 0l-.841.618.314.43.477-.368v1.877h.603v-2.557zm-4.435.445c.08 0 .143.028.193.084a.584.584 0 0 1 .114.21c.026.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.028.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.248.248 0 0 1-.195-.086.584.584 0 0 1-.118-.209 1.245 1.245 0 0 1-.056-.27 2.645 2.645 0 0 1 0-.533c.01-.096.029-.186.056-.27a.583.583 0 0 1 .118-.209.25.25 0 0 1 .195-.084zm6.486 0c.08 0 .144.028.193.084a.584.584 0 0 1 .114.21c.027.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.027.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.249.249 0 0 1-.195-.086.581.581 0 0 1-.117-.209 1.245 1.245 0 0 1-.056-.27 2.642 2.642 0 0 1 0-.533c.01-.096.028-.186.056-.27a.58.58 0 0 1 .117-.209.25.25 0 0 1 .195-.084z"/>
      </svg>
    ),
  },
  {
    name: "HackTheBox",
    url: "https://profile.hackthebox.com/profile/019caa55-5543-715b-b7aa-672e20899786",
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="m22.5106 6.4566.0008-.0123a.888.888 0 0 0-.2717-.6384c-.0084-.0084-.018-.0155-.0267-.0235a.8769.8769 0 0 0-.1179-.089c-.0096-.006-.0182-.0131-.0281-.0188L12.4576.1266a.891.891 0 0 0-.9223.0043L1.933 5.6744a.8769.8769 0 0 0-.2-.1207.8872.8872 0 0 0-.2218.5847l.0009.014c-.0002.0088-.0015.0176-.0015.0264v11.0708c0 .3277.1802.6288.469.7836l9.5986 5.5417a.8754.8754 0 0 0 .166.0687.835.835 0 0 0 .2157 0 .895.895 0 0 0 .177-.0476c.0078-.0042.016-.0072.0236-.0117l9.5986-5.5417a.8888.8888 0 0 0 .469-.7836V6.4779c0-.0071-.0012-.0142-.0014-.0213zM5.2543 6.0822l6.5367-3.774a.4182.4182 0 0 1 .4182 0l6.5366 3.774a.4182.4182 0 0 1 0 .7243l-6.5367 3.774a.4182.4182 0 0 1-.4182 0l-6.5366-3.774a.4182.4182 0 0 1 0-.7243zm5.6134 14.3449a.4172.4172 0 0 1-.626.3613L3.718 17.0218a.4173.4173 0 0 1-.2086-.3613V9.1279a.4172.4172 0 0 1 .6258-.3613l6.524 3.7666a.4172.4172 0 0 1 .2086.3614v7.5325zm9.623-3.7666a.4173.4173 0 0 1-.2086.3613l-6.5239 3.7666a.4172.4172 0 0 1-.6259-.3613v-7.5325c0-.149.0796-.2868.2087-.3614l6.5239-3.7666a.4172.4172 0 0 1 .6258.3613v7.5326z"/>
      </svg>
    ),
  },
];

export default function HeroSection() {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="h-screen flex items-center justify-center px-4"
      style={{ position: "relative", zIndex: 2, overflow: "hidden" }}
      id="hero"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Conteúdo de texto */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Prompt shell */}
          <div className="text-xs sm:text-sm mb-4" style={{ color: "#6e7681" }}>
            <span style={{ color: "#00ff41" }}>c4o5</span>
            <span style={{ color: "#8b949e" }}>@</span>
            <span style={{ color: "#00f0ff" }}>sec</span>
            <span style={{ color: "#8b949e" }}>:~$ </span>
            <span style={{ color: "#c9d1d9" }}>whoami</span>
          </div>

          {/* Título principal com Glitch */}
          <h1
            className="glitch text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-text="c4o5.sec"
            style={{
              color: "#00f0ff",
              textShadow:
                "0 0 10px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)",
            }}
          >
            c4o5.sec
          </h1>

          {/* Linhas Typewriter */}
          <div
            className="space-y-2 text-sm sm:text-base"
            style={{ color: "#c9d1d9" }}
          >
            <div>
              <span className="neon-text mr-2">&gt;</span>
              <Typewriter
                text='echo "Olá, eu sou o c4o5! Prazer em conhecê-lo."'
                speed={50}
                delay={800}
                onComplete={() => setLine1Done(true)}
              />
            </div>
            {line1Done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="neon-text mr-2">&gt;</span>
                <Typewriter
                  text="Hacking / Segurança / E mais >>>"
                  speed={60}
                  delay={300}
                  onComplete={() => setLine2Done(true)}
                />
              </motion.div>
            )}
            {line2Done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <span className="neon-text mr-2">&gt;</span>
                <span className="cursor-blink" style={{ color: "#8b949e" }}>
                  Aguardando entrada
                </span>
              </motion.div>
            )}
          </div>


          {/* Ícones Sociais */}
          <motion.div
            className="flex items-center gap-4 mt-8 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: line2Done ? 1 : 0, y: line2Done ? 0 : 15 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={s.name}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: line2Done ? 1 : 0, y: line2Done ? 0 : 10 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                id={`social-${s.name.toLowerCase()}`}
              >
                {s.svg}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Personagem */}
        {!imgError && (
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <div className="float-animation">
              <img
                src="/images/personagem.png"
                alt="Personagem c4o5.sec"
                id="hero-character"
                className="w-48 sm:w-64 lg:w-80 xl:w-96"
                style={{
                  filter:
                    "drop-shadow(0 0 15px rgba(0, 240, 255, 0.25)) drop-shadow(0 0 30px rgba(168, 85, 247, 0.15))",
                }}
                onError={() => setImgError(true)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

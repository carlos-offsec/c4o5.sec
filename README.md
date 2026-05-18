# 💀 c4o5.sec - Hacker Portfolio & Writeups

Um website pessoal e portfólio de segurança da informação ultra-minimalista, inspirado no estilo retrô de terminal e no visual icônico do *paff-shell.com*. Contém uma landing page imersiva, seção sobre e um blog dinâmico integrado para writeups e tutoriais.

---

## ⚡ Tecnologias

*   **Core:** React + TypeScript + Vite
*   **Design & Estilo:** Tailwind CSS (v4) + HSL Colors
*   **Animações:** Framer Motion (Typewriter, Glitch, Floating elements)
*   **Blog Engine:** React Markdown + Custom Browser Frontmatter Parser

---

## 📁 Estrutura do Site

1.  **Home (`/`)**: Landing page em viewport única (sem scroll) com efeito digital rain (chuva matrix) em tons de ciano/roxo, efeito typewriter interativo, avatar flutuante e atalhos rápidos para redes profissionais (GitHub, LinkedIn, TryHackMe e HackTheBox).
2.  **Sobre (`/sobre`)**: Um terminal card interativo renderizando a biografia oficial em formato texto.
3.  **Blog (`/blog`)**: Interface assíncrona master/detail lado a lado. Os posts são listados em formato de arquivos de sistema (`ls -al`) no painel esquerdo, e o conteúdo abre instantaneamente à direita com transições animadas e sem recarregar a página.

---

## 🚀 Como Rodar Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  Abra `http://localhost:5173` no navegador.

---

## ✍️ Como Adicionar um Novo Post/Writeup

O sistema do blog é totalmente estático e lê arquivos Markdown automaticamente.

1.  Crie um novo arquivo `.md` dentro de `src/blog/posts/` (ex: `analise-de-malware.md`).
2.  Adicione a estrutura de cabeçalho (Frontmatter) na primeira linha:

```markdown
---
title: "Título Super Explicativo do Artigo"
date: "2026-05-18"
author: "c4o5"
tags: ["ctf", "writeup", "malware"]
---

# Título do Post no Markdown

Escreva o seu artigo em Markdown convencional aqui embaixo!
```

> [!TIP]
> O blog ordena os posts de forma cronológica usando a data fornecida no campo `date: "AAAA-MM-DD"`.

---

## 🚢 Como fazer o Deploy no GitHub Pages

O projeto já está configurado com caminhos relativos e roteamento amigável (`HashRouter`) para evitar erros 404 em servidores estáticos.

Para subir as atualizações para o seu GitHub Pages com apenas um comando:

```bash
npm run deploy
```

---
*Developed with 👾 by c4o5*

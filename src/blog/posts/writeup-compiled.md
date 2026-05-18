---
title: "Writeup Compiled - THM"
date: "2026-05-18"
author: "c4o5"
tags: ["Writeup", "tryhackme", "reverse engineering"]
---

# Compiled - As strings só podem ajudar você até certo ponto.

Neste post, vou apresentar o passo a passo que realizei para completar a sala Compiled do TryHackMe.
Esse é um desafio de nível fácil na plataforma, focado na área de Engenharia Reversa e análise de binários.

## Objetivo

O desafio é bem direto. A sala fornece um arquivo binário compilado que você precisa baixar (ou acessar de dentro do TryHackMe AttackBox) e analisar. O objetivo final é extrair uma flag respondendo a pergunta: "What is the password?" (Qual é a senha?)

### Primeiros passos

Comecei baixando e executando o binário. Como podemos ver na imagem a primeira coisa que aparece quando executamos ele é um input pedindo o password.
![foto 1](imagem1.png)


Logo após, fui para o ghidra para analizar mais de perto como estava sendo feita aquela validação. Aqui encontrei algumas strings que me deram uma pista de como tudo estava acontecendo.
![foto 2](imagem2.png)

Analisando um pouco mais a fundo no descompilador, pude ver de fato como que estava sendo feita a validação e encontrei duas strings que poderiam ser a tão sonhada flag.
a string "_init" e a "__dso_handle"
![foto 3](imagem3.png)

Após um teste manual rápido encontrei a string verdadeira e que completou a flag.
![foto 4](imagem4.png)

---
title: "Writeup Compiled - THM"
date: "2026-05-18"
author: "c4o5"
tags: ["Writeup", "tryhackme", "reverse engineering"]
---

# Compiled - As strings só podem ajudar você até certo ponto.

Neste post, vou apresentar o passo a passo da resolução da sala **Compiled** do TryHackMe. Este é um desafio de nível fácil focado em Engenharia Reversa e análise estática de binários. Como o próprio subtítulo da sala sugere, o objetivo principal é mostrar que depender apenas da extração de textos legíveis não é suficiente.

## Objetivo

A premissa é direta: baixar um arquivo binário Linux compilado e descobrir a flag, que é a resposta para a pergunta: "What is the password?".

### 1. Análise Dinâmica Inicial

O primeiro passo é sempre entender o comportamento padrão do executável. Ao rodar o binário, a primeira interação é um prompt simples aguardando a inserção de uma senha.

![foto 6](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/imagem6.png)

### 2. Análise Estática com Ghidra

Sabendo que a senha não estaria exposta de forma trivial em texto claro, parti para a análise estática no Ghidra para inspecionar as strings e descompilar a função principal. O objetivo aqui era mapear a lógica de validação.

Logo de cara, analisando as strings em memória, encontrei algumas referências interessantes que me deram uma pista de como o fluxo de execução estava sendo controlado.

![foto 2](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/imagem2.png)

### 3. Dissecando a Validação e a Armadilha

Analisando o pseudocódigo gerado pelo descompilador, a lógica do programa ficou clara. A validação não compara a entrada do usuário diretamente com uma única string estática. Em vez disso, notei que o binário processa a entrada utilizando uma formatação específica no momento da leitura: `__isoc99_scanf("DoYouEven%sCTF", local_28)`.

Isso significa que o executável espera que a entrada variável (o `%s`) esteja "envelopada" entre o prefixo `DoYouEven` e o sufixo `CTF`.

Aprofundando na função de comparação, vi que esse valor extraído da entrada era comparado contra strings como `_init` e `__dso_handle`.

![foto 3](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/imagem3.png)

**A grande sacada do desafio:** `_init` e `__dso_handle` não são valores aleatórios. Eles são artefatos reais e padronizados em binários ELF (C/C++), responsáveis pela inicialização e gerenciamento de objetos dinâmicos. O autor da sala os utilizou na comparação propositalmente como uma armadilha. Quem tentasse resolver o desafio executando apenas o comando `strings` no terminal no modo automático acabaria vendo essas funções de sistema e as ignoraria, sem perceber que faziam parte da senha.

### 4. Juntando as Peças

Com a lógica de validação mapeada, bastou montar a flag unindo a regra de formatação do `scanf` com a string verdadeira da comparação. A senha correta esperada pelo sistema seria, portanto, a junção de tudo.
Fiz o teste manual inserindo a string formatada no binário. A entrada foi validada com sucesso, entregando a flag que resolve o desafio.

![foto 5](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/imagem5.png)


---
title: "Meu Primeiro Writeup de CTF"
date: "2026-05-17"
author: "c4o5"
tags: ["ctf", "writeup", "segurança"]
---

# Meu Primeiro Writeup de CTF: Máquina X

Olá a todos! Hoje vou detalhar como resolvi a máquina X no HackTheBox.

## Reconhecimento

Comecei com um scan básico usando `nmap`:

```bash
nmap -sC -sV 10.10.10.10
```

Resultado interessante: porta 80 aberta com um Apache desatualizado.

## Exploração

Descobri uma vulnerabilidade de **Local File Inclusion** no parâmetro `page`:

```
http://10.10.10.10/index.php?page=../../etc/passwd
```

Com isso, consegui enumerar os usuários do sistema.

## Pós-Exploração

Consegui acesso root através de um binário com SUID mal configurado:

```bash
find / -perm -4000 2>/dev/null
# /usr/bin/custom_tool
```

A flag estava em `/root/root.txt`. 🏴

## Lições Aprendidas

- Sempre verificar versões de serviços expostos
- LFI pode escalar rapidamente quando combinado com log poisoning
- Binários com SUID são alvos fáceis de privesc

Espero que tenham gostado!

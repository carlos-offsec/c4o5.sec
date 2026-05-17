---
title: "Hardware Hacking - Introdução ao UART"
date: "2026-05-15"
author: "c4o5"
tags: ["hardware", "hacking", "uart", "pesquisa"]
---

# Hardware Hacking - Introdução ao UART

Neste post, vou apresentar os conceitos básicos de comunicação UART e como ela pode ser explorada em dispositivos embarcados.

## O que é UART?

**UART** (Universal Asynchronous Receiver/Transmitter) é um protocolo de comunicação serial assíncrona amplamente utilizado em dispositivos embarcados. É comum encontrar portas UART expostas em:

- Roteadores
- Câmeras IP
- IoT devices
- Consoles de videogame

## Identificando o UART

Para identificar os pinos UART em uma placa, precisamos de:

1. Um **multímetro** para identificar GND e VCC
2. Um **analisador lógico** ou osciloscópio
3. Um adaptador **USB-to-UART** (como o CP2102 ou FT232)

```
Pinagem típica:
┌─────────┐
│ VCC     │ → 3.3V ou 5V
│ GND     │ → Ground
│ TX      │ → Transmit
│ RX      │ → Receive
└─────────┘
```

## Conectando

```bash
# Usando screen para conectar na serial
screen /dev/ttyUSB0 115200

# Ou com minicom
minicom -D /dev/ttyUSB0 -b 115200
```

## Conclusão

O UART é frequentemente a porta de entrada mais fácil para análise de firmware e obtenção de shells em dispositivos embarcados. Sempre procure por headers não populados nas PCBs!

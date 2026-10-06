---
title: "O hack que só o Google enxergava: anatomia de um Japanese Keyword Hack"
date: "2026-10-06"
author: "c4o5"
tags: ["Writeup", "malware", "wordpress", "cloaking"]
---

# O hack que só o Google enxergava: anatomia de um Japanese Keyword Hack

> Não conseguia acessar o painel do site. "Página não encontrada." Parecia um problema bobo de login — era um malware ativo, servindo uma loja japonesa falsa para o Google. E só para o Google.

## 1. O sintoma banal

Começou com um problema que qualquer um teria: eu precisava entrar no painel de administração de um site do nosso portfólio e... "página não encontrada".

O site em si estava lá. Abria normalmente no navegador — conteúdo no lugar, imagens carregando, tudo perfeito. Só o `/wp-admin` não abria. E o `/wp-login.php`? Ficava "pensando" para sempre, até o timeout.

Minha primeira reação foi típica: "deve ser alguma coisa com o login, plugin de segurança, cache...". Afinal, se o site está no ar e normal, o problema devia ser só no acesso administrativo.

Estava errado. Muito errado.

## 2. As primeiras pistas

O primeiro reflexo foi comparar com os vizinhos. Nosso portfólio tem dezenas de sites na mesma infraestrutura — se fosse problema de servidor, mais gente estaria afetado.

Testei uma dúzia: todos com login funcionando, todos normais. O problema era só naquele site.

Detalhes que anotei:

- O `/wp-admin` devolvia **a página de erro do próprio tema** do site (com cabeçalho, rodapé, tudo) — não um erro genérico de servidor
- O `/wp-login.php` não devolvia nada — nem erro, nem página, nem redirecionamento. Só silêncio até o timeout
- O site roda WordPress com um tema comercial, atrás de um CDN (Cloudflare)

Duas hipóteses na mesa: (a) plugin de "esconder login" configurado de forma errada, ou (b) alguma manipulação no próprio WordPress.

Nenhuma das duas explicava tudo. E aí veio o estalo.

## 3. O momento "aha"

E se o site estivesse tratando a minha visita de um jeito diferente de como trata o Google?

Peguei o comando mais bobo do mundo e mudei uma coisa: o User-Agent — a "assinatura" que o navegador envia dizendo quem é. No lugar do Chrome, coloquei o do Googlebot (o robô de indexação do Google).

```bash
curl -s -A "Googlebot" https://SEU-SITE/ | grep '<title>'
```

O que voltou me deixou gelado:

```html
<title>【美品】TOSHIBA 128GB ノートPC ノートパソコン corei7 【公式通販】</title>
```

Uma **loja japonesa de eletrônicos** — usados, câmeras, quimonos — no lugar do nosso site.

Fiz o teste contrário, com User-Agent de navegador normal:

```html
<title>- Apps, tips, news and much more!</title>
```

O site, intacto.

O mesmo endereço. A mesma página. **Dois conteúdos diferentes, dependendo de quem pergunta.** Isso tem nome: *cloaking*.

![O mesmo site, dois conteúdos: à esquerda, o que um visitante vê; à direita, o que o Googlebot recebe](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/mesmo-site-dois-conteudos.png)

E tem um detalhe ainda mais sujo: o malware faz o match por **substring**. Não precisa ser o Googlebot de verdade — testei um Chrome normal com a palavra "Googlebot" colada no fim do User-Agent e a página falsa apareceu do mesmo jeito. Para o atacante, é mais fácil "pegar" qualquer scanner que se identifique; para o dono do site, é mais um motivo para nunca desconfiar.

## 4. Decodificando o golpe

Com a hipótese confirmada, era hora de entender a anatomia completa. O que encontrei foi uma operação bem montada, em camadas.

**A isca.** A página falsa não é um spam tosco — é uma loja completa: preços em ienes, carrinho de compras ("カート"), botão de compra, cálculo de frete ("送料無料"), até selo de review. Copiada de uma loja japonesa real — os assets (CSS, JavaScript, imagens) vêm de domínios legítimos como `komeri.com`.

![Print da página falsa servida ao Googlebot: uma loja japonesa completa no lugar do site](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/loja-falsa-googlebot.png)

E tem um detalhe de ouro: a página usa um Google Tag Manager **dos atacantes** (`GTM-WW7TZTK`), diferente do GTM legítimo do site (`GTM-TFQGJSFQ`). Esse contraste virou meu indicador favorito — em qualquer site, a presença dos dois IDs denuncia a troca.

**A distribuição.** Os golpistas não contam só com o Google descobrir sozinho. O `robots.txt` do site — que é público — estava listando sitemaps que nenhum humano criou:

```
Sitemap: https://SEU-SITE/?sitemap838.xml
Sitemap: https://SEU-SITE/?sitemap114.xml
...
```

Dentro deles: **cerca de 1.900 URLs** de uma loja falsa — páginas como `pages.php?shops/...` e `pages.php?t=...`. Um catálogo inteiro de produtos, hospedado sob o nosso domínio.

![robots.txt do site com sitemaps injetados pelo malware](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/sitemaps-injetados.png)

**O redirect.** Quando um japonês pesquisava no Google, clicava num resultado com o **nosso domínio** e caía numa dessas páginas... o que acontecia? Descobri testando com o referrer certo (um clique vindo da busca japonesa). A resposta era uma página minúscula de 1.782 bytes que fazia o desvio final para o site do golpe.

Era assim (decodificado):

```html
<meta http-equiv="refresh" content="0; url=https://jippo.sili.world/item-azkh628oqv.html"/>
<script>
  var cos = ['win','dow.onload=','function(){ ', ... ,
  'BaHR0cHM6Ly9qaXBwby5zaWxpLndvcmxkL2l0ZW0tYXpraDYyOG9xdi5odG1s', ...];
  // base64 → atob() → eval()
</script>
<noscript><meta http-equiv="refresh" content="0; url=https://jippo.sili.world/..."></noscript>
```

![O redirect decodificado: meta refresh, JavaScript ofuscado com Base64 e fallback noscript](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/redirect-decodificado.png)

Três camadas de fallback — meta refresh, JavaScript ofuscado (array fragmentado + Base64 + `eval`) e até `<noscript>` — para garantir que o desvio aconteça em qualquer navegador. E no fim, o golpe ainda injeta um script que imita o challenge do Cloudflare, para parecer tráfego protegido normal.

**O gatilho.** O redirect só dispara quando detecta um referrer de busca japonesa. Quem entra direto, ou até quem vem do `google.com` "normal", não vê nada. O malware segmenta o público do golpe com precisão cirúrgica.

**A economia do crime.** Por que fazer isso? *Parasite SEO*. Domínios novos não ranqueiam no Google — não têm autoridade, não têm histórico. Mas o nosso domínio, com anos de conteúdo, ranqueia. Os golpistas "pegam emprestada" essa autoridade: usam o nosso site para posicionar a loja falsa nas buscas japonesas, e cada clique pode virar uma venda de produto falsificado. Enquanto isso, o dono do site não vê nada, não reclama e não corrige. O produto do golpe é a nossa reputação.

![A cadeia do golpe: do Googlebot à loja falsa de produtos falsificados](https://raw.githubusercontent.com/carlos-offsec/c4o5.sec/main/public/images/cadeia-do-golpe.png)

## 5. Rastreando a origem

Com o mecanismo entendido, faltava responder: onde esse site está hospedado de verdade?

O CDN (Cloudflare) esconde o IP do servidor de origem — é literalmente o trabalho dele. Mas DNS tem memória. Passando pela lista de subdomínios, um chamou atenção: um "br." (pasta de idioma, provavelmente criado para o site multilíngue) apontava **direto para o servidor**, sem passar pelo CDN. Um subdomínio esquecido vazou a localização.

E aí veio uma surpresa desconfortável: o servidor **não era da nossa frota**. Havia um detalhe de hospedagem de terceiro no caminho — e ninguém sabia dizer de quem. (Essa parte do mistério segue em aberto — inclusive é o que trava a limpeza.)

Um último detalhe da investigação merece registro. A API pública do WordPress (`/wp-json`) lista os autores do site. Entre eles, uma conta que ninguém reconheceu como nossa: "Jhon Smith". Pode ser só um usuário legítimo com pseudônimo... ou uma conta plantada pelo atacante. Ainda não deu para confirmar — mas ficou anotado.

## 6. Metodologia: as hipóteses erradas (e por que contá-las)

A investigação não foi linear. E acho que vale contar onde eu errei — porque foi o processo que garantiu o acerto no final.

**Erro #1:** Achei que já tinha encontrado o servidor de origem logo no começo. Testei um host da nossa infraestrutura e a ferramenta "respondeu" com o site. Parecia resolvido. Era um falso positivo: o servidor era só um proxy que redireciona qualquer domínio desconhecido para o site. A ferramenta tinha seguido o redirect — e eu quase aceitei. Só quando entrei no servidor de verdade (via SSH) e conferi pessoalmente ("aqui não tem WordPress nenhum") é que caiu a ficha.

**Erro #2:** No calor do momento, rodei uma verificação automática em 8 sites vizinhos da mesma rede e concluí que "5 também estão infectados". Falso alarme — meu critério de detecção era frouxo e pegou caracteres japoneses legítimos de páginas normais. Re-testei do jeito rigoroso (comparação pareada: robô vs humano, byte a byte) e o resultado foi zero. Os vizinhos estão limpos. **Publicar o alarme errado seria péssimo** — para os donos dos sites e para a credibilidade da análise.

As lições que ficam:

1. **Teste pareado primeiro.** Antes de qualquer teoria sobre login, plugins ou servidor, compare o que o bot vê vs o que o humano vê. É o teste mais barato e mais revelador que existe para cloaking.
2. **Falso positivo é o inimigo silencioso.** Um filtro frouxo + pressa = conclusão errada. Re-teste sempre, com rigor, antes de comunicar.
3. **Documentar as correções de rota não é fraqueza — é rigor.** Investigação de verdade tem zigue-zague; o que importa é a evidência que sobra no final.

## 7. Detecte no seu site (faça isso agora)

Essa é a parte que eu queria que todo dono de site lesse. São 3 comandos e 2 minutos:

```bash
# 1) O que o Google vê (deve ser IGUAL ao normal)
curl -s -A "Googlebot" https://SEU-SITE/ | grep -o '<title>[^<]*'

# 2) O que você vê
curl -s https://SEU-SITE/ | grep -o '<title>[^<]*'

# 3) Sitemaps declarados (nomes estranhos = alerta)
curl -s https://SEU-SITE/robots.txt
```

Se os dois primeiros comandos devolverem títulos diferentes — **seu site está comprometido**. Não importa se para você parece normal.

No Google Search Console, vale conferir também:

- **Configurações → Usuários e permissões:** tem algum proprietário que você não reconhece? (Os golpistas costumam adicionar o próprio e-mail como dono, para reenviar sitemaps de spam mesmo depois da limpeza.)
- **Indexação → Páginas:** há URLs que você nunca criou? Padrões estranhos (pasta `/shop/`, `/products/`, arquivos `.html` soltos, query strings bizarras)?

## 8. Limpeza e prevenção (por onde começar)

Se der positivo, este é o resumo do que fazer:

1. **Não entre em pânico e não saia deletando arquivos.** Primeiro: **backup completo** (arquivos + banco).
2. **Ache o backdoor, não só a sujeira.** Deletar as páginas de spam sem achar o mecanismo que as gera = reinfecção em 48h. Os suspeitos clássicos: `.htaccess`, `index.php`/`wp-blog-header.php` modificados, PHP escondido em `wp-content/uploads/`, mu-plugins falsos, opções injetadas no banco.
3. **Restaure o que dá para restaurar:** core do WordPress, plugins (só os do repositório oficial), tema. Confira com `wp core verify-checksums`.
4. **Rotacione TUDO:** senhas dos admins, credenciais do banco, salts do WP (`wp-config.php`), painel de hospedagem, SSH, tokens do CDN.
5. **Expulse o atacante do Search Console:** remova proprietários desconhecidos, apague o arquivo de verificação dele (`googleXXXX.html` na raiz do site), remova sitemaps de spam.
6. **Limpe o rastro no Google:** delete as URLs de spam (ou responda 410 nas que persistem) e use a ferramenta de "Remoções" para as piores. A desindexação leva semanas — mas começa no dia 1.

Prevenção que funciona:

- WordPress, plugins e tema **sempre atualizados** (a porta de entrada mais comum)
- **2FA** para todos os admins + limite de tentativas de login
- `DISALLOW_FILE_EDIT` no `wp-config.php`
- Plugin de segurança + backup automático fora do servidor
- Se não puder fazer nada disso: **monitoramento externo** — porque foi assim que descobrimos

## 9. E o desfecho?

A remediação ainda está em curso — a origem já está identificada e o caminho da limpeza, mapeado. O que trava a etapa final é exatamente a ironia deste incidente: o servidor está fora do nosso controle direto.

Quando o ciclo fechar, atualizo este post com o que encontrarmos no servidor e o tempo total de exposição.

E a lição que fica, no fim de tudo: **você não pode proteger o que não controla.** O sintoma que nos alertou não veio de dentro — o site parecia perfeito para quem o visitava. Veio de fora, de um teste simples: "e se eu me passar pelo Google?". Se o seu site está num servidor de terceiro (ou de um provedor que você contratou e esqueceu), esse teste pode ser a diferença entre descobrir hoje e descobrir... quando o Google penalizar o seu domínio.

---

**Comando final:**

```bash
curl -s -A "Googlebot" https://SEU-SITE/ | grep '<title>'
```

Rode no seu site agora. Se aparecer algo diferente da sua página normal — me chama. Já passei por isso.

---

*[Nota do autor: o site citado está anonimizado. Os indicadores técnicos (GTM-WW7TZTK, domínio de destino, padrões) foram mantidos porque são úteis para defesa — quem encontrar os mesmos sinais pode agir mais rápido.]*

# Página de vendas — Kit de Planejamento de Aula BNCC 2027

Site estático (HTML/CSS/JS puro, sem build, sem dependência externa). Implementa a especificação única da §2b do documento [`lancamento` de PAR-9](/PAR/issues/PAR-9#document-lancamento) — serve aos dois cenários de canal em disputa em [PAR-11](/PAR/issues/PAR-11), sem precisar esperar essa decisão.

## Arquivos

- `index.html` — a página inteira (promessa → prova → o que vem no kit → objeções → amostra grátis → checkout → FAQ → reembolso).
- `style.css` — todo o visual, sem fonte externa (usa fontes do sistema, carrega sem internet).
- `checkout.js` — repasse de query string para o link de checkout + contador local de visitas/cliques. A página funciona sem este arquivo (requisito: abrir sem JavaScript); ele só reforça.

## O bloco que muda por canal

Em `index.html`, procure por:

```html
<!-- CHECKOUT:INICIO -->
...
<!-- CHECKOUT:FIM -->
```

Hoje ele vem no formato de **dois botões** (cenário B: Pix + Gumroad), que é o padrão. Se o canal confirmado em PAR-11 for **Hotmart** (cenário A), troque esse bloco por um único botão apontando para o checkout da Hotmart — o resto da página não muda.

## Passos do Arthur

1. **Colar os links de checkout.** Troque os placeholders `COLE-AQUI-O-LINK-DO-MERCADO-PAGO` e `COLE-AQUI-O-LINK-DO-GUMROAD` (ou o link único da Hotmart, se for o canal escolhido) pelos links reais.
2. **Preencher o preço.** Troque `[PREÇO A DEFINIR — ver decisão em PAR-11]` pelo valor confirmado.
3. **Publicar no GitHub Pages:**
   - No repositório `kit-bncc-2027-site`, abra **Settings → Pages**.
   - Em "Build and deployment", selecione **Deploy from a branch**, branch `main`, pasta `/ (root)`.
   - Salve. O GitHub mostra a URL pronta (formato `https://arthur-paraibano.github.io/kit-bncc-2027-site/`) em 1–2 minutos.
   - **Importante (requisito 3 da §2b):** depois que a Hotmart ou os afiliados tiverem essa URL cadastrada, não mude o endereço — trocar depois quebra o link de todo afiliado.
4. **Teste de aceite da query string (requisito 4 da §2b):** abra a página com `?src=teste` no final da URL (ex.: `https://.../?src=teste`) e confira, inspecionando o botão (botão direito → inspecionar, ou simplesmente clicando e olhando a barra de endereço no destino), que `src=teste` chegou no final do link de checkout.
5. **Ver o contador local (opcional):** abra a página com `?stats=1` no final da URL. Aparece uma barra no rodapé com visitas e cliques registrados *neste navegador*. É um contador local, não uma métrica agregada de todos os visitantes — ver limite abaixo.

## Limite conhecido do contador de clique/visita

O requisito da §2b pede "um contador local sem cookie e sem dado pessoal" — e é exatamente isso que `checkout.js` faz: conta em `localStorage`, por navegador. Isso significa que **ele não soma visitas de visitantes diferentes**; cada pessoa que abre a página tem sua própria contagem, visível só no próprio navegador dela. Para a medição real que a planilha semanal da §7 de PAR-9 pede:

- **Cenário A (Hotmart):** a própria Hotmart reporta cliques e origem por `?src=` no painel — essa é a fonte primária, o contador local serve só de conferência.
- **Cenário B (Gumroad + Pix):** não existe hoje uma fonte de tráfego agregada sem criar uma conta nova ou aceitar cookies de terceiro (o que geraria obrigação de LGPD que o requisito pediu para evitar). Dentro dessa restrição, o contador local é o que a especificação permite construir sem conta nova e sem serviço pago.

## O que falta para esta página (fora do escopo desta parte)

- Amostra grátis de 10 planos (arquivo final + link) — depende da curadoria ainda pendente, ver documento `produto` de PAR-8.
- Capa/mockup em PNG.
- Copy final de preço e ajuste fino de texto pelo Growth, se desejado, depende do preço de PAR-11.

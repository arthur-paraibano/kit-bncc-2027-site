/*
 * Kit de Planejamento de Aula BNCC 2027 — reforço progressivo da página de vendas.
 * Sem este arquivo, os botões de checkout já funcionam (são <a href> normais) —
 * ver PAR-9 §2b, requisito 2 (a página precisa abrir sem JavaScript).
 *
 * O que este script faz quando o JS está disponível:
 *   1. Repassa a query string de entrada (ex.: ?src=afiliado123) para o href
 *      de cada botão de checkout, sem filtrar nenhum parâmetro — requisito 4
 *      da §2b. Sem isso, um afiliado da Hotmart não recebe comissão e para
 *      de divulgar (falha silenciosa).
 *   2. Mantém uma contagem local de visitas e cliques nos botões, sem cookie
 *      e sem dado pessoal — requisito 5 da §2b. É um contador por navegador,
 *      não uma medição agregada de tráfego; ver README.md desta pasta.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "kitbncc2027_stats_v1";

  function readStats() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") {
        return { visits: 0, clicks: {} };
      }
      return {
        visits: typeof parsed.visits === "number" ? parsed.visits : 0,
        clicks: parsed.clicks && typeof parsed.clicks === "object" ? parsed.clicks : {}
      };
    } catch (err) {
      return { visits: 0, clicks: {} };
    }
  }

  function writeStats(stats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (err) {
      /* localStorage indisponível (ex.: modo privado) — segue sem contar. */
    }
  }

  function appendQueryString(href, search) {
    var qs = (search || "").replace(/^\?/, "");
    if (!qs) return href;
    var separator = href.indexOf("?") === -1 ? "?" : "&";
    return href + separator + qs;
  }

  function registerClick(buttonId) {
    var stats = readStats();
    stats.clicks[buttonId] = (stats.clicks[buttonId] || 0) + 1;
    writeStats(stats);
  }

  function registerVisit() {
    var stats = readStats();
    stats.visits += 1;
    writeStats(stats);
    return stats;
  }

  function enhanceCheckoutLinks() {
    var links = document.querySelectorAll("[data-checkout-link]");
    var search = window.location.search;
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var baseHref = link.getAttribute("href");
      link.setAttribute("href", appendQueryString(baseHref, search));
      link.addEventListener("click", (function (id) {
        return function () {
          registerClick(id);
        };
      })(link.id || "checkout-sem-id"));
    }
  }

  function maybeShowStatsPanel(stats) {
    if (window.location.search.indexOf("stats=1") === -1) return;
    var panel = document.createElement("div");
    panel.className = "stats-panel";
    panel.textContent =
      "Visitas (só neste navegador): " + stats.visits +
      " | Cliques Pix: " + (stats.clicks["btn-pix"] || 0) +
      " | Cliques Gumroad: " + (stats.clicks["btn-card"] || 0);
    document.body.appendChild(panel);
  }

  document.addEventListener("DOMContentLoaded", function () {
    enhanceCheckoutLinks();
    var stats = registerVisit();
    maybeShowStatsPanel(stats);
  });
})();

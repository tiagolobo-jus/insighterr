# InsightErr — Protótipo Interativo v3

Versão consolidada a partir do último ZIP exportado do Stitch.

## Como iniciar
Abra `index.html` em um navegador. Para hospedar, publique toda esta pasta como site estático.

## Fluxos principais

### Fluxo 1 — PROJUDI / unidade
`index.html` (Mesa do Servidor) → **Ver Processos** → `sso.html` → `clusters.html` (Análise de Similaridade de Casos).

Este fluxo entra no InsightErr **sem um processo previamente filtrado** e apresenta clusters e processos da unidade com potencial de acordo.

### Fluxo 2 — PROJUDI / processo específico
`projudi-processo.html` → selo **InsightErr | Cluster de Acordo (88.4%)** → `sso.html` → `avaliacao.html`.

O número do processo é carregado na avaliação para representar a passagem de contexto do PROJUDI para o InsightErr.

### Fluxo 3 — módulos do InsightErr
Menu lateral: **Explorador de Similaridades** ↔ **Avaliação de Processo** ↔ **Oportunidades Nacionais**.

## SSO
A tela intermediária é intencionalmente breve (~1,6 s) e demonstra que a sessão institucional do PROJUDI foi reconhecida. Não há novo formulário de login.

## Interações simuladas
- pesquisa/análise de processo;
- abertura de petição inicial de processo similar;
- abertura de acordo homologado;
- análise de clusters;
- navegação entre módulos;
- filtros de tribunais e acordos na visão nacional;
- retorno ao processo no PROJUDI.

Os dados e documentos abertos por modais são demonstrativos para teste de UX.

## v3.1 — correção de responsividade
- Corrigido `nacional.html`, que vinha do Stitch com `width: 1280px`, `height: 2294px` e `overflow: hidden` no elemento HTML.
- Rolagem vertical reativada e barras de rolagem visíveis.
- Sidebar substituída por navegação horizontal compacta em telas menores.
- Grafo nacional mantém legibilidade em mobile com rolagem horizontal local, sem provocar overflow da página inteira.
- Tabelas preservam rolagem horizontal em telas estreitas.

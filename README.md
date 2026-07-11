# RSV360° — Plano de Frontend (v0.dev)

Repositório de execução do frontend do **RSV360°** (Reservei Viagens — hospedagem de temporada em Caldas Novas-GO) usando o **v0 da Vercel**.

## Estrutura

- `PLANO_V0.md` — plano completo, fase a fase, com o lote de imagens de referência de cada etapa
- `prompts/` — um arquivo por fase com o prompt pronto para colar no v0
- `referencias/` — coloque aqui as capturas de tela (PNGs) organizadas por fase
- O código gerado pelo v0 será sincronizado neste mesmo repositório (Next.js App Router)

## Como conectar este repositório ao v0

1. Crie o repositório no GitHub (novo, ex.: `rsv360-frontend`) e faça o push desta pasta
2. Em [v0.dev](https://v0.dev), crie um **Project** (ex.: "RSV360 Frontend")
3. No projeto: **Settings → GitHub → Connect repository** → autorize a Vercel/v0 na sua conta GitHub → selecione o repositório
4. Pronto: o v0 passa a ler os arquivos do repositório e a enviar o código gerado via commits/branch de sync

## Fluxo de trabalho por fase

1. Abra um **chat novo dentro do Project** no v0
2. Cole o conteúdo de `prompts/00-prompt-mestre.md`
3. Cole o prompt da fase (ex.: `prompts/02-wizard-criacao-anuncio.md`) e **anexe as imagens** listadas no `PLANO_V0.md` (máx. 20 por mensagem)
4. Itere até a tela ficar fiel às referências
5. Sincronize/commite o código para o repositório e marque a fase como concluída no `PLANO_V0.md`

> Dica: como o repositório está conectado, você também pode dizer ao v0: *"Leia o arquivo PLANO_V0.md e o prompts/04-calendario-precos.md e execute a Fase 4"*.

## Ordem das fases

| Fase | Tela | Imagens |
|------|------|---------|
| 0 | Prompt Mestre (design system) | 0 |
| 1 | Landing page pública do pacote | 3 |
| 2 | Wizard de criação de anúncio (3 etapas) | 20 |
| 3 | Resumo/revisão do anúncio | 3 |
| 4 | Calendário, preços e disponibilidade | 19 |
| 5 | Editor de anúncio "Seu espaço" | 18 (+2 opcionais) |
| 6 | Guia de chegada | 17 |
| 7 | Mensagens / inbox | 4 |
| 8 | Preferências, políticas e conta | 24 (2 mensagens) |
| 9 | Growth Partner (dashboard) | 1 |

## Integração com o monorepo RSV360

O código do v0 usa mocks tipados em `/lib/mock-data.ts`. Após validar cada tela, a tarefa (no Cursor AI) é trocar os mocks por chamadas à API Express do monorepo RSV360.

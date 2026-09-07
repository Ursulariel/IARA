# IARA

Interface inicial da IARA, uma assistente para apoiar professores no planejamento, na criação de atividades e na exploração de habilidades da BNCC.

O projeto usa Next.js 16, TypeScript, Tailwind CSS e shadcn/ui. A interface adota Reddit Sans e Reddit Mono, com ícones Solar e Tabler.

## Desenvolvimento

Requer Node.js 20.9 ou superior.

```bash
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A rota raiz redireciona para `/inicio`.

## Verificação

```bash
npm run typecheck
npm run lint
npm run build
```

## Estrutura principal

- `app/inicio`: tela inicial, ações rápidas e área de modelos.
- `components/creation-actions.tsx`: navegação entre Início e Modelos.
- `components/model-explorer.tsx`: filtros, tópicos da BNCC e modelos de atividades.
- `data/bncc-topics.json`: catálogo usado pelos filtros de Língua Portuguesa, Matemática e Produção textual.
- `scripts/generate-bncc-topics.mjs`: gerador do catálogo a partir de uma exportação estruturada da BNCC.

Para atualizar o catálogo, informe o arquivo-fonte e, opcionalmente, o arquivo de saída:

```bash
node scripts/generate-bncc-topics.mjs caminho/para/ensino-fundamental.json data/bncc-topics.json
```

## shadcn/ui

O projeto usa o preset Vega. Para adicionar componentes:

```bash
npx shadcn@latest add <componente>
```

## Publicação

Repositório: [dgnprototype/Iara](https://github.com/dgnprototype/Iara).

Na Vercel, use o framework Next.js, diretório raiz `./` e os comandos padrão. O projeto não exige variáveis de ambiente nesta fase.

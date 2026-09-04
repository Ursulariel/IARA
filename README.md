# IARA

Base inicial da IARA em Next.js, TypeScript, Tailwind CSS e shadcn/ui. A página inicial está intencionalmente em branco.

## Desenvolvimento

Requer Node.js 20.9 ou superior.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. A página inicial está em `app/page.tsx`.

```bash
npm run build
npm run start
npm run lint
npm run typecheck
```

## shadcn/ui

Preset: `b1ZQ9FMEi` — Base UI, estilo Maia, base Mist, destaque laranja, fonte Inter e ícones Tabler. As configurações ficam em `components.json` e as variáveis de tema em `app/globals.css`.

O projeto foi gerado pelo CLI oficial com o preset e o template Next. Foi utilizado `npx` porque o cache local do `pnpm dlx` falhou; o gerenciador deste repositório é npm e o lockfile é `package-lock.json`.

Para adicionar componentes:

```bash
npx shadcn@latest add dialog
```

O registro oficial do shadcn já está disponível. `@acme` e `https://acme.com/r/{name}.json` são exemplos da documentação; configure um registro adicional apenas quando houver um endereço real.

## MCP no Codex

Em `~/.codex/config.toml`:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

Reinicie o Codex após adicionar o servidor para carregar as ferramentas MCP.

## Publicação

Repositório: https://github.com/dgnprototype/Iara

Na Vercel, use o framework Next.js, diretório raiz `./` e os comandos padrão. Esta base não exige variáveis de ambiente. Integrações de IA e autenticação serão implementadas nas próximas etapas.

Referências: [shadcn CLI](https://ui.shadcn.com/docs/cli), [shadcn MCP](https://ui.shadcn.com/docs/mcp) e [Codex MCP](https://developers.openai.com/codex/mcp/).

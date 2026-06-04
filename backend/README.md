# Financy — Backend

API GraphQL para gerenciamento financeiro pessoal.

## Tecnologias

- **TypeScript** + **Node.js**
- **Apollo Server 5** + **type-graphql**
- **Prisma 7** ORM com **SQLite** (via better-sqlite3)
- **JWT** para autenticação
- **Express 5** como servidor HTTP

## Pré-requisitos

- Node.js >= 24
- pnpm (recomendado) ou npm

## Instalação e execução

```bash
cp .env.example .env
# Preencher JWT_SECRET e DATABASE_URL

pnpm install
pnpm run prisma:deploy   # cria o banco e aplica migrations
pnpm run dev
```

> API disponível em `http://localhost:4000/graphql`

## Variáveis de ambiente

```
JWT_SECRET=sua_chave_secreta
DATABASE_URL=file:./prisma/dev.db
PORT=4000
```

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm run dev` | Servidor de desenvolvimento (hot reload) |
| `pnpm run build` | Compila TypeScript para `dist/` |
| `pnpm run start` | Inicia o servidor compilado (produção) |
| `pnpm run prisma:deploy` | Cria/atualiza o banco (produção) |
| `pnpm run prisma:migrate` | Cria nova migration (desenvolvimento) |
| `pnpm run prisma:generate` | Regenera o Prisma Client |

## Deploy

```bash
pnpm install
pnpm run build
pnpm run prisma:deploy
pnpm run start
```

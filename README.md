# Financy

Aplicação fullstack de gerenciamento financeiro pessoal, desenvolvida como desafio de pós-graduação.

## Objetivo

Permitir que o usuário organize suas finanças criando categorias e registrando transações de entrada e saída, com visão consolidada no dashboard.

## Tecnologias

### Backend
- **TypeScript** + **Node.js**
- **GraphQL** com Apollo Server 5 e type-graphql
- **Prisma** ORM com banco de dados **SQLite**
- **JWT** para autenticação

### Frontend
- **React** + **TypeScript** + **Vite**
- **Apollo Client 4** para comunicação GraphQL
- **Zustand** para gerenciamento de sessão
- **React Router 7** com rotas públicas e privadas
- **CSS Modules**

## Funcionalidades

- Cadastro e login de usuário com JWT
- Cada usuário acessa apenas seus próprios dados
- CRUD completo de **categorias** (título, ícone, cor)
- CRUD completo de **transações** (descrição, valor, tipo, data, categoria)
- **Dashboard** com saldo total, receitas, despesas e resumo por categoria
- Filtros de transação por texto, tipo, categoria e período
- Atualização de perfil (nome e senha)

## Estrutura

```
/
├── backend/   # API GraphQL
└── frontend/  # Aplicação React
```

## Como executar

### Backend

```bash
cd backend
cp .env.example .env   # preencher JWT_SECRET e DATABASE_URL
npm install            # ou pnpm install
npx prisma migrate dev
npm run dev
```

> Servidor disponível em `http://localhost:4000/graphql`

### Frontend

```bash
cd frontend
cp .env.example .env   # preencher VITE_BACKEND_URL=http://localhost:4000
npm install
npm run dev
```

> Aplicação disponível em `http://localhost:5173`

## Variáveis de ambiente

### Backend (`.env`)
```
JWT_SECRET=sua_chave_secreta
DATABASE_URL=file:./prisma/dev.db
PORT=4000
```

### Frontend (`.env`)
```
VITE_BACKEND_URL=http://localhost:4000
```

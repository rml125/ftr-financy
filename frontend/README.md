# Financy — Frontend

Aplicação React para gerenciamento financeiro pessoal, integrada à API GraphQL do Financy.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite 8** como bundler
- **Apollo Client 4** para comunicação GraphQL
- **Zustand 5** para gerenciamento de sessão
- **React Router 7** com rotas públicas e privadas
- **CSS Modules** para estilização

## Pré-requisitos

- Node.js >= 22
- Backend do Financy rodando (ver `../backend`)

## Instalação e execução

```bash
cp .env.example .env
# Editar .env com a URL do backend

npm install
npm run dev
```

> Disponível em `http://localhost:5173`

## Variáveis de ambiente

```
VITE_BACKEND_URL=http://localhost:4000
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Prévia do build local |
| `npm run lint` | Verificação de lint |

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Login (deslogado) ou Dashboard (logado) |
| `/register` | Cadastro |
| `/dashboard` | Visão geral das finanças |
| `/transactions` | Listagem e gestão de transações |
| `/categories` | Listagem e gestão de categorias |
| `/profile` | Edição de perfil |

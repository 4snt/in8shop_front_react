# In8shop Frontend

**Parte 2 de 3 do Desafio Técnico da In8**

Este repositório contém o frontend da In8shop, construído com **Next.js (App Router)** e **Tailwind CSS**, além de um backend opcional em NestJS para unificação de APIs e registro de pedidos.

---

## 📝 Requisitos do Desafio

### Itens obrigatórios (React/Flutter)

| Requisito                                       |   Implementado    |
| ----------------------------------------------- | :---------------: |
| Interface web com React                         |         ✔         |
| Listagem de produtos de dois fornecedores       |         ✔         |
| Busca de produtos                               |         ✔         |
| Filtro de produtos (categoria, preço, desconto) |         ✔         |
| Carrinho de compras (adicionar/remover)         |         ✔         |
| Finalização da compra com formulário            |         ✔         |
| Registro de compras                             |         ✔         |
| **App mobile com Flutter**                      | outro repositorio |

> **Observação**: a parte mobile com Flutter não foi implementada nesta entrega.

### Itens opcionais

| Requisito                                          | Implementado |
| -------------------------------------------------- | :----------: |
| Backend em Node.js (NestJS) com endpoint unificado |      ✔       |
| Endpoint unificado de produtos (2 APIs externas)   |      ✔       |
| Persistência de pedidos em banco via API           |      ✔       |

---

## ✨ Funcionalidades Entregues

- **Catálogo de produtos**

  - Integração com duas APIs externas (Brasil e Europa) via backend NestJS
  - Endpoint unificado: `GET /api/products?...`

- **Busca e filtros**

  - Componente `SearchBar`
  - `FilterDrawer` para provider, category, price range e hasDiscount
  - Paginação com componente `Pagination`

- **Carrinho de compras**

  - `CartProvider` para estado global (itens, total)
  - `FloatingCartDrawer` para visualização do carrinho

- **Checkout**

  - `CheckoutForm` com validações
  - Server Action `placeOrder()` → `POST /api/orders`

- **Autenticação**

  - `AuthProvider` gerencia login/register com JWT em cookie HTTP-only
  - Proteção de rotas e Server Actions que leem cookie

- **Meus Pedidos**

  - Listagem (`/my-orders`) via Server Action `getMyOrders()`
  - Detalhe (`/order/[id]`) com GIF de conclusão e redirecionamento em 5s
  - Confirmação de pagamento (`/payment`) com `confirmOrder()`

- **Backend NestJS**
  - Endpoints de produtos e pedidos
  - Prisma ORM para persistência de dados

---

## 🚀 Instalação & Execução

1. **Clone & instale dependências**

   ```bash
   git clone https://github.com/4snt/in8shop_front_react
   cd in8shop_frontend
   npm install
   ```

2. **Variáveis de ambiente**  
   Crie `.env.local` na raiz:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   BACKEND_URL=http://localhost:8080
   ```

3. **Backend (NestJS)**

   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm run start:dev
   ```

   O backend ficará disponível em `http://localhost:8080`.

4. **Frontend (Next.js)**

   ```bash
   cd in8shop_frontend
   npm run dev
   ```

   Acesse `http://localhost:3000`.

5. **Build & Start em Produção**

   ```bash
   npm run build
   npm start
   ```

6. **Lint & Qualidade**

   ```bash
   npm run lint
   ```

7. **Commit & Release**
   ```bash
   npm run commit
   npm run release
   ```

---

## 🗂️ Estrutura do Projeto

```text
src/
├── app
│   ├── actions         # Server Actions (auth, products, orders, checkout)
│   ├── my-orders       # /my-orders: listagem de pedidos
│   ├── order/[id]      # /order/:id: detalhe de pedido
│   ├── payment         # /payment: confirmação de pagamento
│   ├── product/[id]    # /product/:id: detalhe de produto
│   ├── cart            # /cart: carrinho em drawer
│   ├── checkout        # /checkout: formulário de compra
│   ├── login           # /login: LoginForm
│   ├── register        # /register: RegisterForm
│   └── ...             # Home, produtos, pesquisa, filtros
├── components          # UI components (Navbar, Cart, Forms, Products, Footer)
├── Providers           # Contextos (AuthProvider, CartProvider, ThemeContext)
├── hooks               # Hooks (useCart, useCartDrawer)
├── types               # DTOs e interfaces (order.ts, product.ts, SearchParams.ts)
└── utils               # Utils (formatPrice, getApiUrl, SearchParamsParser, etc.)
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev       # Frontend development
npm run build     # Production build
npm start         # Start SSR server
npm run lint      # Lint code
npm run commit    # Commit semântico
npm run release   # Release & CHANGELOG
```

---

## 🤝 Contribuição

1. Fork & clone este repositório
2. `git checkout -b feature/xxx`
3. Codifique e valide com `npm run lint`
4. Faça commit com `npm run commit`
5. Abra Pull Request para revisão

**Desenvolvido por Murilo Santiago**

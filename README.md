# In8shop Frontend

**Parte 2 de 3 do Desafio Técnico da In8**

Este repositório contém o frontend da In8shop, construído com Next.js (App Router) e Tailwind CSS. Aqui você encontra:

- Catálogo de produtos, filtros e busca
- Carrinho de compras com contexto React
- Checkout com formulário e integração com o backend
- Autenticação (login/registro) com JWT via cookie HTTP-only
- Módulo “Meus Pedidos” (listagem e detalhe de pedidos)

---

## 📦 Instalação & Execução

1. **Clone o repositório e instale dependências**

   ```bash
   git clone <seu-repo-url>
   cd in8shop_frontend
   npm install
   ```

2. **Configurar variáveis de ambiente**  
   Crie um arquivo `.env.local` na raiz com:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   BACKEND_URL=http://localhost:8080
   # Em produção, aponte para:
   # NEXT_PUBLIC_API_URL e BACKEND_URL=https://backend-in8-nest-production.up.railway.app
   ```

3. **Rodar em desenvolvimento**

   ```bash
   npm run dev
   ```

   Acesse em `http://localhost:3000`.

4. **Build & Start em produção**

   ```bash
   npm run build
   npm start
   ```

5. **Lint & Qualidade de código**

   ```bash
   npm run lint
   ```

6. **Commit semântico & Release**
   ```bash
   npm run commit    # Commitizen com Conventional Commits e emojis
   npm run release   # Gera CHANGELOG.md e incrementa versão
   ```

---

## 🗂️ Estrutura do Projeto

Execute no PowerShell:

```powershell
tree src /F /A
```

```
+---app
|   |   favicon.ico
|   |   globals.css
|   |   layout.tsx
|   |   page.tsx
|   |
|   +---actions
|   |       auth.ts
|   |       confirmOrder.ts
|   |       myOrders.ts
|   |       placeOrder.ts
|   |       products.ts
|   |
|   +---cart
|   |       page.tsx
|   |
|   +---checkout
|   |       page.tsx
|   |
|   +---login
|   |       page.tsx
|   |
|   +---my-orders
|   |       page.tsx
|   |
|   +---order
|   |   \---[id]
|   |           page.tsx
|   |
|   +---payment
|   |       page.tsx
|   |
|   +---product
|   |   \---[productId]
|   |           page.tsx
|   |
|   \---register
|           page.tsx
|
+---components
|   |   Button.tsx
|   |   Container.tsx
|   |   FormWrap.tsx
|   |   HomeBanner.tsx
|   |
|   +---Cart
|   |       CartClient.tsx
|   |       FloatingCartDrawer.tsx
|   |       ItemContent.tsx
|   |
|   +---checkout
|   |       CheckoutClient.tsx
|   |
|   +---footer
|   |       Footer.tsx
|   |       Footerlist.tsx
|   |
|   +---Forms
|   |       CheckoutForm.tsx
|   |       LoginForm.tsx
|   |       RegisterForm.tsx
|   |
|   +---inputs
|   |       Input.tsx
|   |
|   +---Navbar
|   |       BackDrop.tsx
|   |       CartCount.tsx
|   |       MenuItem.tsx
|   |       Navbar.tsx
|   |       ThemeSwitch.tsx
|   |       UserMenu.tsx
|   |
|   \---products
|           Avatar.tsx
|           FilterDrawer.tsx
|           Heading.tsx
|           Pagination.tsx
|           ProductCard.tsx
|           ProductDetails.tsx
|           ProductGrid.tsx
|           ProductImage.tsx
|           SearchBar.tsx
|           SetColor.tsx
|           setQuantity.tsx
|
+---hooks
|       useCart.tsx
|       useCartDrawer.tsx
|
+---Providers
|       AuthProvider.tsx
|       CartProvider.tsx
|       ThemeContext.tsx
|
+---types
|       next-auth.d.ts
|       order.ts
|       product.ts
|       SearchParams.ts
|
\---utils
        authClient.ts
        formatPrice.ts
        getApiUrl.ts
        SearchParamsParser.ts
        truncateTex.ts
        url.ts
        useInvertedThemeColors.ts
```

---

## 🔄 Wrappers & Contextos

- **AuthProvider**: gerencia estado do usuário, métodos de login/logout e expõe `currentUser`.
- **CartProvider**: mantém estado do carrinho (itens, quantidade, total) e funções de adicionar/remover.
- **ThemeContext**: controla alternância de temas light/dark, persistindo preferência em `localStorage`.

---

## ✨ Componentização & Tailwind CSS

- Componentes modulares em `src/components/`, organizados por domínio (Navbar, Forms, Cart, Products).
- Estilização com classes utilitárias do **Tailwind CSS** (responsividade, cores, tipografia).
- Imagens otimizadas com `<Image>` do `next/image` e carga prioritária para GIFs importantes.

---

## 📖 Fluxo “Meus Pedidos”

1. **Listagem** (`/my-orders`)

   - Server Action `getMyOrders()` lê cookie, chama `GET /api/orders`.
   - Renderiza tabela com ID, data (DD/MM/YYYY), total, status (badge) e link para detalhe.

2. **Detalhe** (`/order/[id]`)
   - Exibe GIF (`public/fim.png`), mensagem de conclusão e redireciona automaticamente para `/` em 5 segundos.

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev       # Desenvolvimento local
npm run build     # Build de produção
npm start         # Iniciar servidor produção
npm run lint      # Verificação de lint
npm run commit    # Commit semântico com emojis
npm run release   # Geração de changelog e bump de versão
```

---

## 🤝 Contribuição

1. Fork & clone.
2. `git checkout -b feature/xxx`.
3. Code & `npm run lint`.
4. `npm run commit`.
5. PR para revisão.

---

## 📝 Licença

MIT © 2025 In8 Solutions

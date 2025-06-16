# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/4snt/in8shop_front_react/compare/v0.1.11...v0.2.0) (2025-06-16)


### ⚠ BREAKING CHANGES

* **payment:** split payment page into SSR dynamic and client component" -m "BREAKING CHANGE: /payment route no longer supports static export; now uses server/page.tsx (dynamic) and client/PaymentClient.tsx for client hooks

### Features

* **payment:** split payment page into SSR dynamic and client component" -m "BREAKING CHANGE: /payment route no longer supports static export; now uses server/page.tsx (dynamic) and client/PaymentClient.tsx for client hooks ([0236083](https://github.com/4snt/in8shop_front_react/commit/02360831f006a0dad2b6c5b9f8304e7af6123a0f))

### [0.1.11](https://github.com/4snt/in8shop_front_react/compare/v0.1.10...v0.1.11) (2025-06-16)

### 0.1.10 (2025-06-16)


### Bug Fixes

* **checkout:** fix useState destructuring and add missing dependencies ([be588fb](https://github.com/4snt/in8shop_front_react/commit/be588fb6d64260067bfecab7485a08e25747014a))
* **checkout:** handle ESLint unused vars by rendering status ([c377547](https://github.com/4snt/in8shop_front_react/commit/c3775471610480b7ff921ec8f80fdfb3efd59162))
* **config:** remove dotenv import and improve image domains handling ([cd7a652](https://github.com/4snt/in8shop_front_react/commit/cd7a65237605cc477a578afe1827cf00309c4412))
* **home-page:** remover async desnecessário e corrigir tipagem de searchParams ([22513b3](https://github.com/4snt/in8shop_front_react/commit/22513b3eced910e3d569535deb327e4bfbee63d9))
* **home:** corrigir tipagem de searchParams para evitar erro de undefined ([c3fe0b6](https://github.com/4snt/in8shop_front_react/commit/c3fe0b683b02823b88d525cf2d4125a740307265))
* **navbar:** corrige tipagem de searchParams e previne erro de undefined ([75d01a9](https://github.com/4snt/in8shop_front_react/commit/75d01a9243aeac05b3a9a160246531761daacad1))
* **navbar:** corrige tipagem de searchParams e previne erro de undefined ([4c16dad](https://github.com/4snt/in8shop_front_react/commit/4c16dada54960363e8bd15e64aa57c83abb31529))
* **navbar:** wrap navigation hooks in Suspense to comply with Next.js app router ([ae421c8](https://github.com/4snt/in8shop_front_react/commit/ae421c829f1be9e4e17f24c4212f87cbc3b3f026))
* **nextAuth:** Restauração do arquivo nextAuth ([d8832c1](https://github.com/4snt/in8shop_front_react/commit/d8832c143f5a790951a1a1e2b8588c24bc9cea70))
* **PageProductId:** fix type for production promise<> ([4180ccf](https://github.com/4snt/in8shop_front_react/commit/4180ccf8b6e2f96e78d0317b8a2f930494ebf331))
* **parser:** corrige fallback no SearchParamsParser e paginação sem page param ([8754089](https://github.com/4snt/in8shop_front_react/commit/87540895c54a4778892eace475580639367aaec8))
* **payment:** correct page props typing to fix build error ([584bbde](https://github.com/4snt/in8shop_front_react/commit/584bbde0d33eedb418064415ec9f6c125c3762a1))
* **payment:** fix page props typing to comply with Next.js App Router ([2e57e20](https://github.com/4snt/in8shop_front_react/commit/2e57e202ac016b08d8d2952c0dfa7bf16ef53332))
* **product:** rename PageProps to ProductPageProps to avoid Next.js type conflict ([38f7540](https://github.com/4snt/in8shop_front_react/commit/38f75409739bb374f0c573ce96018426b64a4212))
* **product:** rename PageProps to ProductPageProps to avoid Next.js type conflict ([6a9614f](https://github.com/4snt/in8shop_front_react/commit/6a9614f8773eba2ba64fdf546dcf9ffc8cbc6844))
* **rating:** add types for product and review to remove any ([e3490e9](https://github.com/4snt/in8shop_front_react/commit/e3490e967527e7affad564039957b4c42002c01c))
* **searchparms:** type criado e normalizado entre arquivos ([88079c0](https://github.com/4snt/in8shop_front_react/commit/88079c04b810588f3e90bcdc7aca002c86c184e1))
* **searchparms:** type criado e normalizado entre arquivos ([500699c](https://github.com/4snt/in8shop_front_react/commit/500699c7eaffebf32de5367d413c465f7dba8729))
* **searchparms:** type criado e normalizado entre arquivos ([6bff6a7](https://github.com/4snt/in8shop_front_react/commit/6bff6a7d7bef663bf821fac61c0bfe8adb6832a4))
* **style:** adição das cores da in8 ([0cc518f](https://github.com/4snt/in8shop_front_react/commit/0cc518f68dfd6d7fd043003f37a9bcef29818d1b))
* **tsconfig.json:** corrijindo tsconfig para build ([3a26ae2](https://github.com/4snt/in8shop_front_react/commit/3a26ae21ceaa1f9290c7c1aeafef0e24fec711d7))
* **tsconfig.json:** corrijindo tsconfig para build ([7338fce](https://github.com/4snt/in8shop_front_react/commit/7338fce2c823a833d7c58df5369fe7f157c484ea))
* **types:** remover tipagem incorreta com Promise em page props ([4df7f0f](https://github.com/4snt/in8shop_front_react/commit/4df7f0f9cb4760a34f27c5719f76311fdd9f51b9))
* **types:** remover tipagem incorreta com Promise em page props ([c118827](https://github.com/4snt/in8shop_front_react/commit/c11882731396b38bb2b42df114ad2de850c72235))

### [0.1.9](https://github.com/4snt/acheishop/compare/v0.1.8...v0.1.9) (2025-06-03)


### Features

* **auth:** 🎉 create secure and user-friendly RegisterForm ([c6f5fc5](https://github.com/4snt/acheishop/commit/c6f5fc58dd96eed79e77f397f8426b0cb3b3aabf))

### [0.1.8](https://github.com/4snt/acheishop/compare/v0.1.7...v0.1.8) (2025-05-28)

### [0.1.7](https://github.com/4snt/acheishop/compare/v0.1.6...v0.1.7) (2025-05-27)

### [0.1.6](https://github.com/4snt/acheishop/compare/v0.1.5...v0.1.6) (2025-05-26)

### [0.1.5](https://github.com/4snt/acheishop/compare/v0.1.4...v0.1.5) (2025-05-25)

### [0.1.4](https://github.com/4snt/acheishop/compare/v0.1.3...v0.1.4) (2025-05-25)

### [0.1.3](https://github.com/4snt/acheishop/compare/v0.1.2...v0.1.3) (2025-05-25)

### [0.1.2](https://github.com/4snt/acheishop/compare/v0.1.1...v0.1.2) (2025-05-25)

### 0.1.1 (2025-05-25)

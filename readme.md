# Lumi App 🌟⚡

![Lumi App](https://via.placeholder.com/800x400?text=Lumi+App)

## Demonstração 🖥️

Confira a aplicação em funcionamento: [Lumi App](https://lumi-invoice-app.vercel.app)

## Visão Geral 📊

O Lumi App é uma ferramenta poderosa para monitorar e gerenciar o consumo e os custos de energia. Com uma interface intuitiva, fornece insights valiosos sobre seus padrões de uso de energia e impacto financeiro.

## Funcionalidades 🚀

### Dashboard 📈

- Visualize o consumo total e a compensação
- Acompanhe métricas financeiras como valor total e economia GD
- Visualize resultados de energia e resultados financeiros ao longo do tempo

### Faturas 📄

- Liste todos os consumidores e suas faturas recentes
- Funcionalidade de filtro e busca
- Extração automática de dados de faturas carregadas
- Opção fácil de download de faturas

## Tecnologias usadas 💻

### Frontend

- TypeScript
- React
- Tailwind CSS

### Backend

- Node.js
- TypeScript
- Express
- Multer
- Cloudinary
- PDF Parser
- Zod

## Como rodar localmente 🖥️

Para começar com o Lumi App, siga estes passos:

Nota: Use o comando `cd` para navegar entre os diretórios. Por exemplo, `cd nome-do-diretorio` para entrar em um diretório e `cd ..` para voltar um diretório.

1. Clone o repositório

   ```
   git clone https://github.com/jm4rcos/invoices.git
   ```

2. Instale as dependências do backend

   ```
   cd invoices/backend
   npm install
   ```

3. Instale as dependências do frontend

   ```
   cd frontend
   npm install
   ```

4. Configure as variáveis de ambiente

   No backend crie um arquivo com o nome ".env" e insira:

   ```
   DATABASE_URL="Sua connection string para o postgres"
   CLOUDINARY_CLOUD_NAME=cloudinaryName
   CLOUDINARY_API_KEY=cloudinaryApiKey
   CLOUDINARY_API_SECRET=cloudinaryApiSecret
   ```

   Para obter as chaves do Cloudinary:

   - Crie uma conta no [Cloudinary](https://cloudinary.com/)
   - Acesse o console em console.cloudinary.com
   - Vá para Configurações > Access Keys para encontrar suas chaves

   No frontend também é necessário a criação de ".env":

   ```
   VITE_API_URL=http://localhost:3333/api
   ```

5. Execute o servidor de desenvolvimento

   Para o backend:

   ```
   cd backend
   npm run dev
   ```

   Para o frontend:

   ```
   cd frontend
   npm run dev
   ```

6. Acesse o aplicativo localmente em `http://localhost:5173`

Feliz monitoramento! 🌿💡

---

Desenvolvido por João Marcos e 23 xícaras de café ☕

# 🖥️ Frontend (React)

Esta é a interface web para a aplicação, construída com React e Vite.

## Pré-requisitos

- **Node.js** (versão LTS)

## ⚙️ Configuração

### Variáveis de Ambiente (`.env`)
1.  Crie uma cópia do arquivo `.env.example` e renomeie-a para `.env`.
2.  Preencha as variáveis com as chaves do seu projeto Firebase.

    > Você pode encontrar essas chaves no **Console do Firebase** -> **Configurações do Projeto** (⚙️) -> **Geral** -> Role para baixo até "Seus apps" e selecione seu app da web.

#### `/.env.example`
```env
# URL para se conectar ao seu backend local
VITE_API_URL="http://localhost:3000/api"

# Chaves do Firebase para o cliente web
VITE_FIREBASE_API_KEY="SUA_CHAVE_API"
VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="SEU_ID_DE_PROJETO"
VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="SEU_APP_ID"
```

`VITE_API_URL`: Para desenvolvimento local, `http://localhost:3000/api` é o valor correto.

## 🚀 Instalação e Execução

Instale as dependências:
```bash
npm install
```

Garanta que o servidor backend (`receitas-backend`) já esteja rodando.

Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```

O site estará disponível no endereço que aparecer no seu terminal (geralmente `http://localhost:5173`).
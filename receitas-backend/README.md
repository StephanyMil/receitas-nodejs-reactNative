# ➡️ Backend (API Node.js)

Este é o servidor da API RESTful para a aplicação Meu Livro de Receitas, construído com Node.js e Express.

## Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **Docker Desktop** (para rodar o MongoDB)

## ⚙️ Configuração

Antes de iniciar o servidor, é necessário configurar as variáveis de ambiente e a chave de serviço do Firebase.

### 1. Chave de Serviço do Firebase (serviceAccountKey.json)

Este arquivo é **obrigatório** para a comunicação segura do backend com os serviços do Firebase (como a verificação de tokens de autenticação).

1. Vá para o **Console do Firebase** -> **Configurações do Projeto** (⚙️) -> **Contas de Serviço**.
2. Clique em **"Gerar nova chave privada"**.
3. Um arquivo JSON será baixado. Renomeie-o para `serviceAccountKey.json` e coloque-o na raiz desta pasta (`receitas-backend/`).

> **Atenção:** Este arquivo é secreto e já está no `.gitignore`. Nunca o envie para um repositório público.

### 2. Variáveis de Ambiente (.env)

1. Crie uma cópia do arquivo `.env.example` e renomeie-a para `.env`.
2. Preencha as variáveis no arquivo `.env` com seus próprios valores.

#### `/.env.example`
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/receitas
JWT_SECRET=gere_uma_chave_secreta_aqui
```

`MONGODB_URI`: Endereço de conexão do seu banco de dados MongoDB. O valor padrão funciona com a configuração do Docker abaixo.

`JWT_SECRET`: Uma string aleatória e segura para a assinatura de tokens. Você pode gerar uma com o comando: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 🚀 Instalação e Execução

Instale as dependências:
```bash
npm install
```

Inicie o container do MongoDB:

Se for a primeira vez, crie o container:
```bash
docker run -d --name meu-mongo -p 27017:27017 -v mongo-data:/data/db mongo
```

Se o container já existir, apenas inicie-o:
```bash
docker start meu-mongo
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em http://localhost:3000.
# 📱 Mobile (React Native)

Este é o aplicativo mobile para iOS e Android, construído com React Native e Expo.

## Pré-requisitos do Mobile
- **Node.js** (versão LTS)
- **Expo CLI** (`npm install -g expo-cli`)
- **App Expo Go** instalado no seu smartphone.

## ⚙️ Configuração do Mobile

**1. Variáveis de Ambiente (`.env`)**
1.  Navegue até a pasta `receitas-mobile`.
2.  Crie uma cópia do arquivo `.env.example` e renomeie-a para `.env`.
3.  Preencha as variáveis no `.env` com as chaves do seu projeto Firebase.

    > Você pode encontrar essas chaves no **Console do Firebase** -> **Configurações do Projeto** (⚙️) -> **Geral** -> Role para baixo até "Seus apps" e selecione seu app da web.

### `/receitas-mobile/.env.example`
```env
EXPO_PUBLIC_API_KEY="SUA_CHAVE_API"
EXPO_PUBLIC_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
EXPO_PUBLIC_PROJECT_ID="SEU_ID_DE_PROJETO"
EXPO_PUBLIC_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
EXPO_PUBLIC_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
EXPO_PUBLIC_APP_ID="SEU_APP_ID"

# URL para se conectar ao seu backend local
EXPO_PUBLIC_API_URL="http://SEU_IP_LOCAL:3000/api"
```
- `EXPO_PUBLIC_API_URL`: Substitua `SEU_IP_LOCAL` pelo endereço IPv4 do seu computador na sua rede Wi-Fi. (No Windows, use `ipconfig`; no macOS/Linux, use `ifconfig` ou `ip addr`).

## 🚀 Instalação e Execução do Mobile

1.  **Instale as dependências:**
    ```bash
    cd receitas-mobile
    npm install
    ```

2.  **Sincronize as versões das dependências do Expo (boa prática):**
    ```bash
    npx expo install --fix
    ```

3.  **Garanta que o servidor backend (`receitas-backend`) já esteja rodando.**

4.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start --clear
    ```

5.  Escaneie o QR Code que aparecer no terminal com o aplicativo **Expo Go** no seu celular.

> **Atenção:** Seu computador e seu celular devem estar conectados na **mesma rede Wi-Fi**.
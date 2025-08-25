# Meu Livro de Receitas (Aplicação Full-Stack)

Bem-vindo ao projeto Meu Livro de Receitas! Esta é uma aplicação completa (backend, frontend web e mobile) para gerenciar e organizar suas receitas favoritas.

## 📜 Sobre a Aplicação

Este repositório contém o código para uma plataforma de receitas com autenticação de usuários, onde é possível criar, visualizar, editar e deletar receitas, além de organizá-las por categorias.

O projeto é estruturado como um monorepo, contendo três subprojetos principais:
- **`receitas-backend`**: A API RESTful que gerencia toda a lógica de negócio.
- **`receitas-frontend`**: A interface web, construída em React, para interagir com a aplicação através de um navegador.
- **`receitas-mobile`**: O aplicativo para celulares (iOS e Android) construído com React Native e Expo.

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Login e registro utilizando o Firebase Authentication.
- **Gerenciamento de Receitas (CRUD):** Crie, visualize, edite e delete suas próprias receitas.
- **Gerenciamento de Categorias:** Crie e organize as receitas por categorias.
- **Interface Responsiva:** O frontend web foi projetado para funcionar bem em desktops e dispositivos móveis.

## 🚀 Tecnologias Utilizadas

### **Backend**
- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework para a construção da API.
- **MongoDB:** Banco de dados NoSQL para armazenar os dados.
- **Mongoose:** ODM para modelar os dados do MongoDB.
- **Docker:** Para rodar o banco de dados MongoDB em um container isolado.

### **Frontend (Web)**
- **React:** Biblioteca para a construção da interface de usuário.
- **Vite:** Ferramenta de build moderna e rápida.
- **React Router:** Para o gerenciamento de rotas (navegação).
- **Axios:** Cliente HTTP para comunicação com o backend.

### **Mobile**
- **React Native:** Framework para desenvolvimento de apps nativos.
- **Expo:** Plataforma e ferramentas para facilitar o desenvolvimento com React Native.
- **React Navigation:** Para o gerenciamento de rotas e navegação no app.

### **Autenticação e Serviços**
- **Firebase Authentication:** Serviço do Google para gerenciamento de login e autenticação de usuários.

## 🏁 Como Começar

Siga os passos abaixo para configurar e rodar a aplicação completa no seu ambiente de desenvolvimento.

### 1. Clone o Repositório
Primeiro, clone este repositório para a sua máquina local usando o seguinte comando:
```bash
git clone https://github.com/StephanyMil/receitas-nodejs-reactNative.git
cd receitas-nodejs-reactNative
```

### 2. Siga as Instruções de Cada Projeto
Cada parte da aplicação (backend, frontend e mobile) tem sua própria configuração e deve ser iniciada separadamente. Clique nos links abaixo para ver as instruções detalhadas em cada README.md específico:

➡️ [**Backend (API Node.js)**](https://github.com/StephanyMil/receitas-nodejs-reactNative/receitas-backend/README.md): Instruções para iniciar o servidor e o banco de dados.

🖥️ [**Frontend (React Web)**](https://github.com/StephanyMil/receitas-nodejs-reactNative/receitas-frontend/README.md): Instruções para iniciar a aplicação web.

📱 [**Mobile (React Native)**](https://github.com/StephanyMil/receitas-nodejs-reactNative/receitas-mobile/README.md): Instruções para iniciar o aplicativo mobile no Expo Go.
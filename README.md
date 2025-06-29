# equipe-13-backend-trilhas-desafio-5

Esta aplicação é uma API backend desenvolvida em Node.js para cadastro e autenticação de usuários, além de gerenciamento de unidades de saúde favoritas. Utilizando Firebase Firestore como banco de dados, ela permite que usuários se registrem, façam login com autenticação JWT e salvem ou consultem unidades de saúde favoritas. A API também oferece documentação interativa via Swagger, facilitando a integração com aplicações frontend.
---

## a) Instruções de Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/RuanSampaio-code/equipe-13-backend-trilhas-desafio-5.git
   cd equipe-13-backend-trilhas-desafio-5
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo .env na raiz do projeto.
   - Adicione:
     ```
     FIREBASE_CONFIG={"type":"service_account", ...}
     JWT_SECRET=sua_chave_secreta
     ```
   - O valor de `FIREBASE_CONFIG` deve ser o JSON das credenciais do Firebase.

---

## b) Instruções para Execução Local

1. **Inicie o servidor em modo desenvolvimento:**
   ```sh
   npm run dev
   ```
   Ou, para rodar normalmente:
   ```sh
   node index.js
   ```

2. **Acesse a API:**
   - Documentação Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Endpoints: [http://localhost:3000/](http://localhost:3000/)

---

## c) Documentação da API

### **Base URL**
- Local: `http://localhost:3000/`
- Produção: `https://equipe-13-backend-trilhas-desafio-5.onrender.com/`

---

### **Usuários**

#### 1. Registrar Usuário
- **POST `/register`**
- **Descrição:** Cadastra um novo usuário.
- **Body:**
  ```json
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "minhaSenhaSegura"
  }
  ```
- **Respostas:**  
  `201 Created` (sucesso), `400 Bad Request` (dados inválidos)

---

#### 2. Login
- **POST `/login`**
- **Descrição:** Realiza login e retorna um token JWT.
- **Body:**
  ```json
  {
    "email": "joao@email.com",
    "password": "minhaSenhaSegura"
  }
  ```
- **Respostas:**  
  `200 OK` (token JWT), `401 Unauthorized` (credenciais inválidas)

---

#### 3. Listar Usuários
- **GET `/users`**
- **Descrição:** Lista todos os usuários cadastrados.
- **Respostas:**  
  `200 OK` (lista de usuários)

---

### **Unidades de Saúde**

#### 4. Adicionar Unidade Favorita
- **POST `/favorites`**
- **Descrição:** Adiciona uma unidade de saúde aos favoritos do usuário.
- **Body:**
  ```json
  {
    "userId": "id_do_usuario",
    "name": "Unidade de Saúde X",
    "address": {
      "logradouro": "Rua Exemplo",
      "numero": "123",
      "bairro": "Centro",
      "cep": "12345-678",
      "estado": "SP"
    },
    "longitude": -46.123456,
    "latitude": -23.123456
  }
  ```
- **Respostas:**  
  `201 Created` (sucesso), `400 Bad Request` (dados obrigatórios ausentes)

---

#### 5. Listar Unidades Favoritas
- **GET `/favorites?userId=ID_DO_USUARIO`**
- **Descrição:** Lista todas as unidades favoritas do usuário.
- **Respostas:**  
  `200 OK` (lista de favoritas)

---

#### 6. Listar Todas as Unidades de Saúde
- **GET `/health-units`**
- **Descrição:** Lista todas as unidades de saúde cadastradas.
- **Respostas:**  
  `200 OK` (lista de unidades)

---

### **Swagger**
- Acesse a documentação interativa em:  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
  ou  
  [https://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs](https://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs)

---

Se precisar de exemplos de resposta ou detalhes de autenticação, só pedir!- **Respostas:**  
  `201 Created` (sucesso), `400 Bad Request` (dados obrigatórios ausentes)

---

#### 5. Listar Unidades Favoritas
- **GET `/favorites?userId=ID_DO_USUARIO`**
- **Descrição:** Lista todas as unidades favoritas do usuário.
- **Respostas:**  
  `200 OK` (lista de favoritas)

---

#### 6. Listar Todas as Unidades de Saúde
- **GET `/health-units`**
- **Descrição:** Lista todas as unidades de saúde cadastradas.
- **Respostas:**  
  `200 OK` (lista de unidades)

---

### **Swagger**
- Acesse a documentação interativa em:  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
  ou  
  [https://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs](https://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs)
## 2. Criação e Estruturação do Banco de Dados

### 2.1 Estrutura das Coleções e Documentos (Firestore)

### 📁 Coleção: `users`

- **Descrição:** Armazena os dados dos usuários cadastrados.
- **Exemplo de documento:**
    
    ```json
    {
      "name": "João Silva",
      "email": "joao@email.com",
      "password": "<senha_hash>",
      "createdAt": "2024-06-29T18:00:00.000Z"
    }
    
    ```
    
- **Campos:**
    - `name`: Nome do usuário (string)
    - `email`: Email do usuário (string, único)
    - `password`: Senha criptografada (string)
    - `createdAt`: Data de criação (timestamp)

---

### 📁 Coleção: `favorites`

- **Descrição:** Armazena unidades de saúde favoritas por usuário.
- **Exemplo de documento:**
    
    ```json
    
    {
      "userId": "id_do_usuario",
      "name": "Unidade de Saúde X",
      "address": {
        "logradouro": "Rua Exemplo",
        "numero": "123",
        "bairro": "Centro",
        "cep": "12345-678",
        "estado": "SP"
      },
      "longitude": -46.123456,
      "latitude": -23.123456,
      "createdAt": "2024-06-29T18:00:00.000Z"
    }
    
    ```
    
- **Campos:**
    - `userId`: ID do usuário (string)
    - `name`: Nome da unidade (string)
    - `address`: Objeto com logradouro, número, bairro, cep e estado
    - `longitude` e `latitude`: Coordenadas geográficas (number)
    - `createdAt`: Timestamp de criação

---

### 🔍 Observações Importantes

- Firestore é **NoSQL**, portanto:
    - A estrutura é criada dinamicamente com os documentos inseridos.
    - Não há necessidade de scripts `.sql`.
- Índices compostos podem ser exigidos para filtros por múltiplos campos (o console do Firebase indicará isso).
- O campo `userId` funciona como referência entre as coleções.

---

### 🧭 Resumo Visual

```

users (coleção)
 └── {userId} (documento)
      ├── name: string
      ├── email: string
      ├── password: string (hash)
      └── createdAt: timestamp

favorites (coleção)
 └── {favoriteId} (documento)
      ├── userId: string
      ├── name: string
      ├── address: objeto
      ├── longitude: number
      ├── latitude: number
      └── createdAt: timestamp

```
---


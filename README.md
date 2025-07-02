# equipe-13-backend-trilhas-desafio-5

### Esta aplicação é uma API backend desenvolvida em Node.js para cadastro e autenticação de usuários, além de gerenciamento de unidades de saúde favoritas. Utilizando Firebase Firestore como banco de dados, ela permite que usuários se registrem, façam login com autenticação JWT e salvem ou consultem unidades de saúde favoritas. A API também oferece documentação interativa via Swagger, facilitando a integração com aplicações frontend.
---
# No README

---

## a) Instruções de Instalação

1. **Clone o repositório:**
    
    ```
    git clone <https://github.com/RuanSampaio-code/equipe-13-backend-trilhas-desafio-5.git>
    cd equipe-13-backend-trilhas-desafio-5
    
    ```
    
2. **Instale as dependências:**
    
    ```
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
    
    ```
    npm run dev
    
    ```
    
    Ou, para rodar normalmente:
    
    ```
    node index.js
    
    ```
    
2. **Acesse a API:**
    - Documentação Swagger: http://localhost:3000/api-docs
    - Endpoints: http://localhost:3000/

---

## c) Documentação da API

### **Base URL**

- Local: `http://localhost:3000/`
- Produção: `https://equipe-13-backend-trilhas-desafio-5.onrender.com/`

---

### **Usuários**

### 1. Registrar Usuário

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
    
- **Respostas:**`201 Created` (sucesso), `400 Bad Request` (dados inválidos)

---

### 2. Login

- **POST `/login`**
- **Descrição:** Realiza login e retorna um token JWT.
- **Body:**
    
    ```json
    {
      "email": "joao@email.com",
      "password": "minhaSenhaSegura"
    }
    
    ```
    
- **Respostas:**`200 OK` (token JWT), `401 Unauthorized` (credenciais inválidas)

---

### 3. Listar Usuários

- **GET `/users`**
- **Descrição:** Lista todos os usuários cadastrados.
- **Respostas:**`200 OK` (lista de usuários)

---

### **Unidades de Saúde**

### 4. Adicionar Unidade Favorita

- **POST `/favorites`**
- **Descrição:** Adiciona uma unidade de saúde aos favoritos do usuário.
- **Body:**
    
    ```json
    {
    	"id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
    	"userId": "abc123",
    	"name": "Hospital Central",
    	"address": "Rua Exemplo, 123, Centro, São Paulo - SP",
    	"latitude": -23.55052,
    	"longitude": -46.633308,
    	"rating": 4.5,
    	"phoneNumber": "(11) 1234-5678",
    	"website": "[https://www.hospitalcentral.com](https://www.hospitalcentral.com/)",
    	"types": [
    	"hospital",
    	"health"
    	],
    	"addedAt": "2024-06-29T18:00:00.000Z"
    }
    ```
    
- **Respostas:**`201 Created` (sucesso), `400 Bad Request` (dados obrigatórios ausentes)

---

### 5. Listar Unidades Favoritas

- **GET `/favorites?userId=ID_DO_USUARIO`**
- **Descrição:** Lista todas as unidades favoritas do usuário.
- **Respostas:**`200 OK` (lista de favoritas)

---

### 6. Listar Todas as Unidades de Saúde

- **GET `/health-units`**
- **Descrição:** Lista todas as unidades de saúde cadastradas.
- **Respostas:**`200 OK` (lista de unidades)

---

### 7. Excluir favorita

- **DELETE `/favorites/{id}`**
- **Descrição:** exclui um favorito por id
- **Respostas:**`200 OK` (exclui favorito)

### **Swagger**

- Acesse a documentação interativa em:http://localhost:3000/api-docs
ouhttps://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs

---

Se precisar de exemplos de resposta ou detalhes de autenticação, só pedir!- **Respostas:**

`201 Created` (sucesso), `400 Bad Request` (dados obrigatórios ausentes)

---

### **Swagger**

- Acesse a documentação interativa em:http://localhost:3000/api-docs
ou
https://equipe-13-backend-trilhas-desafio-5.onrender.com/api-docs

---

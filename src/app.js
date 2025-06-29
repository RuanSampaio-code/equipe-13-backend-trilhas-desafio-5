import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// --- ORDEM CORRIGIDA DOS MIDDLEWARES ---
// 1. Habilita o CORS para todas as origens
app.use(cors());

// 2. Habilita o parser de JSON para ler o req.body
//    Isto DEVE vir antes do registro das rotas.
app.use(express.json());

// 3. Registra todas as suas rotas
routes(app);


// --- CONFIGURAÇÃO CORRIGIDA DO SWAGGER ---
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Trilhas de Desafio - Equipe 13',
    version: '1.0.0',
    description: 'Documentação da API do projeto final para o desafio 5.',
  },
  // Adicione a URL do seu servidor de produção aqui
  servers: [
    {
      url: 'https://equipe-13-backend-trilhas-desafio-5.onrender.com',
      description: 'Servidor de produção (Render)',
    },
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Verifique se este caminho está correto
};

const swaggerSpec = swaggerJSDoc(options);

// Rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de teste
app.get('/hello', (req, res) => {
  res.send('Olá mundo!');
});

// Rota raiz para redirecionar para a documentação
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


export default app;
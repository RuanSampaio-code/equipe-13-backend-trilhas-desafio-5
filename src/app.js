import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

app.use(cors());
routes(app);
app.use(express.json());

// Configuração Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Minha API com Swagger',
    version: '1.0.0',
    description: 'Documentação da API feita com Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/hello', (req, res) => {
  res.send('Olá mundo!');
});

export default app;

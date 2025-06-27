import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();


// Ativa o uso do CORS
app.use(cors()); // permite todas as origens (pode restringir depois se quiser)

routes(app);

app.use(express.json());


export default app;
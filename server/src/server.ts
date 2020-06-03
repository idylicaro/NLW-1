import path from 'path';
import express, { response } from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();

app.use(cors()); // para configura os dominios que vao ter acesso a aplicação
// fazendo com que o express entenda o JSON
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(3333);

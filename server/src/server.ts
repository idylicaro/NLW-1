import path from 'path';
import express, { response } from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors()); // para configura os dominios que vao ter acesso a aplicação
// fazendo com que o express entenda o JSON
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);

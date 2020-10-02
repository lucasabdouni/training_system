import { Router } from 'express';

import tecnicosRouter from './tecnicos.routes';
import sessionsRouter from './sessions.routes';
import funcionariosRouter from './funcionarios.routes';
import cursosRouter from './cursos.routes';
import TreinamentosRouter from './treinamentos.routes';

const routes = Router();

routes.use('/tecnicos', tecnicosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/funcionarios', funcionariosRouter);
routes.use('/cursos', cursosRouter);
routes.use('/treinamento', TreinamentosRouter);

export default routes;

import { response, Router } from 'express';
import SessionsTecnicosController from '../app/controllers/SessionsTecnicosController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { matricula, password } = request.body;
    const sessionsTecnicosController = new SessionsTecnicosController();
    const { tec, token } = await sessionsTecnicosController.store({
      matricula,
      password,
    });

    delete tec.password;

    return response.json({ tec, token });
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

export default sessionsRouter;

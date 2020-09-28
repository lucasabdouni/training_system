import { Router } from 'express';
import { getRepository } from 'typeorm';

import TecnicosController from '../app/controllers/TecnicosController';
import Tecnicos from '../app/models/Tecnicos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const tecnicosRouter = Router();

tecnicosRouter.post('/', async (request, response) => {
  try {
    const { nome, matricula, password } = request.body;

    const tecnicosController = new TecnicosController();

    const tec = await tecnicosController.store({
      nome,
      matricula,
      password,
    });

    delete tec.password;

    return response.json(tec);
  } catch (erro) {
    return response.json(400).json({ error: erro.message });
  }
});

tecnicosRouter.get('/', ensureAuthenticated, async (request, response) => {
  const tecnicosRepositorio = getRepository(Tecnicos);
  const tec = await tecnicosRepositorio.find();
  for (const i in tec) {
    delete tec[i].password;
  }
  return response.json(tec);
});

tecnicosRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const tecnicosRepositorio = getRepository(Tecnicos);
  const { id } = request.params;
  const tec = await tecnicosRepositorio.findOne(id);
  delete tec.password;
  return response.json(tec);
});

tecnicosRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const tecnicosRepositorio = getRepository(Tecnicos);
    const { id } = request.params;
    const tec = await tecnicosRepositorio.delete(id);
    return response.status(204).send();
  },
);

export default tecnicosRouter;

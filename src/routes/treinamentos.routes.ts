import { Router } from 'express';
import { getRepository } from 'typeorm';
import TreinamentosController from '../app/controllers/TreinamentosController';
import Treinamentos from '../app/models/Treinamentos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const treinamentosRouter = Router();

treinamentosRouter.post('/', ensureAuthenticated, async (request, response) => {
  const treinamentosController = new TreinamentosController();
  try {
    const { id_funcionario, id_curso, data_treinamento } = request.body;
    const treinamentos = await treinamentosController.store({
      id_funcionario,
      id_curso,
      data_treinamento,
    });
    return response.json(treinamentos);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

treinamentosRouter.get('/', ensureAuthenticated, async (request, response) => {
  const treinamentosRepositorio = getRepository(Treinamentos);
  const treinamentos = await treinamentosRepositorio.find();
  return response.json(treinamentos);
});

treinamentosRouter.get(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const treinamentosRepositorio = getRepository(Treinamentos);
    const { id } = request.params;
    const treinamentos = await treinamentosRepositorio.findOne(id);
    return response.json(treinamentos);
  },
);

treinamentosRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const treinamentosRepositorio = getRepository(Treinamentos);
    const { id } = request.params;
    const treinamentos = await treinamentosRepositorio.delete(id);
    return response.status(204).send();
  },
);

export default treinamentosRouter;

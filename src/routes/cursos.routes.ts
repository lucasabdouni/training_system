import { Router } from 'express';
import { getRepository } from 'typeorm';

import CursosController from '../app/controllers/CursosController';
import Cursos from '../app/models/Cursos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const cursosRouter = Router();

cursosRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { nome, carga_horaria } = request.body;
    const cursosController = new CursosController();
    const curso = await cursosController.store({
      nome,
      carga_horaria,
    });

    return response.json(curso);
  } catch (erro) {
    return response.json(400).json({ error: erro.message });
  }
});

cursosRouter.get('/', ensureAuthenticated, async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const curso = await cursosRepositorio.find();
  return response.json(curso);
});

cursosRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  const curso = await cursosRepositorio.findOne(id);
  return response.json(curso);
});

cursosRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  const curso = await cursosRepositorio.delete(id);
  return response.status(204).send();
});

export default cursosRouter;

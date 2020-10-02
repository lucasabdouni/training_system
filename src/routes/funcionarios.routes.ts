import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import AvatarFuncionariosController from '../app/controllers/AvatarFuncionariosController';

const funcionariosRouter = Router();
const upload = multer(uploadConfig);

funcionariosRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { nome, email } = request.body;
    const funcionariosController = new FuncionariosController();
    const func = await funcionariosController.store({
      nome,
      email,
    });

    return response.json(func);
  } catch (erro) {
    return response.json(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', ensureAuthenticated, async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const func = await funcionariosRepositorio.find();
  return response.json(func);
});

funcionariosRouter.get(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const func = await funcionariosRepositorio.findOne(id);
    return response.json(func);
  },
);

funcionariosRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const func = await funcionariosRepositorio.delete(id);
    return response.status(204).send();
  },
);

funcionariosRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const avatarFuncionariosController = new AvatarFuncionariosController();
      const func = await avatarFuncionariosController.update({
        func_id: request.query,
        avatarFileName: request.file.filename,
      });
      console.log(request.file);
      return response.json(func);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default funcionariosRouter;

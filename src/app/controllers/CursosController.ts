import { getRepository } from 'typeorm';

import Cursos from '../models/Cursos';

interface Request {
  nome: string;
  carga_horaria: string;
}

class CursosController {
  public async store({ nome, carga_horaria }: Request): Promise<Cursos> {
    const cursosRepository = getRepository(Cursos);

    const verificaCursoExiste = await cursosRepository.findOne({
      where: { nome },
    });

    if (verificaCursoExiste) {
      throw new Error('Curso já cadastrado');
    }

    const curso = cursosRepository.create({
      nome,
      carga_horaria,
    });

    await cursosRepository.save(curso);
    return curso;
  }
}

export default CursosController;

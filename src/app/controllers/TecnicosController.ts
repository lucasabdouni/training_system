import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Tecnicos from '../models/Tecnicos';

interface Request {
  nome: string;
  matricula: string;
  password: string;
}

class TecnicosController {
  public async store({
    nome,
    matricula,
    password,
  }: Request): Promise<Tecnicos> {
    const tecnicosRepository = getRepository(Tecnicos);

    const verificaTecnicoExiste = await tecnicosRepository.findOne({
      where: { matricula },
    });

    if (verificaTecnicoExiste) {
      throw new Error('Matricula já cadastrada');
    }

    const hashedPassword = await hash(password, 8);

    const tec = tecnicosRepository.create({
      nome,
      matricula,
      password: hashedPassword,
    });

    await tecnicosRepository.save(tec);

    return tec;
  }
}

export default TecnicosController;

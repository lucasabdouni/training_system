import { getRepository } from 'typeorm';

import Funcionarios from '../models/Funcionarios';

interface Request {
  nome: string;
  email: string;
}

class FuncionariosController {
  public async store({ nome, email }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);

    const verificaFuncionarioExiste = await funcionariosRepository.findOne({
      where: { email },
    });

    if (verificaFuncionarioExiste) {
      throw new Error('Funcionario já cadastrado');
    }

    const func = funcionariosRepository.create({
      nome,
      email,
    });

    await funcionariosRepository.save(func);
    return func;
  }
}
export default FuncionariosController;

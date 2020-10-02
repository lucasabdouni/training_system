import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Tecnicos from '../models/Tecnicos';
import authConfig from '../../config/auth';
import auth from '../../config/auth';

interface Request {
  matricula: string;
  password: string;
}

interface Response {
  user: Tecnicos;
  token: string;
}

class SessionsTecnicosController {
  public async store({ matricula, password }: Request): Promise<Response> {
    const tecnicosRepository = getRepository(Tecnicos);
    const tec = await tecnicosRepository.findOne({ where: { matricula } });

    if (!tec) {
      throw new Error('Combinação de matricula/senha incorretos');
    }

    const verifySenha = await compare(password, tec.password);

    if (!verifySenha) {
      throw new Error('Combinação de matricula/senha incorretos');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: tec.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      tec,
      token,
    };
  }
}

export default SessionsTecnicosController;

import { getRepository } from 'typeorm';
import { startOfHour, parseISO, addHours } from 'date-fns';
import Cursos from '../models/Cursos';
import Funcionarios from '../models/Funcionarios';
import Treinamentos from '../models/Treinamentos';

interface Request {
  id_funcionario: string;
  id_curso: string;
  data_treinamento: string;
}

class TreinamentosController {
  public async store({
    id_funcionario,
    id_curso,
    data_treinamento,
  }: Request): Promise<Treinamentos> {
    const funcionariosRepository = getRepository(Funcionarios);
    const cursosRepository = getRepository(Cursos);
    const id = id_funcionario;
    const id_c = id_curso;
    const treinamentosRepository = getRepository(Treinamentos);

    const funcionarios = await funcionariosRepository.findOne(id);

    if (!funcionarios) {
      throw new Error('Funcionario Invalido');
    }

    const cursos = await cursosRepository.findOne(id_c);

    if (!cursos) {
      throw new Error('Cursos Invalido');
    }

    const DataTreinamento = startOfHour(parseISO(data_treinamento));
    const VencimentoTreinamento = addHours(
      DataTreinamento,
      cursos.carga_horaria,
    );

    const treinamento = treinamentosRepository.create({
      id_funcionario,
      id_curso,
      data_treinamento: DataTreinamento,
      vencimento: VencimentoTreinamento,
    });

    await treinamentosRepository.save(treinamento);

    return treinamento;
  }
}

export default TreinamentosController;

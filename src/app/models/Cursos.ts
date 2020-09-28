import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('cursos')
class Cursos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  carga_horaria: string;
}

export default Cursos;

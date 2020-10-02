import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tecnicos')
class Tecnicos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  matricula: string;

  @Column()
  password: string;
}

export default Tecnicos;

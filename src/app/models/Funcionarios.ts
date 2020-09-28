import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('funcionarios')
class Funcionarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  avatar: string;
}

export default Funcionarios;

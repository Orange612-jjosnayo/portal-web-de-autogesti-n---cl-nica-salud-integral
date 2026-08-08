import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tipoSangre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactoEmergencia: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @OneToOne(() => User, (user) => user.paciente)
  @JoinColumn()
  user: User;
}

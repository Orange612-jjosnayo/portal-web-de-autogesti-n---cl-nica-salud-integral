import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Paciente } from './paciente.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombreCompleto: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  documentoIdentidad: string;

  @Column({ type: 'varchar', length: 50, default: 'paciente' })
  role: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @OneToOne(() => Paciente, (paciente) => paciente.user, { cascade: true })
  paciente: Paciente;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Paciente } from './entities/paciente.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByDocumento(documentoIdentidad: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { documentoIdentidad } });
  }

  async create(registerDto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const existingEmail = await this.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const existingDoc = await this.findByDocumento(registerDto.documentoIdentidad);
    if (existingDoc) {
      throw new ConflictException('El documento de identidad ya está registrado');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const newUser = this.userRepository.create({
      nombreCompleto: registerDto.nombreCompleto,
      documentoIdentidad: registerDto.documentoIdentidad,
      email: registerDto.email,
      passwordHash,
      role: 'paciente',
    });

    const paciente = this.pacienteRepository.create();
    newUser.paciente = paciente;

    await this.userRepository.save(newUser);

    // Omitir el hash en la respuesta
    const { passwordHash: _, ...result } = newUser;
    return result;
  }
}
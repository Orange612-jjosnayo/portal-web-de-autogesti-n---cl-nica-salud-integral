import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(registerDto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const newUser = this.userRepository.create({
      nombreCompleto: registerDto.nombreCompleto,
      email: registerDto.email,
      passwordHash,
    });

    await this.userRepository.save(newUser);

    // Omitir el hash en la respuesta
    const { passwordHash: _, ...result } = newUser;
    return result;
  }
}
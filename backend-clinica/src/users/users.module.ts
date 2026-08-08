import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Paciente } from './entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Paciente])], // Registra la entidad User y Paciente
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Exporta UsersService para AuthModule
})
export class UsersModule {}
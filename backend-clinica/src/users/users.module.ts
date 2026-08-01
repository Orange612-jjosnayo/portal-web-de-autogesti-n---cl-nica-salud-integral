import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra la entidad User
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Exporta UsersService para AuthModule
})
export class UsersModule {}
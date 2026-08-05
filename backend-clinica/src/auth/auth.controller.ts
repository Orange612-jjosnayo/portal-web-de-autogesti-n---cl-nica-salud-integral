import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.validateAndLogin(loginDto);

    // Inyección de la cookie HttpOnly
    response.cookie('access_token', token, {
      httpOnly: true, // Inaccesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV === 'production', // Requiere HTTPS en producción
      sameSite: 'lax', // Protección frente a ataques CSRF
      maxAge: 1000 * 60 * 60 * 24, // Expiración: 1 día (24h)
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined, // Añade esta línea
    });

    return {
      message: 'Inicio de sesión exitoso',
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', { path: '/' });
    return { message: 'Sesión cerrada correctamente' };
  }
}
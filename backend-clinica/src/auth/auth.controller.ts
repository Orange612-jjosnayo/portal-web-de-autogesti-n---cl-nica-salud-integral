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

    const isProduction = process.env.NODE_ENV === 'production';
    const isHttps = process.env.ENABLE_HTTPS === 'true'; // Variable de control explícita

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: isHttps, // Solo activar Secure si tienes certificado SSL (HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined, // Permitir compartir cookie entre subdominios
    });

    return {
      message: 'Inicio de sesión exitoso',
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', { 
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
    });
    return { message: 'Sesión cerrada correctamente' };
  }
}
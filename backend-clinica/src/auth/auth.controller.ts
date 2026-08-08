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
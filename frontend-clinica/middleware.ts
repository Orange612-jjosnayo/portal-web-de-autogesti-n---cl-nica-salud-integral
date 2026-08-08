import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificamos si existe la cookie que contiene el token JWT
  const token = request.cookies.get('access_token');
  
  // Identificamos las rutas
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Si intenta entrar al dashboard y NO está logeado -> redirigir a login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si intenta entrar a login/registro y SÍ está logeado -> redirigir al dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Especificamos en qué rutas debe ejecutarse este middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};

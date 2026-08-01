import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ❌ Antes: export function middleware(request: NextRequest)
// ✅ Ahora en Next.js 16+:
export function proxy(request: NextRequest) {
  // 1. Obtener la cookie HttpOnly
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Si intenta entrar a rutas privadas (/dashboard) sin token, redirigir al Login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Si ya tiene sesión activa e intenta ir a /login o /register, enviarlo al dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar las rutas a interceptar
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
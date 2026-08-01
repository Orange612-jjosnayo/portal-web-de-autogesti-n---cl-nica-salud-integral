'use client';

import { useRouter } from 'next/navigation';
import { User, Calendar, FileText, LogOut, Activity, Clock } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Llamada al endpoint de logout en NestJS para limpiar la cookie HttpOnly
      await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header del Dashboard */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-800">Clínica Salud Integral</span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Banner de Bienvenida */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg shadow-blue-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2 backdrop-blur-sm">
              <User className="w-3.5 h-3.5" />
              <span>Portal de Autogestión</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">¡Bienvenido a tu Panel de Salud!</h1>
            <p className="text-blue-100 text-sm mt-1">
              Sesión iniciada correctamente mediante token JWT en cookie segura.
            </p>
          </div>
        </div>

        {/* Tarjetas Informativas / Accesos Rápidos */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Próximas Citas</h3>
              <p className="text-xs text-slate-500 mt-1">No tienes citas programadas por el momento.</p>
              <button className="mt-3 text-xs font-medium text-blue-600 hover:underline">
                + Agendar cita
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Historial Clínico</h3>
              <p className="text-xs text-slate-500 mt-1">Consulta tus recetarios y diagnósticos pasados.</p>
              <button className="mt-3 text-xs font-medium text-blue-600 hover:underline">
                Ver historial
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Atenciones Recientes</h3>
              <p className="text-xs text-slate-500 mt-1">Sin registros médicos recientes.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2026 Clínica Salud Integral - Módulo de Autenticación
      </footer>
    </div>
  );
}
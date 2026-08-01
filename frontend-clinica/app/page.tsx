import Link from 'next/link';
import { Calendar, UserCheck, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-800">Clínica Salud Integral</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-6 border border-blue-100">
          <span>Portal Web de Autogestión</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl leading-tight">
          Gestiona tus citas médicas e historial clínico de forma rápida y segura
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Accede a tu portal de paciente las 24 horas. Agenda consultas, revisa tus diagnósticos y mantén el control de tu salud integral desde cualquier dispositivo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition duration-200"
          >
            Crear mi cuenta de Paciente
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium rounded-xl shadow-sm transition duration-200"
          >
            Ingresar a mi Portal
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16 text-left w-full max-w-4xl">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Agendamiento Online</h3>
            <p className="text-sm text-slate-500">
              Reserva y reprograma tus citas médicas con tus especialistas en tiempo real.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Historial Clínico</h3>
            <p className="text-sm text-slate-500">
              Consulta tus recetas, diagnósticos y resultados médicos cuando los necesites.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Seguridad Garantizada</h3>
            <p className="text-sm text-slate-500">
              Tus datos de salud están encriptados y protegidos bajo los estándares más estrictos.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © 2026 Clínica Salud Integral. Todos los derechos reservados.
      </footer>
    </div>
  );
}
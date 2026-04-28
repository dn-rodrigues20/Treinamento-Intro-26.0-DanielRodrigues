'use client';
import LoginForm from './_components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      {/* Container Principal com Estética da Diretoria */}
      <div className="w-full max-w-lg bg-zinc-800 p-10 rounded-2xl border border-zinc-700 shadow-2xl relative overflow-hidden">
        
        {/* Detalhe Decorativo em Verde Neon */}
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            DIRETORIA <span className="text-green-500 text-3xl">Jim Carrey</span>
          </h1>
          <p className="text-zinc-400 mt-3 font-medium">Acesse sua conta para gerenciar seus clubes</p>
        </div>

        <LoginForm />

        <div className="mt-8 pt-6 border-t border-zinc-700 text-center">
          <p className="text-zinc-500 text-sm">
            Ainda não faz parte do conselho? <a href="/cadastro" className="text-green-500 font-bold hover:text-green-400">Cadastre-se aqui</a>
          </p>
        </div>
      </div>
    </main>
  );
}
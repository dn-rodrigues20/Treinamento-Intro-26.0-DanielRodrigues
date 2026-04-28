'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client'; 
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: '/' // Redireciona para a Landing Page após o login
      });
    } catch (error) {
      alert("Erro ao entrar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Campo E-mail */}
      <div>
        <label className="block text-zinc-300 mb-2 text-sm font-bold uppercase tracking-widest">E-mail Corporativo</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
          placeholder="diretoria@jimcarrey.com"
          required
        />
      </div>

      {/* Campo Senha */}
      <div>
        <label className="block text-zinc-300 mb-2 text-sm font-bold uppercase tracking-widest">Código de Acesso</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Botão de Ação */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-lg shadow-green-900/20"
      >
        {loading ? 'PROCESSANDO...' : 'ACESSAR DIRETORIA'}
      </button>
    </form>
  );
}
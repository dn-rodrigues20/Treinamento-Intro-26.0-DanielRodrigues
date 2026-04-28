'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client'; 
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signUp.email({
        email,
        password: senha,
        name: nome,
      });
      
      alert("Bem-vindo à Diretoria! Cadastro realizado com sucesso.");
      
      router.push('/'); 
      
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar cadastro. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-zinc-400 mt-3 font-medium">Cadastre-se para assumir o controle do seu clube</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-6">
          {/* Campo Nome */}
          <div>
            <label className="block text-zinc-300 mb-2 text-sm font-bold uppercase tracking-widest">Nome do Diretor</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              placeholder="Ex: Jim Carrey"
              required
            />
          </div>

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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
            {loading ? 'PROCESSANDO...' : 'EFETIVAR CADASTRO'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-700 text-center">
          <p className="text-zinc-500 text-sm">
            Já faz parte do conselho? <a href="/login" className="text-green-500 font-bold hover:text-green-400">Entre aqui</a>
          </p>
        </div>
      </div>
    </main>
  );
}
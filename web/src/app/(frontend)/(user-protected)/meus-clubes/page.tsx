'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import axios from 'axios';
import InitialNav from '@/components/base/nav/InitialNav';

interface Compra {
  id: string;
  status: string;
  createdAt: string;
}

export default function MeusClubesPage() {
  const { data: session, isPending } = authClient.useSession();
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user?.id) {
      buscarCompras(session.user.id);
    } else if (!isPending && !session) {
      setLoading(false); // Usuário não está logado
    }
  }, [session, isPending]);

  const buscarCompras = async (userId: string) => {
    try {
      const response = await axios.get(`/api/compras`, {
        params: { userId: userId }
      });
      
      console.log("DADOS QUE CHEGARAM DO BANCO:", response.data); 
      
      setCompras(response.data);
    } catch (error) {
      console.error("Erro ao carregar as compras:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 pb-12 relative">
      <InitialNav 
        quantidadeCarrinho={0} 
        precoTotal={0} 
        aoClicarNoCarrinho={() => {}} 
      />

      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="mb-10 border-b border-zinc-700 pb-6">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Gabinete do <span className="text-green-500">Diretor</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            {session?.user?.name ? `Bem-vindo de volta, ${session.user.name}.` : 'Carregando credenciais...'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse font-bold">
            ACESSANDO ARQUIVOS DA DIRETORIA...
          </div>
        ) : !session ? (
          <div className="bg-zinc-800 p-8 rounded-xl border border-red-500/30 text-center">
            <h2 className="text-2xl text-white font-bold mb-4">Acesso Restrito</h2>
            <p className="text-zinc-400 mb-6">Você precisa estar logado para ver seus clubes.</p>
            <a href="/login" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Fazer Login
            </a>
          </div>
        ) : compras.length === 0 ? (
          <div className="bg-zinc-800 p-12 rounded-xl border border-zinc-700 text-center shadow-lg">
            <h2 className="text-2xl text-zinc-300 font-bold mb-2">Nenhum clube adquirido ainda</h2>
            <p className="text-zinc-500 mb-6">Sua carteira de investimentos está vazia. Volte à página inicial para começar as negociações.</p>
            <a href="/" className="inline-block border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all">
              Ver Clubes à Venda
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {compras.map((compra) => (
              <div key={compra.id} className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-xl hover:border-zinc-500 transition-colors">
                
                <div>
                  <p className="text-xs text-zinc-500 font-mono mb-1">CONTRATO #{compra.id.slice(-6).toUpperCase()}</p>
                  <h3 className="text-xl font-bold text-white mb-2">Aquisição de Clube</h3>
                  <p className="text-sm text-zinc-400">
                    {compra.createdAt 
                      ? `Data da assinatura: ${new Date(compra.createdAt).toLocaleDateString('pt-BR')}`
                      : 'Data da assinatura: Registro sem data'}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 ${
                    compra.status === 'APROVADO' ? 'bg-green-500/20 text-green-400' :
                    compra.status === 'REJEITADO' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {compra.status || 'PENDENTE'}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import axios from 'axios';
import InitialNav from '@/components/base/nav/InitialNav';

interface Compra {
  id: string;
  status: string;
  userId: string;
  precoTotal: number;
}

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [todasCompras, setTodasCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session) {
      buscarTodasCompras();
    } else if (!isPending && !session) {
      setLoading(false);
    }
  }, [session, isPending]);

  const buscarTodasCompras = async () => {
    try {
      const response = await axios.get('/api/compras');
      setTodasCompras(response.data);
    } catch (error) {
      console.error("Erro ao carregar todas as compras:", error);
    } finally {
      setLoading(false);
    }
  };

  const mudarStatus = async (compraId: string, novoStatus: string) => {
    try {
      await axios.patch(`/api/compras/${compraId}/status`, { status: novoStatus });
      buscarTodasCompras(); // Recarrega a tabela para mostrar a nova cor
      alert(`Status atualizado para: ${novoStatus}. E-mail disparado!`);
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      alert("Falha ao atualizar o status da negociação.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 pb-12 relative">
      <InitialNav quantidadeCarrinho={0} precoTotal={0} aoClicarNoCarrinho={() => {}} />

      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="mb-10 border-b border-zinc-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              Painel de <span className="text-blue-500">Controle Admin</span>
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">Gerenciamento global de negociações da Diretoria.</p>
          </div>
          <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg font-bold border border-blue-500/30">
            Acesso Nível Supremo
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-blue-500 animate-pulse font-bold">
            CARREGANDO BASE DE DADOS...
          </div>
        ) : !session ? (
          <div className="text-center text-red-500 font-bold mt-10">
            ACESSO NEGADO. FAÇA LOGIN.
          </div>
        ) : todasCompras.length === 0 ? (
          <div className="text-center text-zinc-500 font-bold mt-10">
            Nenhuma negociação registrada no sistema.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800 shadow-2xl">
            <table className="w-full text-left text-zinc-300">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-xs uppercase text-zinc-500 font-bold">
                <tr>
                  <th className="px-6 py-4">ID do Contrato</th>
                  <th className="px-6 py-4">ID do Comprador</th>
                  <th className="px-6 py-4">Valor (R$)</th>
                  <th className="px-6 py-4">Status Atual</th>
                  <th className="px-6 py-4 text-right">Ações de Resolução</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/50">
                {todasCompras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{compra.id}</td>
                    <td className="px-6 py-4 font-mono text-xs">{compra.userId.slice(0, 10)}...</td>
                    <td className="px-6 py-4 text-green-400 font-bold">R$ {compra.precoTotal.toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4">
                      {/* Pílula de Status Dinâmica */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        compra.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                        compra.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                        compra.status === 'delivered' ? 'bg-purple-500/20 text-purple-400' :
                        compra.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {compra.status === 'paid' ? 'PAGO' :
                         compra.status === 'shipped' ? 'ENVIADO' :
                         compra.status === 'delivered' ? 'ENTREGUE' :
                         compra.status === 'cancelled' ? 'CANCELADO' :
                         'PENDENTE'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Seletor de Status (Dropdown) */}
                      <select
                        value={compra.status}
                        onChange={(e) => mudarStatus(compra.id, e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold rounded px-3 py-2 outline-none focus:border-blue-500 cursor-pointer transition-colors"
                      >
                        <option value="pending">Marcar como Pendente</option>
                        <option value="paid">Confirmar Pagamento</option>
                        <option value="shipped">Sinalizar Envio</option>
                        <option value="delivered">Confirmar Entrega</option>
                        <option value="cancelled">Cancelar Compra</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
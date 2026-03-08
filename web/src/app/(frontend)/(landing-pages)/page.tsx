"use client";

import React, { useState } from 'react';
import InitialNav from '@/components/base/nav/InitialNav';
import ProdutoCard from '@/components/ui/ProdutoCard';

const timesParaVender = [
  { id: 1, nome: "São Paulo", descricao: "Só não garantimos títulos recentes em sequência.", preco: 3500000000, imagemUrl: "/escudos/sao-paulo.svg" },
  { id: 2, nome: "Corinthians", descricao: "Acompanha uma arena incrível (e os boletos dela também).", preco: 50, imagemUrl: "/escudos/corinthians.svg" },
  { id: 3, nome: "Palmeiras", descricao: "Avião da presidente vendido separadamente.", preco: 2800000000, imagemUrl: "/escudos/palmeiras.svg" },
  { id: 4, nome: "Santos", descricao: "Acompanha as viúvas de Pelé e Neymar.", preco: 1500000000, imagemUrl: "/escudos/santos.svg" },
  { id: 5, nome: "Flamengo", descricao: "Crise na Gávea inclusa no pacote premium.", preco: 4000000000, imagemUrl: "/escudos/flamengo.svg" },
  { id: 6, nome: "Fluminense", descricao: "Média de idade do elenco: 38 anos.", preco: 1200000000, imagemUrl: "/escudos/fluminense.svg" },
  { id: 7, nome: "Vasco", descricao: "Acompanha calculadora de probabilidade de rebaixamento.", preco: 100, imagemUrl: "/escudos/vasco.svg" },
  { id: 8, nome: "Botafogo", descricao: "Disclaimer: é o time de futebol, não o bairro.", preco: 800000000, imagemUrl: "/escudos/botafogo.svg" },
  { id: 9, nome: "Cruzeiro", descricao: "Se não comprar esse time hoje, pelo amor de Deus, né?", preco: 900000000, imagemUrl: "/escudos/cruzeiro.svg" },
  { id: 10, nome: "Atlético-MG", descricao: "Garantia de fábrica até o próximo título do brasileirão.", preco: 1100000000, imagemUrl: "/escudos/atletico-mg.svg" },
  { id: 11, nome: "Internacional", descricao: "EdenilsoooooooooOOOOOOooooOOOOn, 41 anos.", preco: 1300000000, imagemUrl: "/escudos/internacional.svg" },
  { id: 12, nome: "Grêmio", descricao: "O imortal que mais morreu.", preco: 1300000000, imagemUrl: "/escudos/gremio.svg" }
];

export default function Home() {
  const [carrinhoIds, setCarrinhoIds] = useState<number[]>([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleCarrinho = (id: number) => {
    if (carrinhoIds.includes(id)) {
      setCarrinhoIds(carrinhoIds.filter((itemId) => itemId !== id));
    } else {
      setCarrinhoIds([...carrinhoIds, id]);
    }
  };

  const timesComprados = timesParaVender.filter((time) => carrinhoIds.includes(time.id));
  const precoTotal = timesComprados.reduce((soma, time) => soma + time.preco, 0);
  const quantidadeCarrinho = carrinhoIds.length;

  return (
    <main className="min-h-screen bg-zinc-800 pb-12 relative">
      
      {/* Passamos a função de abrir o menu para a Navbar */}
      <InitialNav 
        quantidadeCarrinho={quantidadeCarrinho} 
        precoTotal={precoTotal} 
        aoClicarNoCarrinho={() => setMenuAberto(true)} 
      />
      
      <div className="p-8 text-white text-center mt-6">
        <h1 className="text-4xl font-bold mb-4">Cansado da gestão incompetente da diretoria do seu clube???</h1>
        <p className="text-lg text-zinc-400">Compre-o agora mesmo!!</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {timesParaVender.map((time) => (
            <ProdutoCard 
              key={time.id} 
              nome={time.nome}
              descricao={time.descricao}
              preco={time.preco}
              imagemUrl={time.imagemUrl}
              noCarrinho={carrinhoIds.includes(time.id)} 
              aoClicar={() => toggleCarrinho(time.id)}
            />
          ))}
        </div>
      </div>

      {/* Menu Lateral Carrinho */}
      {menuAberto && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Fundo escuro que fecha o menu ao clicar fora */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMenuAberto(false)}
          ></div>

          {/* O painel branco do menu */}
          <div className="w-full max-w-md bg-zinc-900 h-full shadow-2xl relative flex flex-col p-6 animate-slide-in-right border-l border-zinc-700">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Seu Carrinho</h2>
              <button 
                onClick={() => setMenuAberto(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Lista de itens comprados */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {timesComprados.length === 0 ? (
                <p className="text-zinc-500 text-center mt-10">Seu carrinho está vazio.</p>
              ) : (
                timesComprados.map((time) => (
                  <div key={time.id} className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                    <div>
                      <h4 className="font-bold text-white">{time.nome}</h4>
                      <p className="text-sm text-green-500">
                        {time.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    {/* Botão de remover direto do carrinho */}
                    <button 
                      onClick={() => toggleCarrinho(time.id)}
                      className="text-red-500 hover:text-red-400 text-sm font-bold"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé com o total */}
            <div className="pt-6 border-t border-zinc-700 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-zinc-300">Total:</span>
                <span className="text-2xl font-black text-green-500">
                  {precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                Finalizar Compra
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
"use client";

import React from 'react';
import Image from 'next/image';

interface ProdutoCardProps {
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
  noCarrinho: boolean;
  aoClicar: () => void;
}

export default function ProdutoCard({ nome, descricao, preco, imagemUrl, noCarrinho, aoClicar }: ProdutoCardProps) {
  

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-transform hover:scale-105">
      
      <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
         <Image 
            src={imagemUrl} 
            alt={`Escudo do ${nome}`}
            width={80}
            height={80}
            className="object-contain"
         />
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">{nome}</h3>
      <p className="text-sm text-zinc-400 mb-6 flex-grow">{descricao}</p>
      
      <div className="text-xl font-black text-green-500 mb-6">
        {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </div>

      <button 
        onClick={aoClicar}
        className={`w-full py-3 rounded-lg font-bold transition-colors duration-300 ${
          noCarrinho 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {noCarrinho ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
      </button>

    </div>
  );
}
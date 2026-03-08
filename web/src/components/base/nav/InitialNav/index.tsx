import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

interface NavbarProps {
  quantidadeCarrinho: number;
  precoTotal: number;
  aoClicarNoCarrinho: () => void;
}

export default function InitialNav({ quantidadeCarrinho, precoTotal, aoClicarNoCarrinho }: NavbarProps) {
  return (
    <nav className="bg-zinc-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      
      <Link href="/" className="cursor-pointer flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Logo da Diretoria Jim Carrey" 
          width={50} 
          height={50} 
          className="object-contain"
        />
        <div className="text-2xl font-black tracking-tighter">
          <span className="text-white">Diretoria</span>
          <span className="text-green-500">Jim Carrey</span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        
        <span className="hidden sm:block text-zinc-300 font-medium">
          Olá, Freguês!
        </span>

        {/* onClick */}
        <button 
          onClick={aoClicarNoCarrinho}
          className="flex items-center gap-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          <div className="flex flex-col text-sm text-left">
            <span className="font-bold leading-none">{quantidadeCarrinho} itens</span>
            <span className="text-xs mt-1">
              {precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </button>

      </div>
    </nav>
  );
}
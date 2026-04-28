'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Caso você use links na nav

interface InitialNavProps {
  quantidadeCarrinho?: number;
  precoTotal?: number;
  aoClicarNoCarrinho?: () => void;
}

export default function InitialNav({ 
  quantidadeCarrinho = 0, 
  precoTotal = 0, 
  aoClicarNoCarrinho 
}: InitialNavProps) {
  
  const router = useRouter();

  const fazerLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO OU NOME DO SITE */}
        <Link href="/" className="text-white font-black italic text-xl uppercase tracking-tighter">
          Diretoria<span className="text-green-500">Jim Carrey</span>
        </Link>

        {/* ÁREA DE AÇÕES */}
        <div className="flex items-center gap-6">
          
          {/* BOTÃO DO CARRINHO */}
          {aoClicarNoCarrinho && (
            <button 
              onClick={aoClicarNoCarrinho}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>CARRINHO ({quantidadeCarrinho})</span>
            
            {precoTotal > 0 && (
              <span className="bg-green-950 text-green-400 px-2 py-0.5 rounded-md text-xs ml-1 font-bold">
                R$ {precoTotal.toLocaleString('pt-BR')}
              </span>
            )}
            </button>
          )}

          {/* BOTÃO DE LOGOUT */}
          <button 
            onClick={fazerLogout}
            className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg border border-red-500/50 transition-all font-bold text-xs uppercase tracking-widest"
          >
            Sair da Diretoria
          </button>
        </div>
      </div>
    </nav>
  );
}
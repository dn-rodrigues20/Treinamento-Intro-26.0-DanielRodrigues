import { NextResponse } from "next/server";
import { CompraService } from '@/backend/services/compras';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, produtoIds, precoTotal } = body; // <-- Número 7 removido daqui
    
    // Verificação de Segurança
    if (!userId || !produtoIds) { // <-- "s" removido de produtoIds
      return NextResponse.json({ message: "Usuário ou produtos não informados"}, { status: 400});
    }

    const novaCompra = await CompraService.criarCompra(userId, produtoIds);

    return NextResponse.json(novaCompra, { status: 201 });
  } catch (error: any) {
    console.error("🚨 ERRO AO PROCESSAR COMPRA:", error);
    return NextResponse.json(
      { message: "Erro ao processar compra", error: error?.message || "Erro desconhecido" }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      return NextResponse.json({ message: "Rota de usuário específico não mockada" }, { status: 200 });
    }

    const todasAsCompras = await CompraService.listarCompras();
    
    return NextResponse.json(todasAsCompras, { status: 200 });

  } catch (error) {
    console.error("Erro no GET de compras:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { CompraService } from "../../services/compras";

export async function GET() {
  try {
    const compras = await CompraService.listarCompras();
    return NextResponse.json(compras, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar histórico" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, produtoIds } = await request.json();
    
    if (!userId || !produtoIds || produtoIds.length === 0) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const novaCompra = await CompraService.criarCompra(userId, produtoIds);
    return NextResponse.json(novaCompra, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao processar compra" }, { status: 500 });
  }
}
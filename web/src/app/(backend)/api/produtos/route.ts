import { NextRequest, NextResponse } from "next/server";
import { ProdutoService } from "../../services/produtos";

// 1. ROTA GET: Lista todos os produtos
export async function GET() {
  try {
    const produtos = await ProdutoService.listarProdutos();
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

// 2. ROTA POST: Cria um novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    const novoProduto = await ProdutoService.criarProduto(body);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    console.error("🚨 ERRO NO BACKEND:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
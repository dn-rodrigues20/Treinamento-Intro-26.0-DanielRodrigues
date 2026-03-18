import { NextRequest, NextResponse } from "next/server";
import { ProdutoService } from "../../../services/produtos";

// GET: Busca um produto específico pelo ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const produto = await ProdutoService.buscarProdutoPorId(params.id);
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

// PATCH: Atualiza um produto pelo ID
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const produtoAtualizado = await ProdutoService.atualizarProduto(params.id, body);
    return NextResponse.json(produtoAtualizado, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// DELETE: Deleta um produto pelo ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ProdutoService.deletarProduto(params.id);
    return NextResponse.json({ message: "Produto deletado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar produto" }, { status: 500 });
  }
}
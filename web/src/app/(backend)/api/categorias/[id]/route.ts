import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "../../../services/categorias";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoria = await CategoriaService.buscarCategoriaPorId(params.id);
    if (!categoria) return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    return NextResponse.json(categoria, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar categoria" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const categoriaAtualizada = await CategoriaService.atualizarCategoria(params.id, body);
    return NextResponse.json(categoriaAtualizada, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await CategoriaService.deletarCategoria(params.id);
    return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar categoria" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "../../services/categorias";

export async function GET() {
  try {
    const categorias = await CategoriaService.listarCategorias();
    return NextResponse.json(categorias, { status: 200 });
  } catch (error) {
    console.error("🚨 ERRO GET CATEGORIAS:", error);
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    const novaCategoria = await CategoriaService.criarCategoria(body);
    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error) {
    console.error("🚨 ERRO POST CATEGORIA:", error);
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 });
  }
}
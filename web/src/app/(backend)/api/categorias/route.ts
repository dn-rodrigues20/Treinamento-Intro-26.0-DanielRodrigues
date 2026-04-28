import { NextRequest, NextResponse } from "next/server";
import { CategoriaService } from "../../services/categorias";
import { categoriaSchema } from "../../schemas/categoria.schema";
import { handleError } from "@/utils/api/handle-error";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // O .parse() joga o erro pro catch se o Zod falhar
    const data = categoriaSchema.parse(body);

    const novaCategoria = await CategoriaService.criarCategoria(data);
    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error) {
    return handleError(error, "Erro ao criar categoria");
  }
}

export async function GET() {
  try {
    const categorias = await CategoriaService.listarCategorias();
    return NextResponse.json(categorias, { status: 200 });
  } catch (error) {
    return handleError(error, "Erro ao buscar categorias");
  }
}
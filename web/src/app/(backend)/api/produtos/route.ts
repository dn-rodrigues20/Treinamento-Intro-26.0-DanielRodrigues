import { NextRequest, NextResponse } from "next/server";
import { ProdutoService } from "../../services/produtos";
import { productSchema } from "../../schemas/produto.schema";
// Tente este caminho exato (4 níveis para cima para sair de 'produtos', 'api', '(backend)' e 'app')
import { handleError } from "../../../../utils/api/handle-error";

export async function GET() {
  try {
    const produtos = await ProdutoService.listarProdutos();
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    return handleError(error, "Erro ao buscar produtos");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    
    // O .parse() dispara um erro se não for válido, caindo direto no catch
    const data = productSchema.parse(body);

    const novoProduto = await ProdutoService.criarProduto(data);
    return NextResponse.json(novoProduto, { status: 201 });

  } catch (error) {
    // Tratamento centralizado!
    return handleError(error, "Erro ao criar produto");
  }
}
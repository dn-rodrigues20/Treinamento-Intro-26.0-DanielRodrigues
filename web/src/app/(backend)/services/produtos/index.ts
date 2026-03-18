import prisma from '../db';

export const ProdutoService = {
  
  // 1. CRIAR (Create)
  async criarProduto(data: { nome: string; descricao: string; preco: number; categoriaIds?: string[] }) {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        categoriaIds: data.categoriaIds || [],
      }
    });
  },

  // 2. LISTAR TODOS (Read)
  async listarProdutos() {
    return await prisma.produto.findMany({
      
      include: { categorias: true } 
    });
  },

  // 3. BUSCAR POR ID (Read)
  async buscarProdutoPorId(id: string) {
    return await prisma.produto.findUnique({
      where: { id },
      include: { categorias: true }
    });
  },

  // 4. ATUALIZAR (Update)
  async atualizarProduto(id: string, data: { nome?: string; descricao?: string; preco?: number }) {
    return await prisma.produto.update({
      where: { id },
      data,
    });
  },

  // 5. DELETAR (Delete)
  async deletarProduto(id: string) {
    return await prisma.produto.delete({
      where: { id },
    });
  }
};
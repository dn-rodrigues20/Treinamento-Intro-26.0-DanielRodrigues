import prisma from '../db';

export const CategoriaService = {
  // 1. CRIAR
  async criarCategoria(data: { nome: string }) {
    return await prisma.categoria.create({ data });
  },

  // 2. LISTAR
  async listarCategorias() {
    return await prisma.categoria.findMany({
      include: { produtos: true }
    });
  },

  // 3. BUSCAR POR ID
  async buscarCategoriaPorId(id: string) {
    return await prisma.categoria.findUnique({
      where: { id },
      include: { produtos: true }
    });
  },

  // 4. ATUALIZAR
  async atualizarCategoria(id: string, data: { nome?: string }) {
    return await prisma.categoria.update({
      where: { id },
      data,
    });
  },

  // 5. DELETAR
  async deletarCategoria(id: string) {
    return await prisma.categoria.delete({
      where: { id },
    });
  }
};
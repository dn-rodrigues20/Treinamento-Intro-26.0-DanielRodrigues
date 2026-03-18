import prisma from '../db';

export const CompraService = {
  async criarCompra(userId: string, produtoIds: string[]) {
    // 1. Busca Produtos e preços
    const produtosEncontrados = await prisma.produto.findMany({
      where: { id: { in: produtoIds } }
    });

    // 2. Soma dos preços
    const precoTotal = produtosEncontrados.reduce((acc, prod) => acc + prod.preco, 0);

    // 3. Dados obrigatórios de compra
    return await prisma.compra.create({
      data: {
        userId: userId,
        precoTotal: precoTotal,
        produtos: {
          connect: produtoIds.map(id => ({ id }))
        }
      },
      include: { produtos: true, user: true }
    });
  },

  async listarCompras() {
    return await prisma.compra.findMany({
      include: { produtos: true, user: true }
    });
  }
};
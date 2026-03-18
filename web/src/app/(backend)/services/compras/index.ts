import prisma from '../db';

export const CompraService = {
  async criarCompra(userId: string, produtoIds: string[]) {
    // 1. Primeiro, buscamos os produtos para saber os preços reais deles
    const produtosEncontrados = await prisma.produto.findMany({
      where: { id: { in: produtoIds } }
    });

    // 2. Calculamos o valor total (Soma dos preços)
    const precoTotal = produtosEncontrados.reduce((acc, prod) => acc + prod.preco, 0);

    // 3. Agora sim, criamos a compra com todos os dados obrigatórios
    return await prisma.compra.create({
      data: {
        userId: userId,
        precoTotal: precoTotal, // <--- O campo que estava faltando!
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
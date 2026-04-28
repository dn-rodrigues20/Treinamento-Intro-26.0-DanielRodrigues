import prisma from "@/backend/services/db";
import { patchSchema } from "../../schemas";
import { z } from "zod";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export async function updateUser(id: string, data: z.infer<typeof patchSchema>) {
  return await prisma.user.update({
    where: { id },
    data
  })
}

export async function deleteUser(id: string) {
  await prisma.session.deleteMany({ where: { userId: id } });
  await prisma.account.deleteMany({ where: { userId: id } });
  return await prisma.user.delete({
    where: { id }
  })
}

export async function getEstatisticas(id: string) {
  // 1. Busca compras não canceladas para estatísticas mais reais
  const compras = await prisma.compra.findMany({
    where: { 
      userId: id,
      status: { not: "cancelled" } 
    },
    include: { produtos: true } // Mantendo conforme seu código original
  });

  if (!compras || compras.length === 0) {
    return {
      totalGasto: 0,
      numeroDeCompras: 0,
      produtoMaisComprado: "Nenhum"
    };
  }

  // 2. Número total de compras (incluindo pendentes)
  const numeroDeCompras = compras.length;

  // 3. Soma do valor apenas das compras que entraram dinheiro (Pagas ou Enviadas)
  const totalGasto = compras
    .filter(c => ["paid", "shipped", "delivered"].includes(c.status))
    .reduce((soma, compra) => soma + (compra.precoTotal || 0), 0);

  // 4. Lógica para encontrar o produto mais comprado
  const contagemDeProdutos: Record<string, { nome: string; quantidade: number }> = {};
  let produtoMaisComprado = "Nenhum";
  let maxQuantidade = 0;

  compras.forEach(compra => {
    compra.produtos.forEach(produto => {
      if (!contagemDeProdutos[produto.id]) {
        contagemDeProdutos[produto.id] = { nome: produto.nome, quantidade: 0 };
      }
      
      contagemDeProdutos[produto.id].quantidade += 1;

      if (contagemDeProdutos[produto.id].quantidade > maxQuantidade) {
        maxQuantidade = contagemDeProdutos[produto.id].quantidade;
        produtoMaisComprado = contagemDeProdutos[produto.id].nome;
      }
    });
  });

  return {
    totalGasto,
    numeroDeCompras,
    produtoMaisComprado
  };
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, produtoIds, precoTotal } = body;

    console.log("DADOS RECEBIDOS:", { userId, produtoIds, precoTotal });

    const novaCompra = await prisma.compra.create({
      data: {
        userId: userId,
        precoTotal: precoTotal || 0, 
        status: "pending",
        produtoIds: produtoIds, 
      },
    });

    return NextResponse.json(novaCompra, { status: 201 });
  } catch (error: any) {
    console.error("🚨 ERRO NO PRISMA:", error);
    return NextResponse.json(
      { message: "Erro ao processar compra", error: error.message }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      const comprasDoUsuario = await prisma.compra.findMany({
        where: { 
          userId: userId.trim() 
        }
      });
      return NextResponse.json(comprasDoUsuario, { status: 200 });
    }

    const todasAsCompras = await prisma.compra.findMany();
    
    return NextResponse.json(todasAsCompras, { status: 200 });

  } catch (error) {
    console.error("Erro no GET de compras:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Vamos zerar a tabela de compras para limpar qualquer inconsistência
    const result = await prisma.compra.deleteMany({}); // O objeto vazio deleta TUDO

    return NextResponse.json({ 
      message: "Tabela de compras resetada com sucesso!", 
      registrosDeletados: result.count 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
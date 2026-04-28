import { NextRequest, NextResponse } from "next/server";
import { getEstatisticas } from "../../../../services/users";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const estatisticas = await getEstatisticas(params.id);
    return NextResponse.json(estatisticas, { status: 200 });
  } catch (error) {
    console.error("🚨 ERRO EM ESTATÍSTICAS:", error);
    return NextResponse.json({ error: "Erro ao calcular estatísticas do usuário" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleError(error: any, defaultMessage: string) {
  // 1. Checagem ultra-segura para erros do Zod
  const isZodError = error instanceof ZodError || (error?.errors && Array.isArray(error.errors));

  if (isZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro de validação nos dados enviados.",
        // Se error.errors não existir, ele retorna array vazio em vez de quebrar
        detalhes: (error.errors || []).map((e: any) => ({
          campo: e.path ? e.path.join(".") : "desconhecido",
          mensagem: e.message || "Erro de validação",
        })),
      },
      { status: 400 }
    );
  }

  // 2. Erros normais
  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || defaultMessage,
      },
      { status: 400 }
    );
  }

  // 3. Erro Crítico
  console.error("🚨 ERRO NO SERVIDOR:", error);
  return NextResponse.json(
    { success: false, message: "Ocorreu um erro inesperado." },
    { status: 500 }
  );
}
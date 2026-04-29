import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/resend";
import { CompraService } from '@/backend/services/compras';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const compraId = params.id;

    const body = await request.json();
    const novoStatus = body.status;

    if (!novoStatus) {
      return NextResponse.json({ message: "O status é obrigatório" }, { status: 400 });
    }
   
    const compraAtualizada = await CompraService.atualizarStatus(compraId, novoStatus);
    
    let assunto = "";
    let corpo = "";

    switch (novoStatus) { 
      case "paid":
        assunto = "Pagamento confirmado";
        corpo = `Sua compra (ID: ${compraId}) foi atualizada para o status paid. O cofre da Diretoria agradece!`;
        break;
      case "shipped":
        assunto = "Seu pedido foi enviado";
        corpo = `Sua compra (ID: ${compraId}) foi atualizada para o status shipped. Prepare a recepção!`;
        break;
      case "delivered":
        assunto = "Seu pedido foi entregue com sucesso";
        corpo = `Sua compra (ID: ${compraId}) foi atualizada para o status delivered. Volte sempre à Diretoria!`;
        break;
    }

    if (assunto && compraAtualizada.user?.email) {
      await sendEmail(
        compraAtualizada.user.email,
        assunto,
        corpo
      );
    }

    return NextResponse.json(compraAtualizada, { status: 200 });

  } catch (error: any) {
    console.error("🚨 [ERRO FATAL]:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor", details: error.message }, 
      { status: 500 }
    );
  }
}
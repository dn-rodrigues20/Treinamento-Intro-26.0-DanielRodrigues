import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { sendEmail } from "@/lib/email/resend";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { status } = body;
    
    const resolvedParams = await params;
    const compraId = resolvedParams.id;

    // 1. Salvando no banco e puxando os dados do usuário (para ter o e-mail)
    const compraAtualizada = await prisma.compra.update({
      where: { id: compraId },
      data: { status: status },
      include: {
        user: true,
      }
    });

    // 2. Lógica do E-mail conforme as regras do PDF
    let assunto = "";
    let corpo = "";

    switch (status) {
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

    // 3. Só envia o e-mail se for um status mapeado acima e se o usuário tiver e-mail
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
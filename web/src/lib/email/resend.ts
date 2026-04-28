import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Diretoria Jim Carrey <onboarding@resend.dev>', // O Resend exige esse "onboarding" no plano grátis
      to: to,
      subject: subject,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
               <h2>Diretoria Jim Carrey informa:</h2>
               <p style="font-size: 16px;">${body}</p>
             </div>`,
    });

    if (error) {
      console.error("🚨 Erro no Resend:", error);
      return { success: false, error };
    }

    console.log("✅ E-mail enviado com sucesso para:", to);
    return { success: true, data };
  } catch (error) {
    console.error("🚨 Falha ao enviar e-mail:", error);
    return { success: false, error };
  }
}
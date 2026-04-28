import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 1. Ligar o motor do S3 com as credenciais do seu .env
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 2. Função que fará o "arremesso" do ficheiro para a nuvem
export async function uploadImageToS3(fileBuffer: Buffer, fileName: string, mimeType: string) {
  // Criar um nome único para evitar que fotos com o mesmo nome se sobreponham
  const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, '-')}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!, // Aqui usamos a variável exata que você definiu
    Key: uniqueFileName,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read", // Garante que a foto do produto possa ser vista na loja
  });

  try {
    await s3Client.send(command);
    
    const publicUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
    return publicUrl;
    
  } catch (error) {
    console.error("🚨 Erro ao enviar imagem para o S3:", error);
    throw new Error("Falha no upload da imagem");
  }
}
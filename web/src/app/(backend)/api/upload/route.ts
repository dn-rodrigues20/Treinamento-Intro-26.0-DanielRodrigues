import { NextRequest, NextResponse } from "next/server";
import { uploadImageToS3 } from "../../services/s3";
import { handleError } from "../../../../utils/api/handle-error";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Nenhum arquivo encontrado na requisição." },
        { status: 400 }
      );
    }

    // 3. Convertendo o arquivo (File) para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await uploadImageToS3(buffer, file.name, file.type);

    return NextResponse.json({ success: true, url: imageUrl }, { status: 201 });

  } catch (error) {
    return handleError(error, "Erro ao fazer upload da imagem");
  }
}
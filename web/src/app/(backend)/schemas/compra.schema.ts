import { z } from "zod";

export const compraSchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"),
  produtoIds: z.array(z.string()).min(1, "A compra deve ter pelo menos um produto selecionado"),
});
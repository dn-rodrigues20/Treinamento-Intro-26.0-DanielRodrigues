import { z } from "zod";

export const productSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição muito curta"),
  preco: z.number().positive("Preço deve ser positivo"),
  categoriaIds: z.array(z.string()).optional(),
});
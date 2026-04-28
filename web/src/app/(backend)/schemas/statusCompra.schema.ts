import { z } from "zod";

export const statusCompraSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"], {
    errorMap: () => ({ message: "Status inválido. Use: pending, paid, shipped, delivered ou cancelled." })
  })
});
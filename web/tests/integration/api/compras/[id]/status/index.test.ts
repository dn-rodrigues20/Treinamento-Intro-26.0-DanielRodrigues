import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { CompraService } from '@/backend/services/compras'; 
import { PATCH } from '@/backend/api/compras/[id]/status/route'; // Ajuste este caminho se necessário
import { setCurrentRole } from '../../../../mocks/auth';
import { createRequest } from '../../../../mocks/requests';
import { NextRequest } from 'next/server';

vi.mock('@/backend/services/compras', () => ({
  CompraService: {
    atualizarStatus: vi.fn(),
  }
}));

vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn()
}));

describe('PATCH /api/compras/:id/status', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createPatchRequest = (status: string) => {
    const req = createRequest({ status }, `compras/compra-123/status`);
    return req;
  };

  it('deve atualizar o status da compra para "shipped" com sucesso', async () => {
    setCurrentRole('ADMIN'); // Apenas administradores mudam status
    
    const mockCompraAtualizada = { id: 'compra-123', status: 'shipped' };
    (CompraService.atualizarStatus as Mock).mockResolvedValue(mockCompraAtualizada);

    const response = await PATCH(createPatchRequest('shipped'), { params: { id: 'compra-123' } });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('shipped');
    expect(CompraService.atualizarStatus).toHaveBeenCalledWith('compra-123', 'shipped');
  });
});
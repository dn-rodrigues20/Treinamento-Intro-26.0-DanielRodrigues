import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { CompraService } from '@/backend/services/compras'; 
import { GET, POST } from '@/backend/api/compras/route';
import { setCurrentRole } from '../../mocks/auth';
import { createRequest } from '../../mocks/requests';
import { NextRequest } from 'next/server';

vi.mock('@/backend/services/compras', () => ({
  CompraService: {
    listarCompras: vi.fn(),
    criarCompra: vi.fn(),
  }
}));

const mockProdutosComprados = [
  { id: 'prod-1', nome: 'Camisa 3 São Paulo FC', preco: 299.90 },
  { id: 'prod-2', nome: 'Moletom Diretoria Jim Carrey', preco: 150.00 }
];

const mockCompraCriada = {
  id: 'compra-123',
  userId: 'user-777',
  precoTotal: 449.90,
  status: 'pending', // Status inicial exigido pela tarefa
  produtos: mockProdutosComprados,
};

describe('GET /api/compras', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole('ADMIN'); // Apenas listando compras como admin
  });

  it('deve listar todas as compras com sucesso (Status 200)', async () => {
    (CompraService.listarCompras as Mock).mockResolvedValue([mockCompraCriada]);
    const req = new NextRequest('http://localhost:3000/api/compras');
    const response = await GET(req);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveLength(1);
    expect(CompraService.listarCompras).toHaveBeenCalled();
  });
});

describe('POST /api/compras', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole(null); 
  });

  it('deve falhar se o usuário não for enviado na requisição (Erro 400)', async () => {
    setCurrentRole(null);
    
    // 1. Requisição INVÁLIDA (sem o userId)
    const reqInvalida = createRequest({ produtoIds: ['prod-1', 'prod-2'] }, "compras");
    const response = await POST(reqInvalida);
    
    // A rota deve barrar na segurança e retornar 400 Bad Request
    expect(response?.status).toBe(400); 
  });

  it('deve criar uma compra com sucesso enviando os IDs dos produtos', async () => {
    setCurrentRole('USER'); 
    (CompraService.criarCompra as Mock).mockResolvedValue(mockCompraCriada);

    // 2. Requisição VÁLIDA (com o userId preenchido)
    const reqValida = createRequest({ userId: 'user-777', produtoIds: ['prod-1', 'prod-2'] }, "compras");
    
    const response = await POST(reqValida);
    expect(response?.status).toBe(201); 
    
    const data = await response?.json();
    expect(data.precoTotal).toBe(449.90);
    expect(data.status).toBe('pending');
  });
});
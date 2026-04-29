import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { ProdutoService } from '@/backend/services/produtos'; 
import { GET, POST } from '@/backend/api/produtos/route';
import { setCurrentRole } from '../../mocks/auth';
import { createRequest } from '../../mocks/requests';

vi.mock('@/backend/services/produtos', () => ({
  ProdutoService: {
    listarProdutos: vi.fn(),
    criarProduto: vi.fn(),
  }
}));

const getProdutosMock = [
  { id: '1', nome: 'Camisa São Paulo FC', preco: 259.90, categoriaIds: [] },
  { id: '2', nome: 'Caneca Diretoria Jim Carrey', preco: 35.00, categoriaIds: [] }
];

const postProdutoMock = {
  nome: 'Novo Produto Teste',
  descricao: 'Descrição longa o suficiente para passar no Zod',
  preco: 100.00,
  categoriaIds: []
};

describe('GET /api/produtos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole(null);
  });

  it('deve retornar os produtos chamando o service', async () => {
    (ProdutoService.listarProdutos as Mock).mockResolvedValue(getProdutosMock);
    const response = await GET();
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(getProdutosMock);
    expect(ProdutoService.listarProdutos).toHaveBeenCalled();
  });
});

describe('POST /api/produtos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole(null); 
  });

  const createProdutoRequest = () => createRequest(postProdutoMock, "produtos");

  it('deve bloquear a criação de produto se o usuário não estiver autenticado (Erro 401)', async () => {
    setCurrentRole(null); // Simulando usuário deslogado
    const response = await POST(createProdutoRequest());
    expect(response?.status).toBe(400);
  });

  it('deve criar o produto com sucesso se o usuário for ADMIN (Status 201)', async () => {
    setCurrentRole('ADMIN');
    (ProdutoService.criarProduto as Mock).mockResolvedValue(postProdutoMock);

    const response = await POST(createProdutoRequest());
    
    expect(response?.status).toBe(201); 
    
    const data = await response?.json();
    expect(data).toEqual(postProdutoMock);
    expect(ProdutoService.criarProduto).toHaveBeenCalledWith(postProdutoMock);
  });
});
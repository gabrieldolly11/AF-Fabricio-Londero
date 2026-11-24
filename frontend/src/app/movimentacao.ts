export type Tipo = 'receita' | 'despesa';
export const CATEGORIAS = ['Trabalho', 'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'] as const;
export type Categoria = typeof CATEGORIAS[number];
export const CORES: Record<Categoria, string> = {
  Trabalho: '#15803d', Alimentação: '#b45309', Transporte: '#2563eb', Moradia: '#7c3aed', Lazer: '#be185d', Saúde: '#0e7490', Educação: '#4f46e5', Outros: '#64748b'
};
export interface DadosMovimentacao { descricao: string; tipo: Tipo; categoria: Categoria; valor: number; data: string; }
export interface Movimentacao extends DadosMovimentacao { _id: string; }
export function hoje(): string {
  const data = new Date();
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

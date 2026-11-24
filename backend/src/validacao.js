export const categorias = ['Trabalho', 'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];

export function validarMovimentacao(dados) {
  const { descricao, tipo, categoria, valor, data } = dados ?? {};
  if (typeof descricao !== 'string' || !descricao.trim() || descricao.trim().length > 100)
    throw new Error('Informe uma descrição de até 100 caracteres.');
  if (!['receita', 'despesa'].includes(tipo)) throw new Error('Tipo inválido.');
  if (!categorias.includes(categoria)) throw new Error('Categoria inválida.');
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor < 0.01 || valor > 999999999.99 || Math.abs(valor * 100 - Math.round(valor * 100)) > 0.0001)
    throw new Error('Informe um valor positivo, com até duas casas decimais.');
  if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) throw new Error('Informe uma data válida.');
  const dia = new Date(data + 'T00:00:00.000Z');
  if (!Number.isFinite(dia.getTime()) || dia.toISOString().slice(0, 10) !== data) throw new Error('Informe uma data válida.');
  return { descricao: descricao.trim(), tipo, categoria, valor: Math.round(valor * 100) / 100, data: dia };
}

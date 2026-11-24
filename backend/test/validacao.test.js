import test from 'node:test';
import assert from 'node:assert/strict';
import { validarMovimentacao } from '../src/validacao.js';
const valido = { descricao: ' Mercado ', tipo: 'despesa', categoria: 'Alimentação', valor: 19.99, data: '2026-11-24' };
test('aceita movimentação e normaliza descrição/data', () => {
  const item = validarMovimentacao(valido);
  assert.equal(item.descricao, 'Mercado'); assert.equal(item.valor, 19.99); assert.equal(item.data.toISOString(), '2026-11-24T00:00:00.000Z');
});
for (const [campo, valor] of [['descricao',' '],['tipo','outro'],['categoria','Inválida'],['valor',0],['valor',-3],['valor','10'],['valor',1.001],['data','2026-02-30'],['data','abc']]) {
  test(`rejeita ${campo}: ${valor}`, () => assert.throws(() => validarMovimentacao({ ...valido, [campo]: valor })));
}

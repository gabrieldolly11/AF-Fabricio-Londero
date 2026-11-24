import assert from 'node:assert/strict';
const url = process.env.API_URL || 'http://localhost:3000/api/movimentacoes';
const dados = { descricao: 'Teste temporário de integração', tipo: 'despesa', categoria: 'Outros', valor: 15.50, data: '2026-11-24' };
let id;
async function requisicao(metodo, caminho = '', corpo) {
  const res = await fetch(url + caminho, { method: metodo, ...(corpo ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) } : {}) });
  return { status: res.status, body: await res.json() };
}
try {
  let r = await requisicao('POST', '', dados); id = r.body._id; assert.equal(r.status, 201); assert.ok(id);
  r = await requisicao('GET'); assert.equal(r.status, 200); assert.ok(r.body.some(item => item._id === id));
  r = await requisicao('GET', '/' + id); assert.equal(r.body.valor, 15.50);
  r = await requisicao('PUT', '/' + id, { ...dados, valor: 20 }); assert.equal(r.status, 200); assert.equal(r.body.valor, 20);
  r = await requisicao('POST', '', { ...dados, valor: -1 }); assert.equal(r.status, 400);
  r = await requisicao('DELETE', '/' + id); assert.equal(r.status, 200);
  r = await requisicao('GET', '/' + id); assert.equal(r.status, 404); id = undefined;
  console.log('CRUD e validação da API: OK');
} finally { if (id) await requisicao('DELETE', '/' + id).catch(() => {}); }

import { Router } from 'express';
import mongoose from 'mongoose';
import Movimentacao from '../models/Movimentacao.js';
import { validarMovimentacao } from '../validacao.js';

const router = Router();
const executar = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.param('id', (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ mensagem: 'ID inválido.' });
  next();
});
function validar(req, res, next) {
  try { req.movimentacao = validarMovimentacao(req.body); next(); }
  catch (erro) { res.status(400).json({ mensagem: erro.message }); }
}
router.get('/', executar(async (req, res) => {
  const dados = await Movimentacao.find().sort({ data: -1, createdAt: -1 });
  res.json(dados);
}));
router.get('/:id', executar(async (req, res) => {
  const item = await Movimentacao.findById(req.params.id);
  if (!item) return res.status(404).json({ mensagem: 'Movimentação não encontrada.' });
  res.json(item);
}));
router.post('/', validar, executar(async (req, res) => {
  const item = await Movimentacao.create(req.movimentacao);
  res.status(201).json(item);
}));
router.put('/:id', validar, executar(async (req, res) => {
  const item = await Movimentacao.findByIdAndUpdate(req.params.id, req.movimentacao, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ mensagem: 'Movimentação não encontrada.' });
  res.json(item);
}));
router.delete('/:id', executar(async (req, res) => {
  const item = await Movimentacao.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ mensagem: 'Movimentação não encontrada.' });
  res.json({ mensagem: 'Movimentação excluída.' });
}));
export default router;

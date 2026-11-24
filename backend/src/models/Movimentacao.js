import mongoose from 'mongoose';
import { categorias } from '../validacao.js';

const movimentacaoSchema = new mongoose.Schema({
  descricao: { type: String, required: true, trim: true, maxlength: 100 },
  tipo: { type: String, enum: ['receita', 'despesa'], required: true },
  categoria: { type: String, enum: categorias, required: true },
  valor: { type: Number, required: true, min: 0.01 },
  data: { type: Date, required: true }
}, { timestamps: true, versionKey: false });

export default mongoose.model('Movimentacao', movimentacaoSchema, 'movimentacoes');

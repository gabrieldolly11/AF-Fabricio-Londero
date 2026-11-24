import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import movimentacoes from './routes/movimentacoes.js';

const app = express();
app.use(express.json({ limit: '32kb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', banco: mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado' }));
app.use('/api/movimentacoes', movimentacoes);
app.use((req, res) => res.status(404).json({ mensagem: 'Rota não encontrada.' }));
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') return res.status(400).json({ mensagem: 'JSON inválido.' });
  if (erro.status === 413) return res.status(413).json({ mensagem: 'Requisição muito grande.' });
  console.error('Erro na API:', erro.message);
  res.status(500).json({ mensagem: 'Erro interno ao acessar os dados.' });
});

async function iniciar() {
  const { MONGODB_URI, PORT = '3000' } = process.env;
  if (!MONGODB_URI) throw new Error('Configure MONGODB_URI no arquivo .env.');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB conectado.');
  app.listen(Number(PORT), '127.0.0.1', () => console.log(`API em http://localhost:${PORT}/api`));
}
iniciar().catch(erro => { console.error('Não foi possível iniciar a API:', erro.message); process.exit(1); });

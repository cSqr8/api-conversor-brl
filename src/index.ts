// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const cotacoes: Record<string, number> = {
  USD: 5.0,
  EUR: 6.0,
  GBP: 6.8,
  ARS: 0.02,
  JPY: 0.033,
  CNY: 0.70,
  BTC: 300000,
  ETH: 15000,
  AWG: 1.79,
  AZN: 1.6939,
  BOB: 6.8774,
  AFN: 77.0123,
  ALL: 102.1183
};

app.get('/converter', (req: Request, res: Response) => {
  const { valor, para } = req.query;

  if (!valor || !para || typeof para !== 'string') {
    return res.status(400).json({ erro: 'Parâmetros inválidos' });
  }

  const numero = parseFloat(valor as string);
  const taxa = cotacoes[para.toUpperCase()];

  if (!taxa) {
    return res.status(400).json({ erro: 'Moeda não suportada' });
  }

  const convertido = numero / taxa;
  res.json({ original: numero, convertido, moeda: para.toUpperCase() });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
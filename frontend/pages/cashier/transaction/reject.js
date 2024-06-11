import { deleteTransaction } from '@/lib/transactionController';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    return deleteTransaction(req, res);
  }
  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
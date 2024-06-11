import { updateTransaction } from '@/lib/transactionController';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    return updateTransaction(req, res);
  }
  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
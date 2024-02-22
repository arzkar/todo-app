import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const token = req.headers.authorization?.replace('Bearer ', '') || '';
        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { username, password } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '') || '';
        const response = await axios.post('http://localhost:3000/users', { username, password }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        res.status(201).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

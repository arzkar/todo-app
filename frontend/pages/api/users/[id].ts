import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method,
      } = req;
  
    switch (method) {
      case 'DELETE':
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || '';
            const response = await axios.delete(`http://localhost:3000/users/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            res.status(200).json(response.data);
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        break;
      default:
        res.setHeader('Allow', [ 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  };

export default handler;

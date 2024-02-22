import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method,
      } = req;
  
    switch (method) {
      case 'PUT':
        try {
            const { title, completed } = req.body;
            const response = await axios.put(`http://localhost:3000/todos/${id}`, { title, completed });
            res.status(200).json(response.data);
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        break;
      case 'DELETE':
        try {
            const response = await axios.delete(`http://localhost:3000/todos/${id}`);
            res.status(200).json(response.data);
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        break;
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  };

export default handler;
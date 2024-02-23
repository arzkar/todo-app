// Copyright 2024 Arbaaz Laskar

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
            const token = req.headers.authorization?.replace('Bearer ', '') || '';
            const response = await axios.put(`http://localhost:3000/todos/${id}`, { title, completed }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            res.status(200).json(response.data);
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        break;
      case 'DELETE':
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || '';
            const response = await axios.delete(`http://localhost:3000/todos/${id}`, {
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
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  };

export default handler;

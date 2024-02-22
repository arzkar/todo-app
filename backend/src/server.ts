import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import sequelize from './db';
import Todo from './Todo';


const app = express();
const port = 3000;

app.use(bodyParser.json());

// middleware to log incoming requests 
app.use((req, res, next) => {
    console.log(`\n${req.method} ${req.url}`);
    next();
  });
  

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  await Todo.create({ title, completed });
  res.json({ message: 'Todo created successfully' });
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  await Todo.update({ title, completed }, { where: { id } });
  res.json({ message: 'Todo updated successfully' });
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.json({ message: 'Todo deleted successfully' });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

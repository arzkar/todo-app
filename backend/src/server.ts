import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

import sequelize from './db';
import Todo from './models/Todo';
import User from './models/User';
import { getUserIdFromToken } from "./utils";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// middleware to log incoming requests 
app.use((req, res, next) => {
    console.log(`\n${req.method} ${req.url}`);
    next();
  });
  
// Todo routes
app.get('/todos', async (req: Request, res: Response) => {
  
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const todos = await Todo.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(todos);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, completed } = req.body;

  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const todo = await Todo.create({ title, completed, userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, completed } = req.body;
  await Todo.update({ title, completed }, { where: { id: id, userId: userId } });
  res.json({ message: 'Todo updated successfully' });
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  await Todo.destroy({ where: { id: id, userId: userId } });
  res.json({ message: 'Todo deleted successfully' });
});

// User routes
app.get('/users', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashedPassword });
  res.json({ message: 'User created successfully' });
});

app.delete('/users/', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  const userId = getUserIdFromToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await User.destroy({ where: { id: userId } });
  res.json({ message: 'User deleted successfully' });
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await User.generateToken(username, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
  
export interface TodoFormProps {
    onAdd: (newTodo: Todo) => void;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
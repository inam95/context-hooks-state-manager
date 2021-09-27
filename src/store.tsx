import React, { useState, createContext, useContext } from 'react';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] => todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false
  }
];

const useTodos = (initial: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(initial);
  const [newTodo, setNewTodo] = useState('');

  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo: () => {
      setTodos(addTodo(todos, newTodo));
    },
    toggleTodo: (id: number) => {
      setTodos(toggleTodo(todos, id));
    },
    updateTodo: (id: number, text: string) => {
      setTodos(updateTodo(todos, id, text));
    },
    deleteTodo: (id: number) => {
      setTodos(removeTodo(todos, id));
    },
    loadTodo: (inTodos: Todo[]) => {
      setTodos(inTodos);
    }
  };
};

// const useTodos = (initial: Todo[]) => useState<Todo[]>(initial);
type UseTodosType = ReturnType<typeof useTodos>;

const TodosContext = createContext<UseTodosType | null>(null);

export const useTodosContext = () => useContext(TodosContext)!;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  return <TodosContext.Provider value={useTodos([])}>{children}</TodosContext.Provider>;
};

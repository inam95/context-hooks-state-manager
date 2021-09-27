import * as React from 'react';
import { Button, Input, Flex, Checkbox, Heading } from '@chakra-ui/react';
import { useTodosContext } from '../store';

const TodoListItems: React.FC = () => {
  const { todos, toggleTodo, updateTodo, deleteTodo } = useTodosContext();

  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox onClick={() => toggleTodo(todo.id)} />
          <Input mx={2} value={todo.text} onChange={(e) => updateTodo(todo.id, e.target.value)} />
          <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
};

const TodoList: React.FC = () => {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
};

export default TodoList;

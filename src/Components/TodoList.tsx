import React from 'react';
import TodoCard from './TodoCard';
import { Todo } from '../model/model';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="TodosList">
      {todos.length != 0 ? (
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))
      ) : (
        <div className="emptyTodo">
          <p>You haven't create any todo</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;

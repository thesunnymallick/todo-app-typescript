import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoMdDoneAll } from 'react-icons/io';
import { Todo } from '../model/model';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoCard: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  // delete todo
  const handelDeletetodo = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id != id);
    setTodos(newTodo);
  };

  // confirm box delete todo
  const confirmDelete = (id: number) => {
    confirmAlert({
      title: 'Are you sure you want to delete this todo?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => handelDeletetodo(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  // handel edit todo
  const handelEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editText };
      } else {
        return todo;
      }
    });
    setEdit(false);
    setTodos(updateTodo);
  };

  //handel todo is done or not
  const handelIsdone = (id: number) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(newTodo);
  };

  return (
    <form
      className="TodoCard"
      onSubmit={(e) => handelEditTodo(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          className="todoText editTodoText"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p className={`todoText ${todo.isDone ? 'todo-done' : ''}`}>{todo.text}</p>
      )}
      <div className="icons">
        <span>
          <AiOutlineDelete onClick={() => confirmDelete(todo.id)} />
        </span>
        <span>
          <AiOutlineEdit
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          />
        </span>
        <span>
          <IoMdDoneAll
            className={`${todo.isDone ? 'active' : ''}`}
            onClick={() => handelIsdone(todo.id)}
          />
        </span>
      </div>
    </form>
  );
};

export default TodoCard;

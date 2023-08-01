import React from 'react';

interface PropsTodo {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handelTodo: (e: React.FormEvent<EventTarget>) => void;
}

const Input = ({ todo, setTodo, handelTodo }: PropsTodo): React.ReactNode => {
  return (
    <form
      className="input_filed"
      onSubmit={handelTodo}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="What is the task today?"
      />
      <button
        className="btn"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Input;

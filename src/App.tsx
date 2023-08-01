import React, { useEffect, useState } from "react";
import "./app.css";
import Input from "./Components/Input";
import { Todo } from "./model/model";
import TodoList from "./Components/TodoList";
const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localTodo = localStorage.getItem("todos") || "[]"
    return JSON.parse(localTodo) as Todo[]
  });


  // Save todo in local strorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  // todod create
  const handelTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), text: todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="app">
      <div className="nav">
        <div className="heading">
          <h1>Get Things Done !</h1>
        </div>
        <Input todo={todo} setTodo={setTodo} handelTodo={handelTodo} />
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default App;

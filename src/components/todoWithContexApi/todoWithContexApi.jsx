import React, { createContext, useContext, useState } from "react";

// Create Context
const TodoContext = createContext();

// Context Provider
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using context
const useTodos = () => useContext(TodoContext);

// Todo Input Component
const TodoInput = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Todo List Component
const TodoList = () => {
  const { todos, toggleTodo, removeTodo } = useTodos();

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

// Main Todo App Component
const TodoAppWithContextApi = () => (
  <TodoProvider>
    <h2>Todo App with Context API</h2>
    <TodoInput />
    <TodoList />
  </TodoProvider>
);

export default TodoAppWithContextApi;

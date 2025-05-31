import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// Redux Toolkit makes Redux easier and less verbose.
// - createSlice automatically generates action creators and action types.
// - configureStore sets up the store with good defaults (like Redux DevTools).
// - Mutating state in reducers is allowed (using Immer under the hood).

// Create todo slice (replaces manual action types, creators, and reducer)
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Directly mutate state (safe with Redux Toolkit)
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      // Find and mutate the todo directly
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      // Return new state (also valid)
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

// Extract actions for use in components
const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

// Configure store (no need for combineReducers if only one slice)
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

// Input component for adding todos
const TodoInput = () => {
  const [input, setInput] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input)); // Use action creator from slice
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

// List component for displaying todos
const TodoList = () => {
  // useSelector automatically subscribes to store updates
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
          <span
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

// Main App component with Provider
const TodoAppWithToolkit = () => (
  // Provider makes the Redux store available to nested components
  <Provider store={store}>
    <h2>Todo App with Redux Toolkit</h2>
    <TodoInput />
    <TodoList />
    {/* 
      Differences from classic Redux:
      - No manual action types or creators needed
      - No switch/case reducer, just object methods
      - Can mutate state directly in reducers
      - Store setup is simpler
    */}
  </Provider>
);

export default TodoAppWithToolkit;
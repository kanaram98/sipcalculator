import React from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

// Actions
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const REMOVE_TODO = "REMOVE_TODO";

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

// Reducer
const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

// Store
const store = createStore(todoReducer);

// Todo Input Component
const TodoInput = () => {
  const [input, setInput] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
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

// Main Todo App Component
const TodoAppWithRedux = () => (
  <Provider store={store}>
    <h2>Todo App with Redux</h2>
    <TodoInput />
    <TodoList />
  </Provider>
);

export default TodoAppWithRedux;

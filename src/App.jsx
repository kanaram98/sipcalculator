import "./App.css";
import Section from "./components/section";
import { TodoApp } from "./components/SimpleTodo/todo";
import SipCalculator from "./components/sipcalculator";
import TodoAppWithContextApi from "./components/todoWithContexApi/todoWithContexApi";
import TodoAppWithRedux from "./components/todoWithRedux/todoWithRedux";

function App() {
  return (
    <>
      <TodoApp />
      <SipCalculator />
      <TodoAppWithContextApi />
      <TodoAppWithRedux />
    </>
  );
}

export default App;

import { StrictMode } from "react";
import Todo from "./components/todo";

function App() {
  return (
    <StrictMode>
      <div>
        <Todo />
      </div>
    </StrictMode>
  );
}

export default App;

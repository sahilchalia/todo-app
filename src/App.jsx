import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [doneTodos, setDoneTodos] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setTodos(data);
          let completedCount = 0;
          data.map((todo, index) => {
            if (todo.completed) {
              completedCount++;
              console.log(index);
            }
          });
          setDoneTodos(completedCount);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const deleteTask = (itemIndex) => {
    const values = [...todos];
    console.log(itemIndex);
    values.splice(itemIndex, 1);
    setTodos(values);
  };

  const addNewTask = (e) => {
    e.preventDefault();
    const newTask = {
      userId: 1,
      id: todos.length + 1,
      title: todo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setTodo("");
    console.log(todos);
  };

  function toggleStatus(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        if (!todo.completed) {
          // state increament
          setDoneTodos((prev) => prev + 1);
        } else {
          // state decreamnt
          setDoneTodos((prev) => prev - 1);
        }
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <div className="app-main-card">
        <div className="header">
          <h4>THINGS TO DO:</h4>
        </div>
        <div className="main">
          <TaskList
            tasks={todos}
            isLoaded={isLoaded}
            error={error}
            deleteTask={deleteTask}
            toggleStatus={toggleStatus}
          />
        </div>
        <form className="footer" onSubmit={addNewTask}>
          <h4>DONE: {doneTodos}</h4>
          <input
            type="text"
            placeholder="Enter new task"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit">
            <span>ADD TASK</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { useRef, useState } from "react";
function App() {
  const [x, setx] = useState([]);
  const [allTasks, setallTasks] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const theTask = useRef();
  const theDesc = useRef();
  const addTask = () => {
    const taskName = theTask.current.value;
    const taskDesc = theDesc.current.value;
    if (taskName === "" || taskDesc === "") {
      alert("Please fillin required fields.!");
      return;
    }
    const newTask = {
      finished: false,
      taskName,
      taskDesc,
    };

    setx([...x, newTask]);
    setallTasks(allTasks + 1);
    setRemaining(remaining + 1);

    theTask.current.value = "";
    theDesc.current.value = "";
    theTask.current.focus();
  };

  const itemChangeState = (index) => {
    const tasks = [...x];
    tasks[index].finished = !tasks[index].finished;
    if (tasks[index].finished) {
      setCompleted(completed + 1);
      setRemaining(remaining - 1);
    } else {
      setCompleted(completed - 1);
      setRemaining(remaining + 1);
    }
    setx(tasks);
  };

  const itemDelete = (index) => {
    const tasks = [...x];
    tasks.splice(index, 1);
    setx(tasks);
    setallTasks(allTasks - 1);
    setRemaining(remaining - 1);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <fieldset>
        <legend>
          <h4>Add New task</h4>
        </legend>
        <div className="input-form">
          <input
            className="add-task"
            ref={theTask}
            type="text"
            placeholder="Add new task....."
          />
          <input
            className="task-desc"
            ref={theDesc}
            type="text"
            placeholder="Describe your task"
          />
          <button type="button" onClick={addTask}>
            Add
          </button>
        </div>
      </fieldset>

      <ul className="tasks-list">
        {x.map((item, index) => {
          return (
            <li className={item.finished ? "done" : ""} key={"task_" + index}>
              <h4>{item.taskName}</h4>
              <p>{item.taskDesc}</p>
              <div className="buttons">
                <button
                  onClick={() => itemChangeState(index)}
                  style={{ padding: "0" }}
                >
                  &#10004;
                </button>
                <button
                  onClick={() => itemDelete(index)}
                  style={{ padding: "0" }}
                >
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="tasks-details">
        <span>All: {allTasks}</span> <span>Completed: {completed}</span>
        <span>Remaining: {remaining}</span>
      </div>
    </div>
  );
}

export default App;

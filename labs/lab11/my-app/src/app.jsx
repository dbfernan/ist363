import React, { useState } from "react";

function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Complete Lab 11", completed: false },
        { id: 2, task: "Review JSX Events and State", completed: false }
    ]);

    const [inputValue, setInputValue] = useState("");

    function toggleComplete(todoId) {
        const updatedTodos = todos.map(function (todoItem) {
        if (todoItem.id === todoId) {
            const updatedItem = Object.assign({}, todoItem);
            updatedItem.completed = !todoItem.completed;
            return updatedItem;
        }
            return todoItem;
        });

        setTodos(updatedTodos);
    }

    function addTask(event) {
        event.preventDefault();

        if (inputValue.trim() === "") {
            return;
        }

        const newTodoItem = {
            id: Date.now(),
            task: inputValue,
            completed: false
        };

        const newTodoList = todos.concat(newTodoItem);
        setTodos(newTodoList);
        setInputValue("");
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>To-Do List</h1>

            <form onSubmit={addTask}>
                <input
                type="text"
                value={inputValue}
                onChange={function (event) {
                    setInputValue(event.target.value);
                }}
                placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>

            <ul style={{ listStyle: "none", padding: 0 }}>
                { todos.map(function(todoItem) {
                    let symbol = "❎";
                    if (todoItem.completed === true) {
                        symbol = "✅";
                    }

                    let textStyle = "none";
                    if (todoItem.completed === true) {
                        textStyle = "line-through";
                    }

                    return (
                        <li key={todoItem.id}>
                            <span style={{textDecoration: textStyle}}>
                                {todoItem.task}
                            </span>
                            <button onClick={function() { toggleComplete(todoItem.id); }}>
                                {symbol}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;

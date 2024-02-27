import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  function separateTodos() {
    const importantTodos = todos.filter(todo => todo.important);
    const defaultTodos = todos.filter(todo => !todo.important);
    return { importantTodos, defaultTodos };
  }

  function handleAddTodo(event) {
    var x;
    x = document.getElementById("todo-input").value;
    if (x == "") {
      event.preventDefault();
      return false;
    }

    else {
      event.preventDefault();
      const input = event.target.elements.todo;
      const todo = {
        text: input.value,
        completed: false,
        editing: false,
      };

      setTodos([...todos, todo]);
      input.value = '';
    }
  }

  function handleCompleteTodo(todo) {
    const newTodos = todos.map(t => (t === todo ? { ...t, completed: !t.completed } : t));
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function handleDeleteTodo(todo) {
    const newTodos = todos.filter(t => t !== todo);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function handleClear() {
    localStorage.clear();
    setTodos([]);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleEditTodo(todo) {
    const newTodos = todos.map(t =>
      t === todo ? { ...t, editing: true } : t
    );
    setTodos(newTodos);
  }

  function handleSaveTodo(todo, event) {
    event.preventDefault();
    const input = event.target.elements.editTodo;
    const newTodos = todos.map(t =>
      t === todo ? { ...t, text: input.value, editing: false } : t
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function handleMarkImportant(todo) {
    const newTodos = todos.map(t =>
      t === todo ? { ...t, important: !t.important } : t
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function toggleAddTodoVisibility() {
    const addTodoContainer = document.querySelector('.add-todo-container');
    addTodoContainer.classNameList.toggle('show');
  }

  const { importantTodos, defaultTodos } = separateTodos();

  return (
    <div className="main">
      <div className="top">
        <button className="check-icon-wrapper">
          <svg width="1677" height="1677" viewBox="0 0 1677 1677" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1677" height="1677" rx="838.5" fill="#4F4F4F"/>
          <rect x="759.783" y="1381.01" width="278.955" height="1180.6" rx="139.478" transform="rotate(-140.35 759.783 1381.01)" fill="url(#paint0_linear_68_11)"/>
          <rect x="212" y="740.215" width="278.955" height="817.098" rx="139.478" transform="rotate(-38.385 212 740.215)" fill="url(#paint1_linear_68_11)"/>
          <path d="M563 1183L625.769 1106.5L744.501 962L851.694 1097.97C899.41 1158.49 889.132 1246.22 828.719 1294.08C768.292 1341.95 680.519 1331.86 632.528 1271.53L625.769 1263.03L563 1183Z" fill="url(#paint2_linear_68_11)"/>
          <path d="M855.819 1265.43C901.265 1197.38 871.315 1127.98 855.398 1104.93L920.1 1187.66L855.819 1265.43Z" fill="#C4F4EF"/>
          <defs>
          <linearGradient id="paint0_linear_68_11" x1="899.261" y1="1381.01" x2="899.261" y2="2561.6" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E2D3F0"/>
          <stop offset="1" stop-color="#BF7AFF"/>
          </linearGradient>
          <linearGradient id="paint1_linear_68_11" x1="351.478" y1="740.215" x2="351.478" y2="1557.31" gradientUnits="userSpaceOnUse">
          <stop stop-color="#A7EDE5"/>
          <stop offset="1" stop-color="#C5F4EF"/>
          </linearGradient>
          <linearGradient id="paint2_linear_68_11" x1="634.764" y1="1048.93" x2="828.869" y2="1293.96" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F30000" stop-opacity="0.04"/>
          <stop offset="1" stop-color="#E6F3FF" stop-opacity="0"/>
          <stop offset="1" stop-opacity="0.53"/>
          </linearGradient>
          </defs>
          </svg>

        </button>

        <h1>Tasks</h1>
      </div>

      {separateTodos().importantTodos.length > 0 ? (
        <>
          <h2>Important</h2>
          <ul>
            {separateTodos().importantTodos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                handleCompleteTodo={() => handleCompleteTodo(todo)}
                handleEditTodo={() => handleEditTodo(todo)}
                handleSaveTodo={event => handleSaveTodo(todo, event)}
                handleDeleteTodo={() => handleDeleteTodo(todo)}
                handleMarkImportant={() => handleMarkImportant(todo)}
              />
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}

      <h2>Tasks</h2>

      <ul>
        {separateTodos().defaultTodos.length > 0 ? (
          separateTodos().defaultTodos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              handleCompleteTodo={() => handleCompleteTodo(todo)}
              handleEditTodo={() => handleEditTodo(todo)}
              handleSaveTodo={event => handleSaveTodo(todo, event)}
              handleDeleteTodo={() => handleDeleteTodo(todo)}
              handleMarkImportant={() => handleMarkImportant(todo)}
            />
          ))
        ) : (
          <></>
        )}
      </ul>

      {(importantTodos.length === 0 && defaultTodos.length === 0) &&
        <div className="done">
          <p className="empty-state">No pending tasks</p>
        </div>
      }

      <form onSubmit={handleAddTodo} className="add-todo-container">
        <button type="button" onClick={toggleAddTodoVisibility} className="no-fill-icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M36tabinde8 368L144 144M368 144L144 368" /></svg>
        </button>

        <input type="text" name="todo" id="todo-input" autoComplete="off" className="add-input" placeholder="What do you need to do?" />
        <button type="submit" className="add-button" onClick={toggleAddTodoVisibility}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">
            <path d="M8 3.5V12.5M12.5 8H3.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Add</span>
        </button>
      </form>

      <button onClick={toggleAddTodoVisibility} className="mobile-toggle-drawer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3.5V12.5M12.5 8H3.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div >
  );
}

export default TodoList;

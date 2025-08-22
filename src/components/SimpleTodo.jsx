import { useState } from 'react';

function SimpleTodo() {
    // State for the list of todos
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a to-do app', completed: false },
    ]);

    // State for the new todo input
    const [newTodo, setNewTodo] = useState('');

    // Function to handle adding a new todo
    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;

        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    // Function to handle toggling a todo's completion status
    const handleToggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Function to handle deleting a todo
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-sans">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">To-Do List</h1>

                <form onSubmit={handleAddTodo} className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task"
                        className="flex-grow bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-2 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-neutral-900 font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Add
                    </button>
                </form>

                <ul>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg mb-3"
                        >
              <span
                  onClick={() => handleToggleComplete(todo.id)}
                  className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="bg-red-500 hover:bg-red-600 text-neutral-900 font-bold py-1 px-3 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SimpleTodo;
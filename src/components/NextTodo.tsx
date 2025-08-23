// src/NextTodo.tsx

import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Todo, Filter } from '../types/todo'; // Import shared types

function NextTodo() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [
                { id: 1, text: 'Learn React Hooks', completed: true },
                { id: 2, text: 'Build a to-do app', completed: false },
                { id: 3, text: 'Master component composition', completed: false },
            ];
        }
    });

    // Tell useState that this state will be a string
    const [newTodo, setNewTodo] = useState<string>('');
    // Tell useState that this state will conform to the Filter type
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Type the event argument for the form handler
    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    // Type the id argument for the toggle handler
    const handleToggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Type the id argument for the delete handler
    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="bg-gray-900 text-white flex items-center justify-center font-sans">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">TodoNext</h1>

                <form onSubmit={handleAddTodo} className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={newTodo}
                        // Type the event argument for the input handler
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
                        placeholder="Add a new task"
                        className="flex-grow bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-2 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Add
                    </button>
                </form>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`font-bold py-2 px-4 rounded-lg transition-colors ${
                            filter === 'all'
                                ? 'bg-cyan-400 text-cyan-950'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`font-bold py-2 px-4 rounded-lg transition-colors ${
                            filter === 'active'
                                ? 'bg-cyan-400 text-cyan-950'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`font-bold py-2 px-4 rounded-lg transition-colors ${
                            filter === 'completed'
                                ? 'bg-cyan-400 text-cyan-950'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        Completed
                    </button>
                </div>

                <ul>
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDeleteTodo}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NextTodo;
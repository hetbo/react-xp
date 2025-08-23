import React from 'react';
import { Todo } from '../types/todo';

type TodoItemProps = {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <li className="flex items-center justify-between bg-gray-700 p-4 rounded-lg mb-3 transition-all duration-300 ease-in-out">
      <span
          onClick={() => onToggleComplete(todo.id)}
          className={`cursor-pointer transition-colors duration-300 ${
              todo.completed
                  ? 'line-through text-gray-400'
                  : 'text-white'
          }`}
      >
        {todo.text}
      </span>
            <button
                onClick={() => onDelete(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition-colors"
            >
                Delete
            </button>
        </li>
    );
}

export default TodoItem;
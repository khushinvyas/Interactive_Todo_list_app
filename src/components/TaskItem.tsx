
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ id, text, completed, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div 
      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 mb-2 group animate-task-appear hover:shadow-md transition-all"
    >
      <button 
        onClick={() => onToggle(id)}
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors",
          completed 
            ? "bg-todo border-todo" 
            : "border-gray-300 hover:border-todo"
        )}
      >
        {completed && <Check className="text-white" size={12} />}
      </button>
      
      <span 
        className={cn(
          "flex-grow text-left transition-all",
          completed && "text-todo-completed line-through"
        )}
      >
        {text}
      </span>
      
      <button 
        onClick={() => onDelete(id)}
        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;

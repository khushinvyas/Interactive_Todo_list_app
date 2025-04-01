
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TaskItem from './TaskItem';
import { logAction } from '@/lib/logger';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: uuidv4(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    logAction('add', `Added task: ${newTask}`);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updated = { ...task, completed: !task.completed };
        logAction('toggle', `${updated.completed ? 'Completed' : 'Uncompleted'} task: ${task.text}`);
        return updated;
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    
    if (taskToDelete) {
      logAction('delete', `Deleted task: ${taskToDelete.text}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="border-gray-200 focus-visible:ring-todo"
        />
        <Button 
          onClick={addTask}
          className="bg-todo hover:bg-todo-hover flex-shrink-0"
        >
          <Plus size={18} className="mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You have no tasks yet. Add one to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
      
      {tasks.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          <p>
            {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;

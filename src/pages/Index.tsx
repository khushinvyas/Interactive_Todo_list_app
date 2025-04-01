
import React from 'react';
import TodoList from '@/components/TodoList';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-todo-light to-white">
      <div className="container px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Harmony</h1>
          <p className="text-gray-600">Keep track of your tasks with ease</p>
        </header>
        
        <main>
          <TodoList />
        </main>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Built with React, Tailwind, and ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

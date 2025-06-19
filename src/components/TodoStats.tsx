
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Todo } from './TodoApp';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalTodos}</div>
          <div className="text-sm text-gray-600">Total</div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{activeTodos}</div>
          <div className="text-sm text-gray-600">Active</div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
          <div className="text-sm text-gray-600">Progress</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoStats;

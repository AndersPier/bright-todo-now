
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TodoItem from './TodoItem';
import { Todo } from './TodoApp';

interface TodoColumnsProps {
  todos: Todo[];
  editingId: string | null;
  editText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
  onEditKeyPress: (e: React.KeyboardEvent) => void;
  onClearCompleted: () => void;
}

const TodoColumns: React.FC<TodoColumnsProps> = ({
  todos,
  editingId,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
  onEditKeyPress,
  onClearCompleted,
}) => {
  const allTodos = todos.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  
  const activeTodos = todos.filter(todo => !todo.completed).sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  
  const completedTodos = todos.filter(todo => todo.completed).sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const renderEmptyState = (type: 'all' | 'active' | 'completed') => (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          {type === 'completed' ? 'No completed tasks' : 
           type === 'active' ? 'No active tasks' : 'No todos yet'}
        </h3>
        <p className="text-gray-500">
          {type === 'all' ? 'Add your first todo above to get started!' : 
           `Create some ${type} tasks to see them here`}
        </p>
      </CardContent>
    </Card>
  );

  const renderTodoList = (todoList: Todo[], type: 'all' | 'active' | 'completed') => (
    <div className="space-y-3">
      {todoList.length === 0 ? (
        renderEmptyState(type)
      ) : (
        todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editText={editText}
            onToggle={() => onToggle(todo.id)}
            onDelete={() => onDelete(todo.id)}
            onStartEdit={() => onStartEdit(todo.id, todo.text)}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onEditTextChange={onEditTextChange}
            onEditKeyPress={onEditKeyPress}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* All Todos Column */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            All
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {allTodos.length}
            </Badge>
          </h2>
        </div>
        {renderTodoList(allTodos, 'all')}
      </div>

      {/* Active Todos Column */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Active
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {activeTodos.length}
            </Badge>
          </h2>
        </div>
        {renderTodoList(activeTodos, 'active')}
      </div>

      {/* Completed Todos Column */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {completedTodos.length}
            </Badge>
          </h2>
          {completedTodos.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCompleted}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              Clear All
            </Button>
          )}
        </div>
        {renderTodoList(completedTodos, 'completed')}
      </div>
    </div>
  );
};

export default TodoColumns;

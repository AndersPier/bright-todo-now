
import React from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanitizeInput, validateInput } from '@/utils/security';
import { Todo } from './TodoApp';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editText: string;
  onToggle: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
  onEditKeyPress: (e: React.KeyboardEvent) => void;
}

const categoryColors = {
  work: 'bg-blue-100 text-blue-800 border-blue-200',
  personal: 'bg-green-100 text-green-800 border-green-200',
  shopping: 'bg-orange-100 text-orange-800 border-orange-200',
  health: 'bg-pink-100 text-pink-800 border-pink-200',
};

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-gray-100 text-gray-800 border-gray-200',
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
  onEditKeyPress,
}) => {
  const handleTextChange = (text: string) => {
    if (validateInput(text)) {
      onEditTextChange(sanitizeInput(text));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && validateInput(editText)) {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            {todo.completed && <Check className="w-4 h-4" />}
          </Button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={editText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                  autoFocus
                  maxLength={500}
                />
                <Button
                  size="sm"
                  onClick={onSaveEdit}
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!validateInput(editText)}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onCancelEdit}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    } cursor-pointer break-words`}
                    onClick={onToggle}
                    dangerouslySetInnerHTML={{ __html: sanitizeInput(todo.text) }}
                  />
                </div>
                <div className="flex gap-2">
                  <Badge className={`${categoryColors[todo.category]} text-xs`}>
                    {todo.category}
                  </Badge>
                  <Badge className={`${priorityColors[todo.priority]} text-xs`}>
                    {todo.priority}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onStartEdit}
                className="text-gray-400 hover:text-blue-500 hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {todo.completed && (
          <div className="mt-2 text-xs text-gray-400">
            Completed on {todo.createdAt.toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoItem;

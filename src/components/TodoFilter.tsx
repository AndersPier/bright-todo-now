
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter, onClearCompleted }) => {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''}
            >
              Completed
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            Clear Completed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoFilter;

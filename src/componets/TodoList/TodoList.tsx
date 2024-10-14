import { FC, useMemo, useState } from 'react';
import './TodoList.scss';
import { Todo, StatusFilter } from '../../types';
import { filterTodos } from '../../utils';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  statusFilter: StatusFilter;
}

export const TodoList: FC<Props> = ({ todos, statusFilter }) => {
  const [editingTodo] = useState<Todo | null>(null);
  const [loadingTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(
    () => filterTodos(todos, statusFilter),
    [todos, statusFilter],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const isCurrentTotoBeingEditing = editingTodo?.id === todo.id;
        const isCurrentTotoLoading = loadingTodo?.id === todo.id;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isCurrentTotoBeingEditing={isCurrentTotoBeingEditing}
            isCurrentTotoLoading={isCurrentTotoLoading}
          />
        );
      })}
    </section>
  );
};

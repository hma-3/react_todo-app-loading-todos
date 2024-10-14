import { useEffect, useMemo, useState } from 'react';
import './TodoApp.scss';

import { getTodos } from '../../api/todos';
import { StatusFilter, Todo } from '../../types';
import { countLeftTodos } from '../../utils';

import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';
import { TodoFooter } from '../TodoFooter';
import { TodoErrorNotification } from '../TodoErrorNotification';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [leftTodos, setLeftTodos] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState(StatusFilter.All);

  const todosAmount = useMemo(() => todos.length, [todos]);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(currentTodos => {
        setTodos(currentTodos);
        setLeftTodos(countLeftTodos(currentTodos));
      })
      .catch(error => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);

        throw error;
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader leftTodos={leftTodos} />

        <TodoList todos={todos} statusFilter={statusFilter} />

        {!!todos.length && (
          <TodoFooter
            leftTodos={leftTodos}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            todosAmount={todosAmount}
          />
        )}
      </div>

      <TodoErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

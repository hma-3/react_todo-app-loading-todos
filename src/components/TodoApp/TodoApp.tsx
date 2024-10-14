import { useCallback, useEffect, useMemo, useState } from 'react';
import './TodoApp.scss';

import { getTodos } from '../../api/todos';
import { StatusFilter, Todo, ErrorMessages } from '../../types';
import { countLeftTodos } from '../../utils';

import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';
import { TodoFooter } from '../TodoFooter';
import { TodoErrorNotification } from '../TodoErrorNotification';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [leftTodos, setLeftTodos] = useState(0);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.DEFAULT,
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  const todosAmount = useMemo(() => todos.length, [todos]);

  const handleResetErrorMessage = useCallback(
    () => setErrorMessage(ErrorMessages.DEFAULT),
    [],
  );

  useEffect(() => {
    handleResetErrorMessage();

    getTodos()
      .then(currentTodos => {
        setTodos(currentTodos);
        setLeftTodos(countLeftTodos(currentTodos));
      })
      .catch(error => {
        setErrorMessage(ErrorMessages.LOADING_TODOS);
        setTimeout(handleResetErrorMessage, 3000);

        throw error;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader leftTodos={leftTodos} todosAmount={todosAmount} />

        {!!todosAmount && (
          <>
            <TodoList todos={todos} statusFilter={statusFilter} />

            <TodoFooter
              leftTodos={leftTodos}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              todosAmount={todosAmount}
            />
          </>
        )}
      </div>

      <TodoErrorNotification
        errorMessage={errorMessage}
        onResetErrorMessage={handleResetErrorMessage}
      />
    </div>
  );
};

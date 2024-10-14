import React from 'react';

import { USER_ID } from './api/todos';
import { UserWarning } from './componets/UserWarning';
import { TodoApp } from './componets/TodoApp';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return <TodoApp />;
};

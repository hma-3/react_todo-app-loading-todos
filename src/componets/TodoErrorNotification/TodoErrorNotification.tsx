import { FC } from 'react';
import cn from 'classnames';
import './TodoErrorNotification.scss';

interface Props {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export const TodoErrorNotification: FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};

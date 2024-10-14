/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import cn from 'classnames';
import './TodoItem.scss';
import { Todo } from '../../types';

interface Props {
  todo: Todo;
  isCurrentTotoBeingEditing: boolean;
  isCurrentTotoLoading: boolean;
}

export const TodoItem: FC<Props> = ({
  todo,
  isCurrentTotoBeingEditing,
  isCurrentTotoLoading,
}) => {
  const { id, completed, title } = todo;

  return (
    <div
      key={id}
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {isCurrentTotoBeingEditing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isCurrentTotoLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

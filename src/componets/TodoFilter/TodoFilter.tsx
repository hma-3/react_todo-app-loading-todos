import { FC } from 'react';
import cn from 'classnames';
import './TodoFilter.scss';
import { StatusFilter } from '../../types';

interface Props {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

export const TodoFilter: FC<Props> = ({ statusFilter, setStatusFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(StatusFilter).map(status => {
        const isSelectedCurrentStatus = statusFilter === status;

        return (
          <a
            key={status}
            data-cy={`FilterLink${status}`}
            href={`#/${status === StatusFilter.All ? '' : status.toLocaleLowerCase()}`}
            className={cn('filter__link', {
              selected: isSelectedCurrentStatus,
            })}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </a>
        );
      })}
    </nav>
  );
};

import React from 'react';
import Style from './Paginator.module.css';
import Paginator from './Paginator';

type PropsType = {
  countPages: number;
  pageNumber: number;
  onPageChanged: (pageNumber: number) => void;
};

const PaginatorContainer: React.FC<PropsType> = ({
  countPages,
  pageNumber,
  onPageChanged,
}) => {
  const pages = [];
  if (countPages >= 15) {
    if (pageNumber < 8) {
      for (let i = 1; i <= 15; i += 1) {
        pages.push(i);
      }
    } else if (pageNumber > countPages - 7) {
      for (let i = countPages - 15; i <= countPages; i += 1) {
        pages.push(i);
      }
    } else {
      for (let i = pageNumber - 7; i <= pageNumber + 7; i += 1) {
        pages.push(i);
      }
    }
  } else {
    for (let i = 1; i <= countPages; i += 1) {
      pages.push(i);
    }
  }

  const resultPages: Array<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >
  > = pages.map(
    (
      item,
      index
    ): React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    > => (
      <span
        key={item}
        role="button"
        tabIndex={0}
        onClick={() => onPageChanged(index)}
        className={pageNumber === index ? Style['selected-page'] : ''}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onPageChanged(index);
          }
        }}
      >
        {item}
      </span>
    )
  );

  return <Paginator pages={resultPages} />;
};

export default PaginatorContainer;

import React from 'react';
import TableLine from './TableLine';
import Style from './PointsTable.module.css';
import { NavLink } from 'react-router-dom';
import PaginatorContainer from '../common/Paginator';
import { IPoint } from '../../types/pointReducerTypes';

type PropsType = {
  pageNumber: number;
  countPages: number;
  points: Array<IPoint> | [];
  onPageChanged: (pageNumber: number) => void;
};

const PointsTable: React.FC<PropsType> = ({
  pageNumber,
  countPages,
  onPageChanged,
  points,
}) => {
  const arrayPoints = points.map((item: IPoint) =>
    item.id === null ||
    item.id === undefined ||
    item.name === null ||
    item.name === undefined ||
    item.address === null ||
    item.address === undefined ? null : (
      <TableLine
        key={item.id}
        id={item.id}
        name={item.name}
        address={item.address}
        isTitle={false}
      />
    )
  );
  return (
    <div className={Style.root}>
      <div className={Style.container}>
        <h1 className={Style.title}>Объекты бизнеса</h1>
        <NavLink to="/edit-points/create">Создать новую точку</NavLink>
        <table className={Style.table}>
          <TableLine id="Идент." name="Имя" address="Адресс" isTitle={true} />
          {arrayPoints}
        </table>
        <div className={Style.bottom}>
          <PaginatorContainer
            pageNumber={pageNumber}
            countPages={countPages}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsTable;

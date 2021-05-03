import React from 'react';
import Style from './TableLine.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number | string;
  name: number | string;
  address: number | string;
  isTitle: boolean;
};

const TableLine: React.FC<PropsType> = ({ id, name, address, isTitle }) => (
  <>
    {isTitle == true ? (
      <tr id={`points-title`} className={Style.root}>
        <th className={`${Style.ceil} ${Style.id}`}>{id}</th>
        <th className={`${Style.ceil} ${Style.name}`}>{name}</th>
        <th className={`${Style.ceil} ${Style.address}`}>{address}</th>
        <th className={`${Style.ceil} ${Style.edit}`}>Edit</th>
        <th className={`${Style.ceil} ${Style['qr-code']}`}>Point QR-codes</th>
      </tr>
    ) : (
      <tr id={`points${id}`} className={Style.root}>
        <td className={`${Style.ceil} ${Style.id}`}>{id}</td>
        <td className={`${Style.ceil} ${Style.name}`}>{name}</td>
        <td className={`${Style.ceil} ${Style.address}`}>{address}</td>
        <td className={`${Style.ceil} ${Style.edit}`}>
          <NavLink to={`/edit-points/edit/${id}`}>Edit</NavLink>
        </td>
        <td className={`${Style.ceil} ${Style['qr-code']}`}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/feedback/create/${id}`}
            alt="Point QR-code"
          />
        </td>
      </tr>
    )}
  </>
);

export default TableLine;

import React from 'react';
import Style from './TableLine.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number | string;
  name: number | string;
  address: number | string;
  isTitle: boolean;
  openModal: () => void;
};

const TableLine: React.FC<PropsType> = ({
  id,
  name,
  address,
  isTitle,
  openModal,
}) => (
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
          <NavLink
            className={Style.link}
            to={`/edit-points/edit/${id}/${name}/${address}`}
          >
            Edit
          </NavLink>
        </td>
        <td className={`${Style.ceil} ${Style['qr-code']}`}>
          <button className={Style.link} onClick={openModal}>
            View QR-code
          </button>
        </td>
      </tr>
    )}
  </>
);

export default TableLine;

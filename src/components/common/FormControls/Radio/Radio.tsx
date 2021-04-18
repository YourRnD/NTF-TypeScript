import React from 'react';
import { IRadioAdditionallyProps } from '../../../../types/componentsTypes';
import Style from './Radio.module.css';

type PropsType = {
  placeholder: string;
  name: string;
  onChange: () => void;
  selectedValue: string;
  error: string | null;
  valuesArray: Array<IRadioAdditionallyProps> | undefined;
};

const Radio: React.FC<PropsType> = ({
  placeholder,
  name,
  onChange,
  error,
  valuesArray,
  selectedValue,
}) => {
  if (valuesArray === undefined) return <></>;

  const RadioElements: Array<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  > = valuesArray.map(
    (
      item: IRadioAdditionallyProps
    ): React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > => {
      return (
        <>
          {selectedValue === item.value ? (
            <input
              type="radio"
              id={item.id}
              key={item.id}
              value={item.value}
              name={name}
              onChange={onChange}
              checked
            />
          ) : (
            <input
              type="radio"
              id={item.id}
              key={item.id}
              value={item.value}
              name={name}
              onChange={onChange}
            />
          )}
          <label htmlFor={item.id} title={placeholder}></label>
        </>
      );
    }
  );

  return (
    <div className={Style['rating-area']}>
      {RadioElements}
      {error !== null ? <p className={Style.error}>{error}</p> : null}
    </div>
  );
};

export default Radio;

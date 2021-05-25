import React from 'react';
import { IRadioAdditionallyProps } from '../../../../types/componentsTypes';
import Style from './Radio.module.css';
import RadioInput from './RadioInput';

type PropsType = {
  placeholder: string;
  name: string;
  onChange: () => void;
  error: string | null;
  valuesArray: Array<IRadioAdditionallyProps> | undefined;
};

const Radio: React.FC<PropsType> = ({
  placeholder,
  name,
  onChange,
  error,
  valuesArray,
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
        <RadioInput
          key={item.id}
          id={item.id}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={item.value}
        />
      );
    }
  );

  return (
    <div data-testid="elem" className={Style['rating-area']}>
      {RadioElements}
      {error !== null ? (
        <p data-testid="error" className={Style.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Radio;

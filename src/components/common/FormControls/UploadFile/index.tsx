import React from 'react';
import { connect } from 'react-redux';
import { setUploadImage } from '../../../../redux/actions/commonAction';
import { RootState } from '../../../../redux/reducers';
import { IUploadImage } from '../../../../types/commonReducerTypes';
import { FormControlsType } from '../../../../types/componentsTypes';
import UploadFile from './UploadFile';

interface MapDispatchPropsType {
  setUploadImage: (uploadImage: IUploadImage) => void;
}

type PropsType = FormControlsType & MapDispatchPropsType;

const UploadFileContainer: React.FC<PropsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
  setUploadImage,
}) => {
  const uploadEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e?.currentTarget !== null || e?.currentTarget !== undefined) {
      const reader = new FileReader();
      const elem = e.currentTarget;
      const image: File | null | undefined =
        elem.files !== null && elem.files[0] !== null ? elem.files[0] : null;
      if (image === null || image === undefined) {
        return;
      }
      reader.onloadend = () => {
        setUploadImage({
          name: image.name,
          type: image.type,
          imageInBase64: reader.result,
        });
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <UploadFile
      name={field.name}
      id={anotherArg.id !== undefined ? anotherArg.id : ''}
      fileName={anotherArg.fileName !== undefined ? anotherArg.fileName : ''}
      placeholder={placeholder}
      onChange={uploadEvent}
      error={form.errors[`${field.name}`] ? form.errors[`${field.name}`] : null}
    />
  );
};

export default connect<{}, MapDispatchPropsType, FormControlsType, RootState>(
  null,
  {
    setUploadImage,
  }
)(UploadFileContainer);

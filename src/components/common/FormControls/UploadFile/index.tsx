import React from 'react';
import { connect } from 'react-redux';
import { setUploadImage } from '../../../../redux/actions/commonAction';
import { RootState } from '../../../../redux/reducers';
import { IUploadImage } from '../../../../types/commonReducerTypes';
import { FormControlsType } from '../../../../types/componentsTypes';
import UploadFile from './UploadFile';

type MapStatePropsType = {
  uploadImages: Array<IUploadImage> | null;
};

interface MapDispatchPropsType {
  setUploadImage: (uploadImages: Array<IUploadImage> | null) => void;
}

type PropsType = FormControlsType & MapDispatchPropsType & MapStatePropsType;

const UploadFileContainer: React.FC<PropsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
  setUploadImage,
  uploadImages,
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
        if (uploadImages === null) {
          setUploadImage([
            {
              name: image.name,
              type: image.type,
              imageInBase64: reader.result === null ? '' : reader.result,
            },
          ]);
          form.setFieldValue('image', [
            {
              name: image.name,
              type: image.type,
              imageInBase64: reader.result === null ? '' : reader.result,
            },
          ]);
        } else {
          const uploadImagesCopy: Array<IUploadImage> = [];

          uploadImages.forEach((item) => {
            item?.name && item.name === anotherArg.fileName
              ? uploadImagesCopy.push({
                  name: image.name,
                  type: image.type,
                  imageInBase64: reader.result === null ? '' : reader.result,
                })
              : uploadImagesCopy.push(item);
          });
          setUploadImage(uploadImagesCopy);
          form.setFieldValue('image', uploadImagesCopy);
        }
      };
      reader.readAsDataURL(image);
    }
  };

  const clearField = (): void => {
    if (uploadImages === null) {
      return;
    }

    const uploadImagesCopy: Array<IUploadImage> = [];

    uploadImages.forEach((item) => {
      item?.name && item.name === anotherArg.fileName
        ? null
        : uploadImagesCopy.push(item);
    });

    setUploadImage(uploadImagesCopy.length === 0 ? null : uploadImagesCopy);

    form.setFieldValue('image', uploadImagesCopy);
  };

  if (
    anotherArg.maxElem === undefined ||
    document.querySelectorAll(`input[name="${field.name}"]`).length >=
      anotherArg.maxElem
  ) {
    return <></>;
  } else {
    return (
      <UploadFile
        name={field.name}
        id={anotherArg.id !== undefined ? anotherArg.id : ''}
        fileName={anotherArg.fileName !== undefined ? anotherArg.fileName : ''}
        placeholder={placeholder}
        onChange={uploadEvent}
        clear={clearField}
        error={
          form.errors[`${field.name}`] ? form.errors[`${field.name}`] : null
        }
      />
    );
  }
};

const mapToStateProps = (state: RootState): MapStatePropsType => ({
  uploadImages: state.common.uploadImages,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  FormControlsType,
  RootState
>(mapToStateProps, {
  setUploadImage,
})(UploadFileContainer);

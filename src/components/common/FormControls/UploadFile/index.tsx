import React from 'react';
import { connect } from 'react-redux';
import {
  setError,
  setUploadImage,
} from '../../../../redux/actions/commonAction';
import { RootState } from '../../../../redux/reducers';
import {
  CommonActionTypes,
  IError,
  IUploadImage,
} from '../../../../types/commonReducerTypes';
import {
  FormControlsType,
  IImageValidateError,
} from '../../../../types/componentsTypes';
import UploadFile from './UploadFile';

type MapStatePropsType = {
  uploadImages: Array<IUploadImage> | null;
};

interface MapDispatchPropsType {
  setUploadImage: (
    uploadImages: Array<IUploadImage> | null,
    countImages: number
  ) => void;
  setError: (error: IError, isError: boolean) => CommonActionTypes;
}

type PropsType = FormControlsType & MapDispatchPropsType & MapStatePropsType;

const UploadFileContainer: React.FC<PropsType> = ({
  anotherArg,
  field,
  placeholder,
  form,
  setUploadImage,
  uploadImages,
  setError,
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
        if (uploadImages === null || uploadImages.length === 1) {
          setUploadImage(
            [
              {
                name: image.name,
                type: image.type,
                imageInBase64: reader.result === null ? '' : reader.result,
                id: anotherArg?.id ? anotherArg.id : '',
              },
            ],
            1
          );
          form.setFieldValue('image', [
            {
              name: image.name,
              type: image.type,
              imageInBase64: reader.result === null ? '' : reader.result,
              id: anotherArg?.id ? anotherArg.id : '',
            },
          ]);
        } else {
          const uploadImagesCopy: Array<IUploadImage> = [];

          uploadImages.forEach((item) => {
            item?.name !== undefined && item.name === anotherArg.fileName
              ? uploadImagesCopy.push({
                  name: image.name,
                  type: image.type,
                  imageInBase64: reader.result === null ? '' : reader.result,
                  id: anotherArg?.id ? anotherArg.id : '',
                })
              : uploadImagesCopy.push(item);
          });

          setUploadImage(uploadImagesCopy, uploadImagesCopy.length);
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
      item?.name !== undefined && item.name === anotherArg.fileName
        ? null
        : uploadImagesCopy.push(item);
    });

    setUploadImage(
      uploadImagesCopy.length === 0 ? null : uploadImagesCopy,
      uploadImagesCopy.length === 0 ? 1 : uploadImagesCopy.length
    );

    form.setFieldValue('image', uploadImagesCopy);
  };

  const addField = (): void => {
    if (
      uploadImages !== null &&
      anotherArg?.maxElem &&
      uploadImages.length >= anotherArg.maxElem
    ) {
      setError(
        {
          status: 400,
          message: 'Maximum number of photos reached!',
        },
        true
      );
      return;
    }

    if (anotherArg.fileName === undefined || anotherArg.fileName === '') {
      setError(
        {
          status: 400,
          message:
            'Unable to add container for photo! Other containers are not full!',
        },
        true
      );
      return;
    }

    const uploadImagesCopy: Array<IUploadImage> | null = uploadImages;

    uploadImagesCopy === null
      ? null
      : uploadImagesCopy.push({
          name: '',
          type: '',
          imageInBase64: '',
          id: '',
        });

    setUploadImage(
      uploadImagesCopy !== null
        ? uploadImagesCopy
        : [
            {
              name: '',
              type: '',
              imageInBase64: '',
              id: '',
            },
          ],
      uploadImagesCopy === null ? 1 : uploadImagesCopy.length
    );

    form.setFieldValue(
      'image',
      uploadImagesCopy !== null
        ? uploadImagesCopy
        : [
            {
              name: '',
              type: '',
              imageInBase64: '',
              id: '',
            },
          ]
    );
  };

  let error: string | null = null;

  if (form.errors[`${field.name}`]) {
    if (anotherArg.fileName != '') {
      form.errors[`${field.name}`].forEach((element: IImageValidateError) => {
        element.id === anotherArg.id ? (error = element.message) : null;
      });
    } else {
      form.errors[`${field.name}`].forEach((element: IImageValidateError) => {
        element.id === 'image' ? (error = element.message) : null;
      });
    }
  }

  if (
    anotherArg.maxElem === undefined ||
    document.querySelectorAll(`input[name="${field.name}"]`).length >
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
        add={addField}
        error={error}
        maxElem={anotherArg.maxElem}
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
  setError,
})(UploadFileContainer);

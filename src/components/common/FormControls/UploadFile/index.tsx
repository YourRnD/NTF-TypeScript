import React from 'react';
import { connect } from 'react-redux';
import {
  changeUploadModal,
  setUploadImage,
} from '../../../../redux/actions/commonAction';
import { RootState } from '../../../../redux/reducers';
import {
  CommonActionTypes,
  IUploadImages,
} from '../../../../types/commonReducerTypes';
import {
  FormControlsType,
  IUploadModalImages,
} from '../../../../types/componentsTypes';
import UploadFile from './UploadFile';

type MapStatePropsType = {
  uploadImages: IUploadImages;
};

interface MapDispatchPropsType {
  changeModal: (isUploadModal: boolean) => CommonActionTypes;
  setImage: (uploadImages: IUploadImages) => void;
}

type PropsType = FormControlsType & MapDispatchPropsType & MapStatePropsType;

const UploadFileContainer: React.FC<PropsType> = ({
  changeModal,
  uploadImages,
  setImage,
  form,
  anotherArg,
}) => {
  const openModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await e.currentTarget?.parentNode?.querySelector('input')?.click();
  };

  const hideModal = () => {
    changeModal(false);
  };

  const images: Array<IUploadModalImages> = [];

  for (const key in uploadImages) {
    if ({}.hasOwnProperty.call(uploadImages, key)) {
      const obj = uploadImages[key];

      if (typeof obj !== 'boolean' && obj?.imageInBase64 !== undefined) {
        images.push({
          image: `${obj.imageInBase64}`,
          id: key,
        });
      }
    }
  }

  const uploadEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e?.currentTarget !== null || e?.currentTarget !== undefined) {
      const elem = e.currentTarget;
      const reader = new FileReader();
      let image: File | null | undefined =
        elem.files !== null && elem.files[0] !== null ? elem.files[0] : null;

      if (image === null || image === undefined) {
        return;
      }

      let isOptimized = false;

      reader.readAsDataURL(image);
      reader.onloadend = () => {
        if (!isOptimized) {
          const compressImg = new Image();

          compressImg.src = reader.result === null ? '' : `${reader.result}`;

          compressImg.onload = () => {
            const width = 1600;
            const scaleFactor = width / compressImg.width;

            const canvas = document.createElement('canvas');

            canvas.width = width;
            canvas.height = compressImg.height * scaleFactor;

            const ctx = canvas.getContext('2d');

            if (ctx !== null) {
              ctx.fillStyle = '#fff';
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              ctx.drawImage(
                compressImg,
                0,
                0,
                width,
                compressImg.height * scaleFactor
              );

              ctx.canvas.toBlob(
                (blob) => {
                  if (blob !== null) {
                    image = new File([blob], 'Новый файлик', {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    });

                    if (image === null || image === undefined) {
                      return;
                    }

                    isOptimized = true;
                    reader.readAsDataURL(image);
                  }
                },
                'image/jpeg',
                0.7
              );
            }
          };
        } else {
          if (image === null || image === undefined) {
            return;
          }

          const unicId = Date.now();

          const uploadImagesCopy = uploadImages;
          uploadImagesCopy[`image-${unicId}`] = {
            name: image.name,
            type: image.type,
            imageInBase64: reader.result === null ? '' : reader.result,
            id: `image-${unicId}`,
            size: image.size,
          };

          setImage(uploadImagesCopy);
          form.setFieldValue('image', {
            name: image.name,
            type: image.type,
            imageInBase64: reader.result === null ? '' : reader.result,
            id: `image-${unicId}`,
            size: image.size,
          });

          changeModal(true);
        }
      };
    }
  };

  const deleteImg = (e: React.MouseEvent<HTMLSpanElement>) => {
    const imgId = e.currentTarget.parentNode
      ?.querySelector('img')
      ?.getAttribute('id');

    if (imgId !== undefined && imgId !== null) {
      const uploadImagesCopy: IUploadImages = {
        isUploadModal: uploadImages.isUploadModal,
      };

      for (const key in uploadImages) {
        if ({}.hasOwnProperty.call(uploadImages, key)) {
          const obj = uploadImages[key];

          if (
            typeof obj !== 'boolean' &&
            obj?.id !== undefined &&
            obj.id !== imgId
          ) {
            uploadImagesCopy[`${obj.id}`] = obj;
          }
        }
      }

      setImage(uploadImagesCopy);

      if (Object.keys(uploadImagesCopy).length <= 1) {
        changeModal(false);
      }
    }
  };

  const addImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget
      .closest('div[data-parent$="true"]')
      ?.querySelector('input')
      ?.click();
  };

  const clearAllImg = () => {
    setImage({
      isUploadModal: false,
    });
  };

  return (
    <UploadFile
      images={images.length === 0 ? null : images}
      hideModal={hideModal}
      openModal={openModal}
      isModal={uploadImages.isUploadModal}
      onChange={uploadEvent}
      deleteImg={deleteImg}
      addImg={addImg}
      clearAllImg={clearAllImg}
      maxElem={anotherArg?.maxElem === undefined ? 1 : anotherArg.maxElem}
    />
  );
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
  changeModal: changeUploadModal,
  setImage: setUploadImage,
})(UploadFileContainer);

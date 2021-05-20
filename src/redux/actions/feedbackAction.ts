import { ThunkAction } from 'redux-thunk';
import {
  feedbackAPI,
  IFeedbackAPI,
  IPointAPI,
  IUniversalResultData,
  pointAPI,
} from '../../api/api';
import { CommonActionTypes } from '../../types/commonReducerTypes';
import { RootState } from '../reducers';
import { changeLoaded, setError, setThankInfo } from './commonAction';

export const createFeedbackTh = (
  rating: '1' | '2' | '3' | '4' | '5',
  notes: string,
  idPoint: number,
  images: Array<string | ArrayBuffer> | null = null
): ThunkAction<Promise<void>, RootState, unknown, CommonActionTypes> => async (
  dispatch
) => {
  dispatch(changeLoaded(true));
  const data: IUniversalResultData & IFeedbackAPI = await feedbackAPI
    .add(rating, notes, idPoint, images)
    .then((result) => result.data);
  if (data.status === 200) {
    if (data?.feedback?.point?.id && data?.feedback?.rating) {
      const pointInfo: IUniversalResultData & IPointAPI = await pointAPI
        .get(data.feedback.point.id)
        .then((result) => result.data);

      if (pointInfo?.point?.path) {
        dispatch(
          setThankInfo(
            {
              path: pointInfo.point.path[0],
              score: data.feedback.rating,
            },
            true
          )
        );
      }
    }
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

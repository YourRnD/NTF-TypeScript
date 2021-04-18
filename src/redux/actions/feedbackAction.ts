import { ThunkAction } from 'redux-thunk';
import { feedbackAPI } from '../../api/api';
import { CommonActionTypes } from '../../types/commonReducerTypes';
import { RootState } from '../reducers';
import { changeLoaded, setError, setSuccess } from './commonAction';

export const createFeedbackTh = (
  rating: '1' | '2' | '3' | '4' | '5',
  notes: string,
  idPoint: number
): ThunkAction<Promise<void>, RootState, unknown, CommonActionTypes> => async (
  dispatch
) => {
  dispatch(changeLoaded(true));
  const data = await feedbackAPI
    .add(rating, notes, idPoint)
    .then((result) => result.data);
  if (data.status === 200) {
    dispatch(setSuccess(data.message, true));
  } else {
    dispatch(setError(data, true));
  }
  dispatch(changeLoaded(false));
};

import React from 'react';
import EditPoint from './EditFeedback';

interface IParams {
  id: number;
  type: 'edit' | 'create' | null;
}

interface IMatch {
  params: IParams;
}

type OwnPropsType = {
  match: IMatch;
};

type PropsType = OwnPropsType;

const EditFeedbackContainer: React.FC<PropsType> = ({ match }) => (
  <>
    <EditPoint pointId={match.params.id} type={match.params.type} />
  </>
);

export default EditFeedbackContainer;

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default function createTournamentButton(props) {
  return (
    <div className="shuffle-button-wrapper">
      <RaisedButton onClick={props.onClickButton} label="!!!shuffle!!!" primary={true} disabled={props.isShowTounament} className="shuffle-button" style={{ height: '80px' }} />
    </div>
  );
}

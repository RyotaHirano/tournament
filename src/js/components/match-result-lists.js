import React from 'react';
import MatchResultList from './match-result-list';
const RaisedButton = require('material-ui/lib/raised-button');

export default function MatchResultLists(props) {
  return (
    <div className="match-result">
      {props.pairs.map((pair, index) =>
        <MatchResultList
          key={Date.now() * Math.random() + index}
          pair={pair}
          index={index}
          onChangeScore={props.onChangeScore}
        />
      )}
      <RaisedButton
        label="JSON DOWNLOAD"
        primary={true}
        disabled={!props.isShowTounament}
        onTouchTap={props.onClickDownLoadButton.bind(this)}
      />
    </div>
  )
}

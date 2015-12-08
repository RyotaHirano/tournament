import React from 'react';
import MatchResultList from './match-result-list';

export default function MatchResultLists(props) {
  return (
    <div className="match-result">
      {props.pairs.map((pair, index) =>
        <MatchResultList key={Date.now() * Math.random() + index} pair={pair} index={index} onChangeScore={props.onChangeScore} />
      )}
    </div>
  )
}

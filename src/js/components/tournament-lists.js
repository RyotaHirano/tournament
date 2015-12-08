import React from 'react';

import classNames from 'classnames';
import TournamentList from './tournament-list';

export default function TournamentLists(props) {
  return (
    <div className={classNames('match', { show: props.isShowTounament })} id="match">
      {props.pairs.map((pair, index) =>
        <TournamentList key={Date.now() * Math.random() + index} pair={pair} index={index} />
      )}
    </div>
  );
}

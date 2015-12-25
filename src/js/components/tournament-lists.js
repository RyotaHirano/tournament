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

TournamentLists.propTypes = {
  isShowTounament: React.PropTypes.bool.isRequired,
  pair: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    rank: React.PropTypes.number.isRequired,
    score: React.PropTypes.string.isRequired,
    team: React.PropTypes.string.isRequired,
    win: React.PropTypes.oneOfType([React.PropTypes.bool.isRequired, React.PropTypes.string.isRequired])
  }))
}

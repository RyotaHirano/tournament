import React from 'react';
import { List, ListDivider, ListItem } from 'material-ui/lib/lists';
import Avatar from 'material-ui/lib/avatar';

import { colors } from '../conf/conf';

export default function TournamentList(props) {
  return (
    <div>
      <h3 className="match-number">{`match ${(parseInt(props.index, 10) + 1)}`}</h3>
      <List className="tournament-list">
        {props.pair.map((user, userIndex) =>
          <ListItem
            key={Date.now() * Math.random() + userIndex}
            primaryText={user.name}
            secondaryText={user.team}
            leftAvatar={<Avatar backgroundColor={colors[user.rank]} >{user.name.slice(0, 1).toUpperCase()}</Avatar>}
            className="user-name tournament-list-item"
          />
        )}
      </List>
      <ListDivider />
    </div>
  );
}

TournamentList.propTypes = {
  index: React.PropTypes.number.isRequired,
  pair: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    rank: React.PropTypes.number.isRequired,
    score: React.PropTypes.string.isRequired,
    team: React.PropTypes.string.isRequired,
    win: React.PropTypes.oneOfType([React.PropTypes.bool.isRequired, React.PropTypes.string.isRequired])
  }))
}

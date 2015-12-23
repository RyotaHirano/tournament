import React, { Component } from 'react';
import { List, ListDivider, ListItem } from 'material-ui/lib/lists';
import Avatar from 'material-ui/lib/avatar';
import Badge from 'material-ui/lib/badge';
import TextField from 'material-ui/lib/text-field'

import { colors } from '../conf/conf';

export default class MatchResultList extends Component {
  constructor(props) {
    super(props);
    this._onChangeScore = this._onChangeScore.bind(this);
  }

  render() {
    return (
      <div className="match-list-wrap">
        <h3 className="match-number">{`match ${(parseInt(this.props.index, 10) + 1)}`}</h3>
        <div
          className="header-scores"
        >
          {this.props.pair.map((user, userIndex) =>
            <span
              key={Date.now() * Math.random() + userIndex}
              className="header-score"
            >
              {user.score}
            </span>
          )}
        </div>
        <List className="match-result-list">
          {this.props.pair.map((user, userIndex) =>
            <ListItem
              key={Date.now() * Math.random() + userIndex}
              primaryText={user.name}
              secondaryText={user.team}
              leftAvatar={<Avatar backgroundColor={colors[user.rank]} >{user.name.slice(0, 1).toUpperCase()}</Avatar>}
              rightIcon={
                (user.win === true) ?
                  <Badge
                    badgeContent="WIN"
                    badgeStyle={{width: 40,height: 30, top: 10}}
                    style={{position: 'absolute', zIndex: 1}}
                    primary={true}
                  ></Badge>
                : null
              }
              className="user-name match-result-list-item"
              style={
                (user.win === true) ?
                  {backgroundColor: '#ffea00'}
                : {backgroundColor: 'inherit'}
              }
            />
          )}
        </List>
        <div
          className="score"
        >
          {this.props.pair.map((user, userIndex) =>
            <TextField
              key={Date.now() * Math.random() + userIndex}
              type="number"
              className="score-input"
              id={user.id}
              data-pair-id={userIndex}
              style={{ width: 40 }}
              floatingLabelText="Score"
              defaultValue={user.score}
              onChange={this._onChangeScore}
            />
          )}
        </div>
        <ListDivider />
      </div>
    );
  }

  _onChangeScore(e) {
    const userId = e.target.id;
    const score = e.target.value;
    const oppPairId = (e.target.dataset.pairId === '0') ? 1 : 0;
    const parentDom = e.target.parentElement.parentElement;
    const oppUserId = parentDom.childNodes[oppPairId].childNodes[1].id;
    const oppUserScore = parentDom.childNodes[oppPairId].childNodes[1].value;
    this.props.onChangeScore(userId, score, oppUserId, oppUserScore);
  }
}

MatchResultList.propTypes = {
  onChangeScore: React.PropTypes.func.isRequired,
  pair: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    rank: React.PropTypes.number.isRequired,
    score: React.PropTypes.string.isRequired,
    team: React.PropTypes.string.isRequired,
    win: React.PropTypes.oneOfType([React.PropTypes.bool.isRequired, React.PropTypes.string.isRequired])
  })),
  index: React.PropTypes.number.isRequired
}

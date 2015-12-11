import React, { Component } from 'react';

import { colors } from '../conf/conf';

import { List, ListDivider, ListItem } from 'material-ui/lib/lists';
import { SelectableContainerEnhance as selectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = selectableContainerEnhance(List);
import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';

import shuffle from '../lib/shuffle';
import getPair from '../lib/get-pair';

import TournamentLists from '../components/tournament-lists';

import scrollTo from 'popmotion-scroll-to';
import offset from 'offset';
let scrollTargetTop = 0;

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    this._handleUpdateSelectedPlayerIndex = this._handleUpdateSelectedPlayerIndex.bind(this);
    this.createTournament = this.createTournament.bind(this);
  }

  render() {
    return (
      <div>
        <h2 className="sub-title">Player</h2>
        <div>
          <SelectableList
            valueLink={{ value: this.props.selectedPlayerIndex, requestChange: this._handleUpdateSelectedPlayerIndex }}
            subheader="Select Player">
            {this.props.users.map((user, i) =>
              <ListItem
                key={Date.now() * Math.random()}
                primaryText={user.name}
                secondaryText={user.team}
                value={i + 1}
                leftAvatar={<Avatar backgroundColor={colors[user.rank]}>{user.name.slice(0, 1).toUpperCase()}</Avatar>}
                className="user-name"
              />)
            }
            <ListDivider />
          </SelectableList>
        </div>
        <div className="shuffle-button-wrapper">
          <RaisedButton
            onClick={this.createTournament}
            label="!!!shuffle!!!"
            primary={true}
            disabled={this.props.isShowTounament}
            className="shuffle-button"
            style={{ height: '80px' }}
          />
        </div>
        <TournamentLists
          pairs={ this.props.pairs }
          isShowTounament={this.props.isShowTounament}
        />
      </div>
    );
  }

  _handleUpdateSelectedPlayerIndex(e, index) {
    this.props.handleUpdateSelectedPlayerIndex(e, index);
  }

  _shuffleUsers() {
    const setShuffleUsers = getPair(shuffle(this.props.users))
    this.props.shuffleUsers(setShuffleUsers);
  }

  scrollToEl() {
    if (scrollTargetTop === 0) {
      scrollTargetTop = document.body.scrollTop + offset(document.querySelector('#match')).top;
    }
    scrollTo({ x: 0, y: scrollTargetTop });
  }

  _showTounament() {
    if (!this.props.isShowTounament) {
      const setIsShowTounament = !this.props.isShowTounament;
      this.props.showTounament(setIsShowTounament);
    }
  }

  createTournament() {
    (async () => {
      this._shuffleUsers();
      this.scrollToEl();
      await new Promise(resolve => setTimeout(() => resolve(), 1500));
      this._showTounament();
    })();
  }
}

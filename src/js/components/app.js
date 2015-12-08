import 'babel-polyfill';

import { users, teams } from '../conf/conf';
import shuffle from '../lib/shuffle';
import getPair from '../lib/get-pair';
import getTeam from '../lib/get-team';
import getSelectedCountry from '../lib/get-selected-country';
import chkSelectEnable from '../lib/chk-select-enable';
import scrollTo from 'popmotion-scroll-to';
import offset from 'offset';
let scrollTargetTop = 0;

import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from'material-ui/lib/tabs/tab';

import LevelList from './level-list';
import PlayerLists from './player-lists';
import CreateTournamentButton from './create-tournament-button';
import TournamentLists from './tournament-lists';
import CountryTable from './country-table';
import MatchResultLists from './match-result-lists';

export default class App extends Component {
  constructor() {
    super();

    const selectedCountry = getSelectedCountry(teams);
    this.state = {
      users,
      pairs: [],
      tableDate: {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        multiSelectable: true,
        enableSelectAll: false,
        deselectOnClickaway: false
      },
      isShowTounament: false,
      selectedCountry,
      selectedPlayerIndex: null,
      selectedTeams: []
    };
    this.showFlg = false;

    this.createTournament = this.createTournament.bind(this);
    this.teamSelected = this.teamSelected.bind(this);
    this.handleUpdateSelectedPlayerIndex = this.handleUpdateSelectedPlayerIndex.bind(this);
    this.addRowSelection = this.addRowSelection.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
  }

  render() {
    return (
      <div>
        <LevelList />
        <Tabs>
          <Tab
            label="Tournament List"
            key={ Date.now() * Math.random() }
          >
            <h2 className="sub-title">Player</h2>
            <PlayerLists
              users={this.state.users}
              selectedPlayerIndex={this.state.selectedPlayerIndex} onClickPlayer={this.handleUpdateSelectedPlayerIndex}
            />
            <CreateTournamentButton
              onClickButton={ this.createTournament }
              isShowTounament={this.state.isShowTounament}
            />
            <TournamentLists
              pairs={ this.state.pairs }
              isShowTounament={this.state.isShowTounament}
            />
          </Tab>
          <Tab
            label="Select Your Teams"
            key={ Date.now() * Math.random() }
          >
            <CountryTable
              tableData={ this.state.tableDate }
              selectedCountry={ this.state.selectedCountry }
              onClickTableRow={ this.teamSelected }
              onClickAddRowSelection={ this.addRowSelection }
            />
          </Tab>
          <Tab
            label="Match Result"
            key={ Date.now() * Math.random() }
          >
            <MatchResultLists
              pairs={ this.state.pairs }
              isShowTounament={ this.state.isShowTounament }
              onChangeScore={ this.onChangeScore }
            />
          </Tab>
        </Tabs>
      </div>
    );
  }

  shuffleUsers() {
    this.setState({
      pairs: getPair(shuffle(this.state.users))
    });
  }

  scrollToEl() {
    if (scrollTargetTop === 0) {
      scrollTargetTop = document.body.scrollTop + offset(document.querySelector('#match')).top;
    }
    scrollTo({ x: 0, y: scrollTargetTop });
  }

  showTounament() {
    if (!this.state.isShowTounament) {
      this.setState({
        isShowTounament: !this.state.isShowTounament
      });
    }
  }

  createTournament() {
    (async () => {
      this.shuffleUsers();
      this.scrollToEl();
      await new Promise(resolve => setTimeout(() => resolve(), 1500));
      this.showTounament();
    })();
  }

  _addTeam(props, targetRank, newUser) {
    if (props.selectedCountry[targetRank].selected) {
      newUser.team = '';
    } else {
      newUser.team = getTeam(teams, targetRank);
    }
    return newUser;
  }

  _createNewSelectedCountry(props, targetRank, newUser) {
    const newSelectedCountry = {};
    newSelectedCountry[targetRank] = props.selectedCountry[targetRank];
    newSelectedCountry[targetRank].selected = !newSelectedCountry[targetRank].selected;
    if (!props.selectedCountry[targetRank].selected) {
      newSelectedCountry[targetRank].player = '';
    } else {
      newSelectedCountry[targetRank].player = newUser.name;
    }
    return newSelectedCountry;
  }

  teamSelected(targetRank) {
    const newUser = this.state.users[this.state.selectedPlayerIndex - 1];
    if (chkSelectEnable(this.state, newUser, targetRank)) {
      this._addTeam(this.state, targetRank, newUser);
      const newSelectedCountry = this._createNewSelectedCountry(this.state, targetRank, newUser);
      this.setState({
        users: Object.assign(this.state.users, newUser),
        selectedCountry: Object.assign(this.state.selectedCountry, newSelectedCountry)
      });
    }
  }

  handleUpdateSelectedPlayerIndex(e, index) {
    this.setState({
      selectedPlayerIndex: index
    });
  }

  addRowSelection(arrSelectedTeam) {
    this.setState({
      selectedTeams: arrSelectedTeam
    });
  }

  _whitchWinner(score, oppScore) {
    let WIN = [false, false];
    if (score > oppScore) {
      WIN = [true, false];
    } else if (score < oppScore) {
      WIN = [false, true];
    }
    return WIN;
  }

  onChangeScore(userId, score, oppUserId, oppUserScore) {
    const newUser = this.state.users[parseInt(userId, 10)];
    const oppNewUser = this.state.users[parseInt(oppUserId, 10)];
    const winnner = this._whitchWinner(score, oppUserScore);

    newUser.score = score;
    newUser.win = winnner[0];
    oppNewUser.win = winnner[1];
    this.setState({
      users: Object.assign(this.state.users, newUser)
    });
    this.setState({
      users: Object.assign(this.state.users, oppNewUser)
    });
  }
}

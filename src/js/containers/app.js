import 'babel-polyfill';

import { users, teams } from '../conf/conf';
import getTeam from '../lib/get-team';
import getSelectedCountry from '../lib/get-selected-country';
import chkSelectEnable from '../lib/chk-select-enable';
import createSelectMatchDataTitle from '../lib/create-select-match-data-title';
import createSelectMatchData from '../lib/create-select-match-data';

import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from'material-ui/lib/tabs/tab';
import LevelList from '../components/level-list';

// Containers
import PlayerList from '../containers/playerList';
import CountryTable from '../containers/country-table';
import MatchResult from '../containers/match-result';
import MatchHistory from '../containers/match-history';

// Read Match History Data
import { jsonData } from '../../../data/readJson';

export default class App extends Component {
  constructor() {
    super();

    const selectedCountry = getSelectedCountry(teams);

    // Match History Data
    this.selectMatchDataTitle = createSelectMatchDataTitle(jsonData);
    this.selectMatchData = createSelectMatchData(jsonData);
    this.state = {
      users,
      pairs: [],
      tableData: {
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
      selectedTeams: [],
      selectMatchData: this.selectMatchData,
      selectedMatchData: this.selectMatchData[0]
    };
    this.showFlg = false;

    this.handleUpdateSelectedPlayerIndex = this.handleUpdateSelectedPlayerIndex.bind(this);
    this.shuffleUsers = this.shuffleUsers.bind(this);
    this.showTounament = this.showTounament.bind(this);
    this.teamSelected = this.teamSelected.bind(this);
    this.addRowSelection = this.addRowSelection.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangeMatchHistory = this.onChangeMatchHistory.bind(this);
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
            <PlayerList
              { ...this.state }
              handleUpdateSelectedPlayerIndex={this.handleUpdateSelectedPlayerIndex}
              shuffleUsers={this.shuffleUsers}
              showTounament={this.showTounament}
            />
          </Tab>
          <Tab
            label="Select Your Teams"
            key={ Date.now() * Math.random() }
          >
            <CountryTable
              { ...this.state }
              onClickTableRow={ this.teamSelected }
              onClickAddRowSelection={ this.addRowSelection }
            />
          </Tab>
          <Tab
            label="Match Result"
            key={ Date.now() * Math.random() }
          >
            <MatchResult
              {...this.state}
              onChangeScore={this.onChangeScore}
            />
          </Tab>
          <Tab
            label="Match History"
            key={ Date.now() * Math.random() }
          >
            <MatchHistory
              { ...this.state }
              selectMatchDataTitle={this.selectMatchDataTitle}
              onChangeMatchHistory={this.onChangeMatchHistory}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }

  shuffleUsers(setShuffleUsers) {
    this.setState({
      pairs: setShuffleUsers
    });
  }

  showTounament(setIsShowTounament) {
    this.setState({
      isShowTounament: setIsShowTounament
    });
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

  onChangeScore(newUser, oppNewUser) {
    this.setState({
      users: Object.assign(this.state.users, newUser)
    });
    this.setState({
      users: Object.assign(this.state.users, oppNewUser)
    });
  }

  onChangeMatchHistory(index) {
    this.setState({
      selectedMatchData: this.selectMatchData[index]
    });
  }
}

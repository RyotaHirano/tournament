import 'babel-polyfill';

import { users, teams, colors, NO } from '../conf/conf';
import shuffle from '../lib/shuffle';
import getPair from '../lib/get-pair';
import getTeam from '../lib/get-team';
import getSelectedCountry from '../lib/get-selected-country';
import chkSelectEnable from '../lib/chk-select-enable';
import createSelectMatchDataTitle from '../lib/create-select-match-data-title';
import createSelectMatchData from '../lib/create-select-match-data';
import zeroPadding from '../lib/zero-padding';
import scrollTo from 'popmotion-scroll-to';
import offset from 'offset';
let scrollTargetTop = 0;

import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from'material-ui/lib/tabs/tab';
import { List, ListDivider, ListItem } from 'material-ui/lib/lists';
import { SelectableContainerEnhance as selectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = selectableContainerEnhance(List);
import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';

import LevelList from './level-list';
import CreateTournamentButton from './create-tournament-button';
import TournamentLists from './tournament-lists';
// import CountryTable from './country-table';
import MatchResultList from './match-result-list';
import MatchHistoryList from './match-history-list';

import CountryTable from '../container/country-table';

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
      selectedMatchData: this.selectMatchData[0],
    };
    this.showFlg = false;

    this.createTournament = this.createTournament.bind(this);
    this.teamSelected = this.teamSelected.bind(this);
    this.handleUpdateSelectedPlayerIndex = this.handleUpdateSelectedPlayerIndex.bind(this);
    this.addRowSelection = this.addRowSelection.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onClickDownLoadButton = this.onClickDownLoadButton.bind(this);
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
            <h2 className="sub-title">Player</h2>
            <div>
              <SelectableList
                valueLink={{ value: this.state.selectedPlayerIndex, requestChange: this.handleUpdateSelectedPlayerIndex }}
                subheader="Select Player">
                {this.state.users.map((user, i) =>
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
              { ...this.state }
              onClickTableRow={ this.teamSelected }
              onClickAddRowSelection={ this.addRowSelection }
            />
          </Tab>
          <Tab
            label="Match Result"
            key={ Date.now() * Math.random() }
          >
            <div className="match-result">
              {this.state.pairs.map((pair, index) =>
                <MatchResultList
                  key={Date.now() * Math.random() + index}
                  pair={pair}
                  index={index}
                  onChangeScore={this.onChangeScore}
                />
              )}
              <div
                className="json-download"
              >
                <RaisedButton
                  label="JSON DOWNLOAD"
                  primary={true}
                  disabled={!this.state.isShowTounament}
                  onTouchTap={this.onClickDownLoadButton}
                  style={{marginTop: 20}}
                />
              </div>
            </div>
          </Tab>
          <Tab
            label="Match History"
            key={ Date.now() * Math.random() }
          >
            <div
              className="match-history"
            >
              <div className="match-history-select-box">
                <span className="select-match-history-label">Select Match</span>
                <SelectField
                  displayMember="no"
                  menuItems={this.selectMatchDataTitle}
                  onChange={this.onChangeMatchHistory}
                  style={{marginTop: 20}}
                />
              </div>
              <div className="match-history-lists">
              { (this.state.selectedMatchData.length !== 0) ?
                  this.state.selectedMatchData.map((pair, index) =>
                  <MatchHistoryList
                    key={Date.now() * Math.random() + index}
                    pair={pair}
                    index={index}
                  />
                  )
                : null
              }
              </div>
            </div>
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

  onClickDownLoadButton() {
    const downloadObj = {
      no: NO,
      data: this.state.pairs
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(downloadObj));
    const downLoadaBtn = document.createElement('a');
    const today = new Date();
    const titleDate = `${today.getFullYear()}${zeroPadding(today.getMonth() + 1)}${zeroPadding(today.getDate())}`;
    downLoadaBtn.setAttribute('href', dataStr);
    downLoadaBtn.setAttribute('download', `${titleDate}_tournament_data.json`);
    downLoadaBtn.click();
  }

  onChangeMatchHistory(e, id) {
    const index = parseInt(id, 10);
    this.setState({
      selectedMatchData: this.selectMatchData[index]
    });
  }
}

import { NO } from '../conf/conf';

import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import MatchResultList from '../components/match-result-list';

import zeroPadding from '../lib/zero-padding';

export default class MatchResult extends Component {
  constructor(props) {
    super(props);

    this._onChangeScore = this._onChangeScore.bind(this);
    this.onClickDownLoadButton = this.onClickDownLoadButton.bind(this);
  }

  render() {
    return (
      <div className="match-result">
        {this.props.pairs.map((pair, index) =>
          <MatchResultList
            key={Date.now() * Math.random() + index}
            pair={pair}
            index={index}
            onChangeScore={this._onChangeScore}
          />
        )}
        <div
          className="json-download"
        >
          <RaisedButton
            label="JSON DOWNLOAD"
            primary={true}
            disabled={!this.props.isShowTounament}
            onTouchTap={this.onClickDownLoadButton}
            style={{ marginTop: 20 }}
          />
        </div>
      </div>
    );
  }

  _onChangeScore(userId, score, oppUserId, oppUserScore) {
    const newUser = this.props.users[parseInt(userId, 10)];
    const oppNewUser = this.props.users[parseInt(oppUserId, 10)];
    const winnner = this._whitchWinner(score, oppUserScore);

    newUser.score = score;
    newUser.win = winnner[0];
    oppNewUser.win = winnner[1];
    this.props.onChangeScore(newUser, oppNewUser);
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

  onClickDownLoadButton() {
    const downloadObj = {
      no: NO,
      data: this.props.pairs
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(downloadObj));
    const downLoadaBtn = document.createElement('a');
    const today = new Date();
    const titleDate = `${today.getFullYear()}${zeroPadding(today.getMonth() + 1)}${zeroPadding(today.getDate())}`;
    downLoadaBtn.setAttribute('href', dataStr);
    downLoadaBtn.setAttribute('download', `${titleDate}_tournament_data.json`);
    downLoadaBtn.click();
  }
}

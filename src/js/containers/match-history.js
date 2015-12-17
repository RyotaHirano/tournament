import React, { Component } from 'react';
import SelectField from 'material-ui/lib/select-field';

import MatchHistoryList from '../components/match-history-list';

export default class MatchResult extends Component {
  constructor(props) {
    super(props);

    this.onChangeMatchHistory = this.onChangeMatchHistory.bind(this);
  }

  render() {
    return (
      <div
        className="match-history"
      >
        <div className="match-history-select-box">
          <span className="select-match-history-label">Select Match</span>
          <SelectField
            displayMember="no"
            menuItems={this.props.selectMatchDataTitle}
            onChange={this.onChangeMatchHistory}
            style={{marginTop: 20}}
          />
        </div>
        <div className="match-history-lists">
        { (this.props.selectedMatchData.length !== 0) ?
            this.props.selectedMatchData.map((pair, index) =>
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
    );
  }

  onChangeMatchHistory(e, id) {
    const index = parseInt(id, 10);
    this.props.onChangeMatchHistory(index);
  }
}

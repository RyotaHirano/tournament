import React from 'react';
import { List, ListDivider, ListItem } from 'material-ui/lib/lists';
import { SelectableContainerEnhance as selectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = selectableContainerEnhance(List);
import Avatar from 'material-ui/lib/avatar';

import { colors } from '../conf/conf';

export default function PlayerLists(props) {
  return (
    <div>
      <SelectableList
        valueLink={{ value: props.selectedPlayerIndex, requestChange: props.onClickPlayer }}
        subheader="Select Player">
        {props.users.map((user, i) =>
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
  );
}

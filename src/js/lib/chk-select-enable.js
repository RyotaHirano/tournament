import { teams } from '../conf/conf';
import getTeam from '../lib/get-team';

export default function chkSelectEnable(props, userObj, targetRank) {
  let enable = false;
  if (props.selectedPlayerIndex !== null) {
    const selectTeam = getTeam(teams, targetRank);
    const playerTeam = userObj.team;
    if (props.selectedCountry[targetRank].selected && (selectTeam === playerTeam)) {
      enable = true;
    } else if (!props.selectedCountry[targetRank].selected && (playerTeam === '')) {
      enable = true;
    } else {
      enable = false;
    }
  }
  return enable;
}

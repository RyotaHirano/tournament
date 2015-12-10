export default function createSelectMatchData(jsonData) {
  const returnArray = [];
  jsonData.slice().map(matchData => {
    returnArray.push(matchData.data);
  });
  return returnArray;
}

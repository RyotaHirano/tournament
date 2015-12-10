export default function createSelectMatchDataTitle(jsonData) {
  let tmpObj = {};
  const returnArray = [];
  jsonData.slice().map((matchData, index) => {
    matchData.id = index;
    tmpObj = {
      no: matchData.no,
      id: matchData.id
    }
    returnArray.push(tmpObj);
  });
  return returnArray;
}

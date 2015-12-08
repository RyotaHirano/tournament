export default function selectLevel(rank) {
  let lank = 1;
  if (rank <= 15) {
    lank = 1;
  } else if (rank > 15 && rank <= 30) {
    lank = 2;
  } else if (rank > 30 && rank <= 45) {
    lank = 3;
  } else if (rank > 45 && rank <= 60) {
    lank = 4;
  } else {
    lank = 5;
  }
  return lank;
}

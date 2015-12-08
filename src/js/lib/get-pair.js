import { SEP } from '../conf/conf';

export default function getPair(array) {
  const _array = array.slice();
  const l = _array.length;
  const count = Math.floor(l / SEP);
  let start = 0;
  const pair = [];
  for (let i = 0; i <= count; i++) {
    const pairData = _array.slice(start, start + SEP);
    if (pairData.length > 0) {
      pair.push(pairData);
    }
    start = start + SEP;
  }
  return pair;
}

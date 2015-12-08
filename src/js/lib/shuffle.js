export default function shuffle(array) {
  const l = array.length;
  const _array = array.slice();

  for (let i = 0; i < l; i++) {
    const index = Math.floor(Math.random() * l);
    const targetValue = _array[i];
    _array[i] = _array[index];
    _array[index] = targetValue;
  }

  return _array;
}

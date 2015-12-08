export default function getSelectedCountry(country) {
  const selectedCountry = {};
  const l = country.length;

  for (let i = 1; i <= l; i++) {
    selectedCountry[i] = {
      selected: false,
      player: ''
    };
  }
  return selectedCountry;
}

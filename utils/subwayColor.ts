export default function getSubwayColor(line: string) {
  switch (line) {
    case '1호선':
      return '#0033A0';
    case '2호선':
      return '#00B140';
    case '3호선':
      return '#FC4C02';
    case '4호선':
      return '#30E6FF';
    case '5호선':
      return '#A05EB5';
    case '6호선':
      return '#C75D28';
    case '7호선':
      return '#6D712E';
    case '8호선':
      return '#E31C79';
    case '9호선':
      return '#ACAA88';

    default:
      return '#000000';
  }
}

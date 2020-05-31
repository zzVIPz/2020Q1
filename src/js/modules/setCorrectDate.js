const DATE = {
  ru: {
    month: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ],
    day: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
  },
  en: {
    month: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  be: {
    month: [
      'Студзень',
      'Люты',
      'Сакавiк',
      'Красавiк',
      'Травеня ',
      'Чэрвеня',
      'Ліпеня',
      'Жніўня',
      'Верасеня',
      'Кастрычніка',
      'Лістапада',
      'Снежаня',
    ],
    day: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
  },
};

const SEASONS = {
  0: 'winter',
  1: 'winter',
  2: 'spring',
  3: 'spring',
  4: 'spring',
  5: 'summer',
  6: 'summer',
  7: 'summer',
  8: 'fall',
  9: 'fall',
  10: 'fall',
  11: 'winter',
};

function getTimesOfDay(hours) {
  if (hours >= 0 && hours < 5) return 'midnight';
  if (hours >= 5 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 18) return 'afternoon';
  return 'evening';
}

export default function getCorrectDate(language, node) {
  const dataNode = node.dataset;
  const date = new Date();
  const dateArray = String(date).split(' ');
  const seasonOfYear = SEASONS[date.getMonth()];
  const timesOfDay = getTimesOfDay(date.getHours());
  dataNode.time = `${seasonOfYear},${timesOfDay}`;
  const formattedDate = `${DATE[language].day[date.getDay()]} ${dateArray[2]} ${
    DATE[language].month[date.getMonth()]
  } ${dateArray[4]}`;
  return formattedDate;
}

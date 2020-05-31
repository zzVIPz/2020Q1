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

export default function getCorrectDate(language) {
  const date = new Date();
  const dateArray = String(date).split(' ');
  const formattedDate = `${DATE[language].day[date.getDay()]} ${dateArray[2]} ${
    DATE[language].month[date.getMonth()]
  } ${dateArray[4]}`;
  return formattedDate;
}

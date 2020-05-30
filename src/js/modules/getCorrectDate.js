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
    day: ['Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск'],
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
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    day: ['Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб', 'Няд'],
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

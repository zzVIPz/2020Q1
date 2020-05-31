const DAYS_OF_THE_WEEK = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Воскресень', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  be: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Субота'],
};

function getWeekDay(date, language) {
  const formattedDate = new Date(date * 1e3);
  const day = DAYS_OF_THE_WEEK[language][formattedDate.getDay()];
  return day;
}

export default function getCardOfThreeDayForecastTemplate(template, date, temp, icon, language) {
  let formattedTemplate = template;
  if (date) {
    const weekDay = getWeekDay(date, language);
    formattedTemplate = formattedTemplate.replace(/\{day\}/g, weekDay);
  }

  if (temp) {
    formattedTemplate = formattedTemplate.replace(/\{temperature\}/g, Math.ceil(temp));
  }

  if (icon) {
    formattedTemplate = formattedTemplate.replace(/\{icon\}/g, icon);
  }

  return formattedTemplate;
}

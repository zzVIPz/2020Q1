const DAYS_OF_THE_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function getWeekDay(date) {
  const formattedDate = new Date(date * 1e3);
  const day = DAYS_OF_THE_WEEK[formattedDate.getDay()];
  return day;
}

export default function getCardOfThreeDayForecastTemplate(template, date, temp, icon) {
  let formattedTemplate = template;
  if (date) {
    const weekDay = getWeekDay(date);
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

export default function checkDate(timezone, data) {
  const adjustedTime = new Date().toLocaleString('en-US', { timeZone: timezone });
  const adjustedDay = new Date(adjustedTime).getDate();
  const dataDay = +data.datetime.slice(-2);
  return dataDay > adjustedDay;
}

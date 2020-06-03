export default function checkDate(timezone, datetime) {
  const adjustedTime = new Date().toLocaleString('en-US', { timeZone: timezone });
  const adjustedDay = new Date(adjustedTime).getDate();
  const dataDay = datetime.slice(-2);
  return dataDay > adjustedDay;
}

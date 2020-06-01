export default function checkDate(timezone, data) {
  console.log('!!!!!!!!!!', timezone, data);
  const adjustedTime = new Date().toLocaleString('en-US', { timeZone: timezone });
  const adjustedDay = new Date(adjustedTime).getDate();
  const minsk = new Date(adjustedTime);
  const dataDay = +data.datetime.slice(-2);
  console.log('dataDay', dataDay, 'adjustedDay', adjustedDay, 'minsk', minsk);
  return dataDay > adjustedDay;
}

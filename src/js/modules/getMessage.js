const VALUES = {
  ru: ['Сегодня', 'метров в секунду'],
  en: ['Today is', 'meters per second'],
  be: ['Cёння', 'метраў у секунду'],
};

export default function getMessage(language, ...args) {
  const wordsArray = [...args];
  wordsArray[2] = `${VALUES[language][0]} ${wordsArray[2]}°`;
  wordsArray[5] = `${wordsArray[5].slice(0, -3)} ${VALUES[language][1]}`;
  const message = wordsArray.reduce((acc, value) => {
    let str = acc;
    str += `${value}. `;
    return str;
  }, '');
  return message;
}

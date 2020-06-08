export default function checkLetters(value) {
  console.log(value, /[а-я]/i.test(value));
  return /[а-я]/i.test(value);
}

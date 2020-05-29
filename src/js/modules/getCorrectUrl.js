export default function getCorrectUrl(url, location, language) {
  let correctUrl = url;
  console.log(location);

  if (location) {
    correctUrl = correctUrl.replace(/\{location\}/g, location);
  }
  if (language) {
    correctUrl = correctUrl.replace(/\{language\}/g, language);
  }
  return correctUrl;
}

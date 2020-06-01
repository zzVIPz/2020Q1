export default function getCorrectUrl(url, language, location, additionalLocation) {
  let correctUrl = url;

  if (language) {
    correctUrl = correctUrl.replace(/\{language\}/g, language);
  }
  if (location) {
    correctUrl = correctUrl.replace(/\{location\}/g, location);
  }
  if (additionalLocation) {
    correctUrl = correctUrl.replace(/\{additionalLocation\}/g, additionalLocation);
  }

  return correctUrl;
}

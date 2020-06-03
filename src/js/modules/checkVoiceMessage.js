const WEATHER_VALUES = ['погода', 'прогноз', 'weather', 'forecast', "надвор'е", 'прагноз'];
const LOUDLY_COMMANDS = ['гучней', 'громче', 'loudly'];
const QUIETLY_COMMANDS = ['цішэй', 'тише', 'quietly'];

export default function checkVoiceMessage(transcription) {
  if (WEATHER_VALUES.includes(transcription)) return 'weather';
  if (LOUDLY_COMMANDS.includes(transcription)) return 'loudly';
  if (QUIETLY_COMMANDS.includes(transcription)) return 'quietly';
  return null;
}

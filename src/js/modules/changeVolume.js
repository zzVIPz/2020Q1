export default function changeVolume(command, volumeLevel) {
  let volumeLevelTmp = Math.trunc(volumeLevel * 10);
  if (command === 'loudly') volumeLevelTmp += 1;
  if (command === 'quietly') volumeLevelTmp -= 1;
  return volumeLevelTmp / 10;
}

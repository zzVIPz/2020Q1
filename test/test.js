/* global test */
/* eslint-disable no-undef */

import getPlaceholderValue from '../src/js/modules/getPlaceholderValue';
import checkVoiceMessage from '../src/js/modules/checkVoiceMessage';
import convertTemperature from '../src/js/modules/convertTemperature';
import getCardOfThreeDayForecastTemplate from '../src/js/modules/getCardOfThreeDayForecastTemplate';
import getCorrectUrl from '../src/js/modules/getCorrectUrl';
import getFormattedCoordinates from '../src/js/modules/getFormattedCoordinates';
import getIconSrcTemplate from '../src/js/modules/getIconSrcTemplate';
import getMessage from '../src/js/modules/getMessage';
import changeVolume from '../src/js/modules/changeVolume';
import checkDate from '../src/js/modules/checkDate';

test('get placeholder values ​​in different languages', () => {
  expect(getPlaceholderValue('en')).toBe('Search city');
  expect(getPlaceholderValue('ru')).toBe('Поиск города');
  expect(getPlaceholderValue('be')).toBe('Пошук горада');
});

test('get different values depending on the input parameter', () => {
  expect(checkVoiceMessage('weather')).toBe('weather');
  expect(checkVoiceMessage('громче')).toBe('loudly');
  expect(checkVoiceMessage('цішэй')).toBe('quietly');
  expect(checkVoiceMessage('abc')).toBeNull();
});

test('convert various temperature values', () => {
  expect(convertTemperature('f', 10)).toBe(50);
  expect(convertTemperature('f', 35)).toBe(95);
  expect(convertTemperature('c', 65)).toBe(18);
  expect(convertTemperature('abc', 4)).toBe(-16);
});

test('change string value', () => {
  expect(getCardOfThreeDayForecastTemplate('temperature is {temperature}!', null, '35')).toBe(
    'temperature is 35!',
  );
  expect(getCardOfThreeDayForecastTemplate('good day!')).toBe('good day!');
  expect(getCardOfThreeDayForecastTemplate('{temperature} {icon}!', null, 1, 35)).toBe('1 35!');
  expect(getCardOfThreeDayForecastTemplate('1 {temperature} {icon}', null, '2', '3')).toBe('1 2 3');
});

test('change url string value', () => {
  expect(
    getCorrectUrl(
      'https://test/current?&lat={location}&lon={additionalLocation}&lang={language}',
      'ru',
      'minsk',
      'belarus',
    ),
  ).toBe('https://test/current?&lat=minsk&lon=belarus&lang=ru');
  expect(getCorrectUrl('https://test/current?&lat={location}&lang={language}', '123', '345')).toBe(
    'https://test/current?&lat=345&lang=123',
  );
});

test('get array with formatted strings', () => {
  expect(getFormattedCoordinates('44.714211', '-74.005627', 'en')).toStrictEqual([
    'LATITUDE: 44° 71\' 421"',
    'LONGITUDE: -74° 00\' 562"',
  ]);
  expect(getFormattedCoordinates('40.714211', '-70.005627', 'ru')).toStrictEqual([
    'ШИРОТА: 40° 71\' 421"',
    'ДОЛГОТА: -70° 00\' 562"',
  ]);
  expect(getFormattedCoordinates('44.714211', '-74.005627', 'be')).toStrictEqual([
    'ШЫРАТА: 44° 71\' 421"',
    'ДАЎГАТА: -74° 00\' 562"',
  ]);
});

test('change url string value', () => {
  expect(getIconSrcTemplate('https://{icon_code}.jpg', 'sunny')).toBe('https://sunny.jpg');
  expect(getIconSrcTemplate('https://{icon_code}.jpg', 'windy')).toBe('https://windy.jpg');
  expect(getIconSrcTemplate('https://{icon_code}.jpg', '123')).toBe('https://123.jpg');
});

test('get text of message', () => {
  expect(
    getMessage(
      'ru',
      'Нью-Йорк',
      'Соединённые Штаты Америки',
      '22',
      'МЕСТАМИ ОБЛАЧНО',
      'ОЩУЩАЕТСЯ КАК: 23°',
      'ВЕТЕР: 6 М/С',
      'ВЛАЖНОСТЬ: 83%',
    ),
  ).toBe(
    'Нью-Йорк. Соединённые Штаты Америки. Сегодня 22°. МЕСТАМИ ОБЛАЧНО. ОЩУЩАЕТСЯ КАК: 23°. ВЕТЕР: 6  метров в секунду. ВЛАЖНОСТЬ: 83%. ',
  );
  expect(
    getMessage(
      'en',
      'Minsk',
      'Belarus',
      '10',
      'FEW CLOUDS',
      'FEELS LIKE: 10°',
      'WIND: 2 M/S',
      'HUMIDITY: 93%',
    ),
  ).toBe(
    'Minsk. Belarus. Today is 10°. FEW CLOUDS. FEELS LIKE: 10°. WIND: 2  meters per second. HUMIDITY: 93%. ',
  );
});

test('change volume value', () => {
  expect(changeVolume('quietly', 0.9)).toBe(0.8);
  expect(changeVolume('loudly', 0.2)).toBe(0.3);
  expect(changeVolume('loudly', 0.5)).toBe(0.6);
});

test('check date', () => {
  expect(checkDate('America/New_York', '2029-06-00')).toBeFalsy();
  expect(checkDate('Europe/Minsk', '2019-06-45')).toBeTruthy();
  expect(checkDate('Europe/Paris', '2029-06-91')).toBeTruthy();
});

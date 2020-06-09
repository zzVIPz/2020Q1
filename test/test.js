/* global test, expect */
/* eslint-disable no-undef */
import getCorrectUrl from '../src/js/modules/getCorrectUrl';
import checkLetters from '../src/js/modules/checkLetters';

test('get correct url', () => {
  const url = 'https://www.omdbapi.com/?{type}={key}&{page}apikey=9b67fc54';
  expect(getCorrectUrl(url, 's', 'dream')).toBe('https://www.omdbapi.com/?s=dream&apikey=9b67fc54');
  expect(getCorrectUrl(url, 'i', 'tt0180093')).toBe(
    'https://www.omdbapi.com/?i=tt0180093&apikey=9b67fc54',
  );
  expect(getCorrectUrl(url, 's', 'dream', 2)).toBe(
    'https://www.omdbapi.com/?s=dream&page=2&apikey=9b67fc54',
  );
});

test('check for Russian letters', () => {
  expect(checkLetters('привет')).toBeTruthy();
  expect(checkLetters('hello')).toBeFalsy();
  expect(checkLetters('helloпривет')).toBeTruthy();
});

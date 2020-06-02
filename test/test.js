import getPlaceholderValue from '../src/js/modules/getPlaceholderValue';

test('adds 1 + 2 to equal 3', () => {
  expect(getPlaceholderValue('en')).toBe('Search city');
  expect(getPlaceholderValue('ru')).toBe('Поиск города');
  expect(getPlaceholderValue('be')).toBe('Пошук горада');
});

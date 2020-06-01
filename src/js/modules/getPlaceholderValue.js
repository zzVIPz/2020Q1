const PLACEHOLDER_VALUES = {
  en: 'Search city',
  ru: 'Поиск города',
  be: 'Пошук горада',
};

export default function getPlaceholderValue(language) {
  const placeholder = PLACEHOLDER_VALUES[language];
  return placeholder;
}

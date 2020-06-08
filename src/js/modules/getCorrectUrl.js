export default function getCorrectUrl(template, mode, value, page) {
  let url = template.replace(/\{type\}/g, mode);
  if (page) {
    url = url.replace(/\{page\}/g, `page=${page}&`);
  } else {
    url = url.replace(/\{page\}/g, '');
  }
  if (value) {
    url = url.replace(/\{key\}/g, value);
  }
  return url;
}

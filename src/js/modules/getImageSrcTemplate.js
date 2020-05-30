export default function getImageSrcTemplate(template, code) {
  let formattedTemplate = template;
  if (code) {
    formattedTemplate = formattedTemplate.replace(/\{icon_code\}/g, code);
  }
  return formattedTemplate;
}

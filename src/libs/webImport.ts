console.log("webImport");

export default async function fetchHtml(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  return html;
}

const htmlContent = await fetchHtml('https://model-thinking.com/p/thames-into-tyburn')

const cleanedHtml = htmlContent
    .replace(/style="[^"]*"/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\s*on\w+="[^"]*"/gi, "")
    .replace(
      /<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ");

console.log(cleanedHtml);

export {}

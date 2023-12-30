// Этот модуль парсит адрес URL
module.exports = (baseUrl) => (req, res) => {
  // Этот базовый url мы передаём вторым аргументом при создании url
  const parsedUrl = new URL(req.url, baseUrl)
  console.log(parsedUrl);
}

// Этот модуль парсит адрес URL
module.exports = (baseUrl) => (req, res) => {
  // Этот базовый url мы передаём вторым аргументом при создании url
  const parsedUrl = new URL(req.url, baseUrl)

  // изменяю объект Request и добавляю в него поле `pathname`
  // а в него записать значение, полученное в результате parsing:
  req.pathname = parsedUrl.pathname
}

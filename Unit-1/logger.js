function log(message) {
  const now = new Date().toLocaleString();
  console.log(`[LOG @ ${now}] ${message}`);
}
module.exports = log;
// Generate ID unik sederhana
module.exports = function generateId(data) {
  return data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
};

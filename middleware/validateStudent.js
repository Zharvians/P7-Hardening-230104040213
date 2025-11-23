module.exports = function (req, res, next) {
  const { name, npm, major } = req.body;

  if (!name || String(name).trim() === '') {
    return res.status(400).json({ status: "fail", message: "Field 'name' wajib diisi" });
  }

  if (!npm || String(npm).trim() === '') {
    return res.status(400).json({ status: "fail", message: "Field 'npm' wajib diisi" });
  }

  if (!major || String(major).trim() === '') {
    return res.status(400).json({ status: "fail", message: "Field 'major' wajib diisi" });
  }

  // optional: npm harus angka
  if (!/^\d+$/.test(String(npm))) {
    return res.status(400).json({ status: "fail", message: "Field 'npm' harus berupa angka" });
  }

  next();
};

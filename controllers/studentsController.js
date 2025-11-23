const fs = require('fs');
const path = require('path');
const generateId = require('../utils/generateId');
const dataPath = path.join(__dirname, '..', 'data', 'students.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

// ✅ GET semua student
exports.getAllStudents = (req, res) => {
  const data = readData();
  res.status(200).json({
    status: "success",
    code: 200,
    timestamp: new Date().toISOString(),
    total: data.length,
    data
  });
};

// ✅ GET student by ID
exports.getStudentById = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const student = data.find(s => s.id == id);

  if (!student) {
    return res.status(404).json({
      status: "fail",
      code: 404,
      message: "Student tidak ditemukan"
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: student
  });
};

// ✅ POST tambah student (dengan validasi)
exports.createStudent = (req, res) => {
  const { name, npm, major } = req.body;

  // --- Validasi seperti contoh PDF (tidak boleh kosong)
  if (!name || name.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'name' wajib diisi"
    });
  }
  if (!npm || npm.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'npm' wajib diisi"
    });
  }
  if (!major || major.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'major' wajib diisi"
    });
  }

  const data = readData();
  const newStudent = { id: generateId(data), name, npm, major };
  data.push(newStudent);
  writeData(data);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Student berhasil ditambahkan",
    data: newStudent
  });
};

// ✅ PUT update student (dengan validasi & cek ID)
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, npm, major } = req.body;
  const data = readData();
  const index = data.findIndex(s => s.id == id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      code: 404,
      message: "Student tidak ditemukan"
    });
  }

  // --- Validasi input wajib diisi
  if (!name || name.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'name' wajib diisi"
    });
  }
  if (!npm || npm.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'npm' wajib diisi"
    });
  }
  if (!major || major.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Field 'major' wajib diisi"
    });
  }

  data[index] = { ...data[index], name, npm, major };
  writeData(data);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Data student berhasil diperbarui",
    data: data[index]
  });
};

// ✅ DELETE hapus student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex(s => s.id == id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      code: 404,
      message: "Student tidak ditemukan"
    });
  }

  data.splice(index, 1);
  writeData(data);

  // Sesuai standar REST → 204 No Content
  res.status(204).send();
};

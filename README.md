### 🌐 P7-Hardening Web Service Engineering – 230104040213
API Mahasiswa dengan keamanan, monitoring, logging, dan struktur profesional.

---

##  👨‍🏫 Dosen Pembimbing
[![GitHub - Muhayat Lab](https://img.shields.io/badge/GitHub-Muhayat--Lab-181717?logo=github&style=for-the-badge)](https://github.com/muhayat-lab)

##  👨‍💻 Developer
[![GitHub - RamaKazuya](https://img.shields.io/badge/GitHub-RamaKazuya-007ACC?logo=github&style=for-the-badge)](https://github.com/RamaKazuya)

**Nama:** Muhammad Ade Ramadhani  
**NPM:** 230104040213  
**Kelas:** TI23A  

---

##  🧠 Deskripsi Proyek
UTS ini membangun **RESTful API mahasiswa** menggunakan **Node.js + Express**, dengan fitur:

- CRUD lengkap  
- Validasi input  
- Logging (Morgan + custom logger)  
- Helmet security  
- CORS protection  
- Rate limiting  
- Global error handler  
- Response time monitor  
- Endpoint health  
- Endpoint info  
- Struktur modular profesional  

---

##  🚀 Cara Menjalankan Proyek

```bash
git clone https://github.com/RamaKazuya/UTS-WSE-230104040213.git
cd UTS-WSE-230104040213
npm install
npm run dev   # http://localhost:3000

---

##  🌐 Endpoint API

| METHOD | ENDPOINT          | DESKRIPSI             | STATUS      |
| ------ | ----------------- | --------------------- | ----------- |
| GET    | /api/students     | Semua mahasiswa       | 200         |
| GET    | /api/students/:id | Berdasarkan ID        | 200/404     |
| POST   | /api/students     | Tambah mahasiswa baru | 201/400     |
| PUT    | /api/students/:id | Update mahasiswa      | 200/400/404 |
| DELETE | /api/students/:id | Hapus mahasiswa       | 204/404     |
| GET    | /api/info         | Info API              | 200         |
| GET    | /api/health       | Health check          | 200         |

---

##  📁 Contoh Data (students.json)

[
  {
    "id": 1,
    "name": "Muhammad Ade Ramadhani",
    "npm": "230104040213",
    "major": "Teknologi Informasi"
  },
  {
    "id": 2,
    "name": "M Hasyir",
    "npm": "230104040221",
    "major": "Sistem Informasi"
  },
  {
    "id": 3,
    "name": "Budi Santoso",
    "npm": "230104040224",
    "major": "Teknik Informatika"
  }
]

---

## 🧾 Validasi Input
# Field wajib : 
name
npm
major

# Contoh error:
{
  "status": "fail",
  "message": "Field 'name' wajib diisi"
}

---

📬 Contoh Request (Postman / Curl)
# POST – Tambah Data
curl -X POST http://localhost:3000/api/students \
-H "Content-Type: application/json" \
-d '{"name":"Andi", "npm":"230104040250", "major":"Sistem Informasi"}'

---

# PUT – Update Data
curl -X PUT http://localhost:3000/api/students/1 \
-H "Content-Type: application/json" \
-d '{"name":"Update Nama","npm":"230104040213","major":"Teknologi Informasi"}'

---

# DELETE – Hapus Data
curl -X DELETE http://localhost:3000/api/students/3

---

##  🛡 Keamanan & Middleware
# ✔ Helmet
Melindungi terhadap serangan HTTP umum.
---
# ✔ CORS
Mengatur domain frontend yang diizinkan.
---
# ✔ Rate Limiting
Batas 100 request / 15 menit untuk mencegah spam.
---
# ✔ Morgan Logging
Log request secara detail & rapi.
---
# ✔ Response Time
Monitor waktu proses setiap request.

---

##  📂 Struktur Folder

P7-Hardening-230104040213
├── app.js
├── package.json
├── config
│   └── apiInfo.js
├── controllers
│   └── studentsController.js
├── data
│   └── students.json
├── middleware
│   ├── validateStudent.js
│   ├── responseTime.js
│   └── errorHandler.js
├── routes
│   ├── students.js
│   └── info.js
└── utils
    └── logger.js

---

##  🔎 Global Error Handler

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: "error",
    code: err.status || 500,
    message: err.message || "Internal Server Error"
  });
};

---

##  🔥 Health Check Endpoint

# GET /api/health
---
{
  "status": "UP",
  "uptime": 123.50,
  "timestamp": "2025-11-28T12:00:20.123Z"
}

---

##  ℹ️ Info API

# curl http://localhost:3000/api/info
---
{
  "service": "UTS Web Service - Students Resource",
  "version": "1.0.0",
  "author": "230104040213",
  "description": "RESTful API lengkap dengan keamanan, logging, validasi, dan monitoring."
}

---

## 📜 Lisensi

Lisensi ini dibuat khusus untuk keperluan akademik pada mata kuliah
Web Service Engineering — Praktikum 7 (Hardening).

Kode sumber, konfigurasi keamanan, middleware, dan seluruh komponen
dalam project ini hanya digunakan untuk pembelajaran, analisis,
dan demonstrasi praktik hardening pada aplikasi Node.js.

Dilarang memperjualbelikan, mendistribusikan ulang, atau menggunakan
project ini untuk tujuan komersial tanpa izin pemilik asli.
Semua risiko penggunaan berada di tangan pengguna.

© 2025 — 230104040213. Semua hak dilindungi.

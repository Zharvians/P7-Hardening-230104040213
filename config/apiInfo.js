module.exports = {
  service: "UTS Web Service - Students Resource",
  author: "230104040213",
  description: "RESTful API lengkap dengan CRUD, validasi, dan 7 prinsip REST.",
  endpoints: {
    list: "GET /api/students",
    detail: "GET /api/students/:id",
    create: "POST /api/students",
    update: "PUT /api/students/:id",
    delete: "DELETE /api/students/:id",
    info: "GET /api/info"
  }
};

const API_URL = "http://localhost:3000/api/students";
const tableBody = document.getElementById("tableBody");
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const npmInput = document.getElementById("npm");
const majorInput = document.getElementById("major");
const searchInput = document.getElementById("searchInput");
const majorFilter = document.getElementById("majorFilter");
const toast = document.getElementById("toast");
const clock = document.getElementById("clock");
const themeToggle = document.getElementById("themeToggle");

// modal
const editModal = document.getElementById("editModal");
const editName = document.getElementById("editName");
const editNpm = document.getElementById("editNpm");
const editMajor = document.getElementById("editMajor");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

let students = [];
let currentEditId = null;
let currentPage = 1;
const perPage = 10;

// update clock
setInterval(() => {
  const d = new Date();
  clock.textContent = d.toLocaleTimeString();
}, 1000);

// toast notification
function showToast(msg, color = "bg-sky-600") {
  toast.textContent = msg;
  toast.className = `${color} fixed top-6 right-6 text-white px-4 py-2 rounded-lg shadow-lg transition-all`;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2500);
}

// theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});

// fetch data
async function fetchStudents() {
  const res = await fetch(API_URL);
  const json = await res.json();
  students = json.data;
  updateMajorFilter();
  renderTable();
}

// pagination
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded ${i === currentPage ? "bg-sky-600" : "bg-slate-700 hover:bg-slate-600"} transition`;
    btn.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pagination.appendChild(btn);
  }
}

// table render
function renderTable() {
  tableBody.innerHTML = "";
  const filtered = getFilteredStudents();
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  if (paginated.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center p-4 text-slate-400">Tidak ada data</td></tr>`;
  } else {
    paginated.forEach((s) => {
      const tr = document.createElement("tr");
      tr.classList = "hover:bg-slate-700/50 transition";
      tr.innerHTML = `
        <td class="p-3">${s.id}</td>
        <td class="p-3">${s.name}</td>
        <td class="p-3">${s.npm}</td>
        <td class="p-3">${s.major}</td>
        <td class="p-3 text-center">
          <button onclick="openEdit(${s.id})" class="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-xs">Edit</button>
          <button onclick="deleteStudent(${s.id})" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs ml-2">Hapus</button>
        </td>`;
      tableBody.appendChild(tr);
    });
  }
  renderPagination(Math.ceil(filtered.length / perPage));
}

// filter logic
function getFilteredStudents() {
  const term = searchInput.value.toLowerCase();
  const majorVal = majorFilter.value;
  return students.filter(
    (s) =>
      (!majorVal || s.major === majorVal) &&
      (s.name.toLowerCase().includes(term) ||
        s.npm.includes(term) ||
        s.major.toLowerCase().includes(term))
  );
}

// add student
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newStudent = {
    name: nameInput.value.trim(),
    npm: npmInput.value.trim(),
    major: majorInput.value.trim(),
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });
  if (res.ok) {
    showToast("✅ Data berhasil ditambahkan");
    nameInput.value = npmInput.value = majorInput.value = "";
    fetchStudents();
  } else showToast("❌ Gagal menambah data", "bg-red-600");
});

// edit modal
function openEdit(id) {
  const s = students.find((st) => st.id === id);
  if (!s) return;
  currentEditId = id;
  editName.value = s.name;
  editNpm.value = s.npm;
  editMajor.value = s.major;
  editModal.classList.remove("hidden");
}
cancelEdit.onclick = () => editModal.classList.add("hidden");

saveEdit.onclick = async () => {
  const updated = {
    name: editName.value.trim(),
    npm: editNpm.value.trim(),
    major: editMajor.value.trim(),
  };
  const res = await fetch(`${API_URL}/${currentEditId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (res.ok) {
    editModal.classList.add("hidden");
    showToast("✅ Data berhasil diperbarui");
    fetchStudents();
  } else showToast("❌ Gagal update", "bg-red-600");
};

// delete
async function deleteStudent(id) {
  if (!confirm("Yakin mau hapus data ini?")) return;
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.status === 204) {
    showToast("🗑️ Data dihapus", "bg-amber-600");
    fetchStudents();
  } else showToast("❌ Gagal hapus data", "bg-red-600");
}

// search & filter
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderTable();
});
majorFilter.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

// update dropdown
function updateMajorFilter() {
  const majors = [...new Set(students.map((s) => s.major))];
  majorFilter.innerHTML = `<option value="">Semua Jurusan</option>` + majors.map((m) => `<option value="${m}">${m}</option>`).join("");
}

fetchStudents();

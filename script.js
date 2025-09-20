// =========================
// ==== STUDENTS PART ======
// =========================

// ===== Load Students =====
async function loadStudents() {
  try {
    const res = await fetch("api/getStudent.php");
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const data = await res.json();
    const tbody = document.getElementById("studentBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No students found</td></tr>`;
      return;
    }

    data.forEach(stud => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${stud.Stud_id}</td>
        <td>${stud.Name}</td>
        <td>${stud.Program_id}</td>
        <td>${stud.Allowance}</td>
        <td>
          <button class="editBtn" data-id="${stud.Stud_id}">Edit</button>
          <button class="deleteBtn" data-id="${stud.Stud_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Delete this student?")) {
          const res = await fetch("/apideleteStudent.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          const result = await res.json();
          if (result.success) loadStudents();
          else alert(result.message);
        }
      });
    });

    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const student = data.find(s => s.Stud_id == id);
        showEditStudentForm(student);
      });
    });

  } catch (err) {
    console.error("Error loading students:", err);
  }
}

// ===== Show Add Student Modal =====
function showAddStudentForm() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  form.innerHTML = `
    <h2>Add Student</h2>
    <label>Name:</label>
    <input type="text" name="name" required>
    <label>Allowance:</label>
    <input type="number" name="allowance" step="0.01" required>
    <button type="submit">Save</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentData = {
      name: form.name.value.trim(),
      allowance: form.allowance.value.trim()
    };
    try {
      const res = await fetch("api/addStudent.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadStudents();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

// ===== Show Edit Student Modal =====
function showEditStudentForm(student) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  form.innerHTML = `
    <h2>Edit Student</h2>
    <label>Name:</label>
    <input type="text" name="name" value="${student.Name}" required>
    <label>Program ID:</label>
    <input type="text" name="program" value="${student.Program_id}" required>
    <label>Allowance:</label>
    <input type="number" name="allowance" value="${student.Allowance}" step="0.01" required>
    <button type="submit">Update</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentData = {
      id: student.Stud_id,
      name: form.name.value.trim(),
      program: form.program.value.trim(),
      allowance: form.allowance.value.trim()
    };
    try {
      const res = await fetch("api/editStudent.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadStudents();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

function attachAddStudentBtn() {
  const btn = document.getElementById("newStudentForm");
  if (btn) btn.addEventListener("click", showAddStudentForm);
}


// =========================
// ==== PROGRAMS PART ======
// =========================

async function loadPrograms() {
  try {
    const res = await fetch("api/getProgram.php");
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const data = await res.json();
    const tbody = document.getElementById("programBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3">No programs found</td></tr>`;
      return;
    }

    data.forEach(prog => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${prog.Program_id}</td>
        <td>${prog.Program_name}</td>
        <td>
          <button class="editBtn" data-id="${prog.Program_id}">Edit</button>
          <button class="deleteBtn" data-id="${prog.Program_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Delete this program?")) {
          const res = await fetch("api/deleteProgram.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          const result = await res.json();
          if (result.success) loadPrograms();
          else alert(result.message);
        }
      });
    });

    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const program = data.find(p => p.Program_id == id);
        showEditProgramForm(program);
      });
    });

  } catch (err) {
    console.error("Error loading programs:", err);
  }
}

// ===== Show Add Program Modal =====
async function showAddProgramForm() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  const institutesRes = await fetch("api/getInstitute.php");
  const institutes = await institutesRes.json();

  const instituteOptions = institutes
    .map(inst => `<option value="${inst.ins_id}">${inst.ins_name}</option>`)
    .join("");

  form.innerHTML = `
    <h2>Add Program</h2>
    <label>Institute:</label> 
    <div style="display:flex; gap:10px; align-items:center;">
      <select name="institute" id="instituteSelect" required>
        ${instituteOptions}
      </select>
      <button type="button" id="addInstituteBtn">Add Institute +</button>
    </div>
    <label>Program Name:</label>
    <input type="text" name="program" required>
    <button type="submit">Save Program</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const programData = {
      name: form.program.value.trim(),
      ins_id: document.getElementById("instituteSelect").value
    };
    try {
      const res = await fetch("api/addProgram.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(programData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadPrograms();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });

  form.querySelector("#addInstituteBtn").addEventListener("click", async () => {
    const newInst = await showAddInstituteForm();
    if (newInst) {
      const select = form.querySelector("#instituteSelect");
      const option = document.createElement("option");
      option.value = newInst.id;
      option.textContent = newInst.name;
      option.selected = true;
      select.appendChild(option);
    }
  });
}

// ===== Show Edit Program Modal =====
async function showEditProgramForm(program) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  const institutesRes = await fetch("api/getInstitute.php");
  const institutes = await institutesRes.json();

  const instituteOptions = institutes
    .map(inst =>
      `<option value="${inst.ins_id}" ${inst.ins_id == program.ins_id ? "selected" : ""}>${inst.ins_name}</option>`
    )
    .join("");

  form.innerHTML = `
    <h2>Edit Program</h2>
    <label>Institute:</label>
    <select name="institute" id="editInstituteSelect" required>
      ${instituteOptions}
    </select>
    <label>Program Name:</label>
    <input type="text" name="program" value="${program.Program_name}" required>
    <button type="submit">Update</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProgram = {
      id: program.Program_id,
      name: form.program.value.trim(),
      ins_id: document.getElementById("editInstituteSelect").value
    };

    try {
      const res = await fetch("api/editProgram.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProgram)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadPrograms();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

// ===== Show Add Institute Modal =====
function showAddInstituteForm() {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.className = "modal";

    const form = document.createElement("form");
    form.className = "subform";

    form.innerHTML = `
      <h2>Add Institute</h2>
      <label>Institute Name:</label>
      <input type="text" name="institute" required>
      <button type="submit">Save Institute</button>
      <button type="button" class="closeBtn">Cancel</button>
    `;

    modal.appendChild(form);
    document.body.appendChild(modal);

    form.querySelector(".closeBtn").addEventListener("click", () => {
      modal.remove();
      resolve(null);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const instituteData = { name: form.institute.value.trim() };
      try {
        const res = await fetch("api/addInstitute.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(instituteData)
        });
        const result = await res.json();
        if (result.success) {
          modal.remove();
          resolve({ id: result.id, name: instituteData.name });
        } else {
          alert(result.message);
          resolve(null);
        }
      } catch (err) { console.error(err); resolve(null); }
    });
  });
}

function attachAddProgramBtn() {
  const btn = document.getElementById("newProgramForm");
  if (btn) btn.addEventListener("click", showAddProgramForm);
}


// ===============================
// ==== YEARS & SEMESTERS PART ===
// ===============================

async function loadYearsAndSemesters() {
  try {
    const res = await fetch("api/getYear.php");
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const data = await res.json();
    const tbody = document.getElementById("yearSemBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No year/semester found</td></tr>`;
      return;
    }

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.year_id}</td>
        <td>${item.year_from}</td>
        <td>${item.year_to}</td>
        <td>${item.sem_name}</td>
        <td>
          <button class="editBtn" data-id="${item.year_id}">Edit</button>
          <button class="deleteBtn" data-id="${item.year_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const year = data.find(y => y.year_id == id);
        showEditYearForm(year);
      });
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Delete this year & semester?")) {
          const res = await fetch("api/deleteYear.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          const result = await res.json();
          if (result.success) loadYearsAndSemesters();
          else alert(result.message);
        }
      });
    });

  } catch (err) {
    console.error("Error loading years & semesters:", err);
  }
}

function showAddYearForm() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";
  form.innerHTML = `
    <h2>Add Year & Semester</h2>
    <label>Year From:</label>
    <input type="number" name="year_from" required>
    <label>Year To:</label>
    <input type="number" name="year_to" required>
    <label>Semester:</label>
    <select name="semester" required>
      <option value="1st Semester">1st Semester</option>
      <option value="2nd Semester">2nd Semester</option>
      <option value="Summer">Summer</option>
    </select>
    <button type="submit">Save</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const yearData = {
      year_from: form.year_from.value.trim(),
      year_to: form.year_to.value.trim(),
      sem_name: form.semester.value.trim()
    };
    try {
      const res = await fetch("api/addYear&Sem.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yearData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadYearsAndSemesters();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

function showEditYearForm(year) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";
  form.innerHTML = `
    <h2>Edit Year & Semester</h2>
    <label>Year From:</label>
    <input type="number" name="year_from" value="${year.year_from}" required>
    <label>Year To:</label>
    <input type="number" name="year_to" value="${year.year_to}" required>
    <label>Semester:</label>
    <select name="semester" required>
      <option value="1st Semester" ${year.sem_name === "1st Semester" ? "selected" : ""}>1st Semester</option>
      <option value="2nd Semester" ${year.sem_name === "2nd Semester" ? "selected" : ""}>2nd Semester</option>
      <option value="Summer" ${year.sem_name === "Summer" ? "selected" : ""}>Summer</option>
    </select>
    <button type="submit">Update</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const yearData = {
      id: year.year_id,
      year_from: form.year_from.value.trim(),
      year_to: form.year_to.value.trim(),
      sem_name: form.semester.value.trim()
    };
    try {
      const res = await fetch("api/editYear.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yearData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadYearsAndSemesters();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

function attachAddYearBtn() {
  const btn = document.getElementById("newYearForm");
  if (btn) btn.addEventListener("click", showAddYearForm);
}


async function loadSubjects() {
  try {
    const res = await fetch("api/getSubject.php");
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const data = await res.json();
    const tbody = document.getElementById("subjectBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No subjects found</td></tr>`;
      return;
    }

    data.forEach(sub => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sub.subject_id}</td>
        <td>${sub.subject_name}</td>
        <td>${sub.sem_name || "-"}</td>
        <td>
          <button class="editBtn" data-id="${sub.subject_id}">Edit</button>
          <button class="deleteBtn" data-id="${sub.subject_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Delete this subject?")) {
          const res = await fetch("api/deleteSubject.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          const result = await res.json();
          if (result.success) loadSubjects();
          else alert(result.message);
        }
      });
    });

    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const subject = data.find(s => s.subject_id == id);
        showEditSubjectForm(subject);
      });
    });

  } catch (err) {
    console.error("Error loading subjects:", err);
  }
}

// ===== Show Add Subject Modal =====
async function showAddSubjectForm() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  const progRes = await fetch("api/getProgram.php");
  const programs = await progRes.json();
  const progOptions = programs.map(p =>
    `<option value="${p.Program_id}">${p.Program_name}</option>`
  ).join("");

  const semRes = await fetch("api/getYear.php");
  const semesters = await semRes.json();
  const semOptions = semesters.map(s =>
    `<option value="${s.sem_id}">${s.sem_name}</option>`
  ).join("");

  form.innerHTML = `
    <h2>Add Subject</h2>
    <label>Subject Name:</label>
    <input type="text" name="subj_name" required>
    <label>Program:</label>
    <select name="program" required>
      ${progOptions}
    </select>
    <label>Semester:</label>
    <select name="semester" required>
      ${semOptions}
    </select>
    <button type="submit">Save Subject</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subjData = {
      name: form.subj_name.value.trim(),
      program_id: form.program.value,
      sem_id: form.semester.value
    };
    try {
      const res = await fetch("api/addSubject.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subjData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadSubjects();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

// ===== Show Edit Subject Modal =====
async function showEditSubjectForm(subject) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  const progRes = await fetch("api/getProgram.php");
  const programs = await progRes.json();
  const progOptions = programs.map(p =>
    `<option value="${p.Program_id}" ${p.Program_id == subject.Program_id ? "selected" : ""}>${p.Program_name}</option>`
  ).join("");

  const semRes = await fetch("api/getYear.php");
  const semesters = await semRes.json();
  const semOptions = semesters.map(s =>
    `<option value="${s.sem_id}" ${s.sem_id == subject.sem_id ? "selected" : ""}>${s.sem_name}</option>`
  ).join("");

  form.innerHTML = `
    <h2>Edit Subject</h2>
    <label>Subject Name:</label>
    <input type="text" name="subj_name" value="${subject.subject_name}" required>
    <label>Program:</label>
    <select name="program" required>
      ${progOptions}
    </select>
    <label>Semester:</label>
    <select name="semester" required>
      ${semOptions}
    </select>
    <button type="submit">Update Subject</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subjData = {
      id: subject.subject_id,
      name: form.subj_name.value.trim(),
      program_id: form.program.value,
      sem_id: form.semester.value
    };
    try {
      const res = await fetch("api/editSubject.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subjData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadSubjects();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

function attachAddSubjectBtn() {
  const btn = document.getElementById("newSubjectForm");
  if (btn) btn.addEventListener("click", showAddSubjectForm);
}

// =========================
// ==== ENROLLMENT PART =====
// =========================

async function loadEnrollments() {
  try {
    const res = await fetch("api/getEnrolledStudents.php"); // you need this API
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const data = await res.json();
    const tbody = document.getElementById("enrollmentBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">No enrollments found</td></tr>`;
      return;
    }

    data.forEach(enroll => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${enroll.enroll_id}</td>
        <td>${enroll.student_name}</td>
        <td>${enroll.program_name}</td>
        <td>${enroll.sem_name}</td>
        <td>${enroll.subject_name}</td>
        <td>
          <button class="editBtn" data-id="${enroll.enroll_id}">Edit</button>
          <button class="deleteBtn" data-id="${enroll.enroll_id}">Unenroll</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Delete
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Delete this enrollment?")) {
          const res = await fetch("api/unenrollStudents.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          const result = await res.json();
          if (result.success) loadEnrollments();
          else alert(result.message);
        }
      });
    });

    // Edit
    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const enrollment = data.find(en => en.enroll_id == id);
        showEditEnrollmentForm(enrollment);
      });
    });

  } catch (err) {
    console.error("Error loading enrollments:", err);
  }
}

// ===== Show Add Enrollment Modal =====
async function showAddEnrollmentForm() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  // Fetch students, programs, semesters, subjects
  const [studentsRes, programsRes, yearsRes, subjectsRes] = await Promise.all([
    fetch("api/getStudent.php"),
    fetch("api/getProgram.php"),
    fetch("api/getYear.php"),
    fetch("api/getSubject.php")
  ]);

  const students = await studentsRes.json();
  const programs = await programsRes.json();
  const years = await yearsRes.json();
  const subjects = await subjectsRes.json();

  const studentOptions = students.map(s => `<option value="${s.Stud_id}">${s.Name}</option>`).join("");
  const programOptions = programs.map(p => `<option value="${p.Program_id}">${p.Program_name}</option>`).join("");
  const semesterOptions = years.map(y => `<option value="${y.sem_id}">${y.sem_name}</option>`).join("");
  const subjectOptions = subjects.map(sub => `<option value="${sub.subject_id}">${sub.subject_name}</option>`).join("");

  form.innerHTML = `
    <h2>Add Enrollment</h2>
    <label>Student:</label>
    <select name="student" required>${studentOptions}</select>
    <label>Program:</label>
    <select name="program" required>${programOptions}</select>
    <label>Semester:</label>
    <select name="semester" required>${semesterOptions}</select>
    <label>Subject:</label>
    <select name="subject" required>${subjectOptions}</select>
    <button type="submit">Enroll</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enrollData = {
      student_id: form.student.value,
      program_id: form.program.value,
      sem_id: form.semester.value,
      subject_id: form.subject.value
    };

    try {
      const res = await fetch("api/enrollStudents.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadEnrollments();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

// ===== Show Edit Enrollment Modal =====
async function showEditEnrollmentForm(enrollment) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const form = document.createElement("form");
  form.className = "subform";

  const [studentsRes, programsRes, yearsRes, subjectsRes] = await Promise.all([
    fetch("api/getStudent.php"),
    fetch("api/getProgram.php"),
    fetch("api/getYear.php"),
    fetch("api/getSubject.php")
  ]);

  const students = await studentsRes.json();
  const programs = await programsRes.json();
  const years = await yearsRes.json();
  const subjects = await subjectsRes.json();

  const studentOptions = students.map(s => `<option value="${s.Stud_id}" ${s.Stud_id == enrollment.student_id ? "selected" : ""}>${s.Name}</option>`).join("");
  const programOptions = programs.map(p => `<option value="${p.Program_id}" ${p.Program_id == enrollment.program_id ? "selected" : ""}>${p.Program_name}</option>`).join("");
  const semesterOptions = years.map(y => `<option value="${y.sem_id}" ${y.sem_id == enrollment.sem_id ? "selected" : ""}>${y.sem_name}</option>`).join("");
  const subjectOptions = subjects.map(sub => `<option value="${sub.subject_id}" ${sub.subject_id == enrollment.subject_id ? "selected" : ""}>${sub.subject_name}</option>`).join("");

  form.innerHTML = `
    <h2>Edit Enrollment</h2>
    <label>Student:</label>
    <select name="student" required>${studentOptions}</select>
    <label>Program:</label>
    <select name="program" required>${programOptions}</select>
    <label>Semester:</label>
    <select name="semester" required>${semesterOptions}</select>
    <label>Subject:</label>
    <select name="subject" required>${subjectOptions}</select>
    <button type="submit">Update</button>
    <button type="button" class="closeBtn">Cancel</button>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  form.querySelector(".closeBtn").addEventListener("click", () => modal.remove());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enrollData = {
      id: enrollment.enroll_id,
      student_id: form.student.value,
      program_id: form.program.value,
      sem_id: form.semester.value,
      subject_id: form.subject.value
    };

    try {
      const res = await fetch("api/editEnrollment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollData)
      });
      const result = await res.json();
      if (result.success) {
        modal.remove();
        loadEnrollments();
      } else alert(result.message);
    } catch (err) { console.error(err); }
  });
}

function attachAddEnrollmentBtn() {
  const btn = document.getElementById("newEnrollmentForm");
  if (btn) btn.addEventListener("click", showAddEnrollmentForm);
}



// =========================
// ==== NAVIGATION =========
// =========================

document.querySelectorAll("header a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    const content = document.getElementById("content");

    if (page === "students") {
      content.innerHTML = `
        <h1 class="page-title">Students</h1>
        <button id="newStudentForm">Add Student +</button>
        <table id="studentTable" border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Program ID</th>
              <th>Allowance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="studentBody"></tbody>
        </table>
      `;
      loadStudents();
      attachAddStudentBtn();

    } else if (page === "programs") {
      content.innerHTML = `
        <h1 class="page-title">Programs</h1>
        <button id="newProgramForm">Add Program +</button>
        <table id="programTable" border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Program Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="programBody"></tbody>
        </table>
      `;
      loadPrograms();
      attachAddProgramBtn();

    } else if (page === "years") {
      content.innerHTML = `
        <h1 class="page-title">Years & Semesters</h1>
        <button id="newYearForm">Add Year & Semester +</button>
        <table id="yearSemTable" border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Year ID</th>
              <th>Year From</th>
              <th>Year To</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="yearSemBody"></tbody>
        </table>
      `;
      loadYearsAndSemesters();
      attachAddYearBtn();

    } else if (page === "subjects") {
      content.innerHTML = `
        <h1 class="page-title">Subjects</h1>
        <button id="newSubjectForm">Add Subject +</button>
        <table id="subjectTable" border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject Name</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="subjectBody"></tbody>
        </table>
      `;
      loadSubjects();
      attachAddSubjectBtn();
      
    } else if (page === "Enrollments") {
  content.innerHTML = `
    <h1 class="page-title">Enrollment</h1>
    <button id="newEnrollmentForm"> Enroll Students</button>
    <table id="enrollmentTable" border="1" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Program</th>
          <th>Semester</th>
          <th>Subject</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="enrollmentBody"></tbody>
    </table>
  `;
  loadEnrollments();
  attachAddEnrollmentBtn();
}
else {
      content.innerHTML = `<h1 class="page-title">${page.charAt(0).toUpperCase() + page.slice(1)}</h1><p>Coming Soon!</p>`;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('header a[data-page="students"]').click();
}); 

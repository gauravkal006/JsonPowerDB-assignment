
"use strict";

const StudentApp = (() => {
  const el = id => document.getElementById(id);

  const fieldIds = [
    "fullName",
    "studentClass",
    "birthDate",
    "address",
    "enrollmentDate"
  ];

  let mode = "idle";
  let recordNo = null;
  let busy = false;
  let lookupVersion = 0;

  // ---------------------------------------
  // UI HELPERS
  // ---------------------------------------

  function showStatus(text, type = "secondary") {
    const status = el("status");

    status.textContent = text;
    status.className =
      "status-message text-" + type;
  }

  function enableFields(enabled) {
    fieldIds.forEach(id => {
      el(id).disabled = !enabled;
    });
  }

  function updateButtons() {
    el("saveBtn").disabled =
      busy || mode !== "new";

    el("updateBtn").disabled =
      busy || mode !== "existing";

    el("deleteBtn").disabled =
      busy || mode !== "existing";

    el("resetBtn").disabled =
      busy || mode === "idle";

    el("recordBtn").disabled = busy;
  }

  function resetForm() {
    lookupVersion++;
    busy = false;
    mode = "idle";
    recordNo = null;

    el("studentForm").reset();
    el("rollNo").disabled = false;

    enableFields(false);
    updateButtons();

    showStatus("");
    el("rollNo").focus();
  }

  function setMode(nextMode) {
    mode = nextMode;

    el("rollNo").disabled = true;
    enableFields(true);

    updateButtons();
    el("fullName").focus();
  }

  function populateStudent(record) {
    el("rollNo").value =
      record["Roll-No"] ?? "";

    el("fullName").value =
      record["Full-Name"] ?? "";

    el("studentClass").value =
      record["Class"] ?? "";

    el("birthDate").value =
      record["Birth-Date"] ?? "";

    el("address").value =
      record["Address"] ?? "";

    el("enrollmentDate").value =
      record["Enrollment-Date"] ?? "";
  }

  function getStudentData() {
    const student = {
      "Roll-No": el("rollNo").value.trim(),
      "Full-Name": el("fullName").value.trim(),
      "Class": el("studentClass").value.trim(),
      "Birth-Date": el("birthDate").value,
      "Address": el("address").value.trim(),
      "Enrollment-Date": el("enrollmentDate").value
    };

    for (const [key, value] of Object.entries(student)) {
      if (value === "") {
        alert(key + " is required.");
        return null;
      }
    }

    if (
      student["Birth-Date"] >
      student["Enrollment-Date"]
    ) {
      alert(
        "Enrollment Date cannot be before Birth Date."
      );
      return null;
    }

    return student;
  }

  function handleError(action, error) {
    console.error(action, error);

    showStatus(
      action + ": " + error.message,
      "danger"
    );

    if (error instanceof TypeError) {
      alert(
        "Network request failed.\n" +
        "Check your internet, API endpoint, " +
        "and browser CORS restrictions."
      );
    }
  }

  // ---------------------------------------
  // READ: GET_BY_KEY
  // ---------------------------------------

  async function lookupStudent() {
    if (busy || mode !== "idle") return;

    const rollNo = el("rollNo").value.trim();

    if (!rollNo) {
      showStatus(
        "Please enter a Roll Number.",
        "danger"
      );
      return;
    }

    const version = ++lookupVersion;

    busy = true;
    el("rollNo").disabled = true;
    updateButtons();

    showStatus(
      "Searching for Roll Number...",
      "primary"
    );

    try {
      const result = await JPDB.getByKey(rollNo);

      if (version !== lookupVersion) return;

      if (Number(result.status) === 200) {
        const data = JPDB.parseData(result);

        if (
          !data ||
          data.rec_no == null ||
          !data.record
        ) {
          throw new Error(
            "Invalid student lookup response."
          );
        }

        recordNo = data.rec_no;

        populateStudent(data.record);

        busy = false;
        setMode("existing");

        showStatus(
          "Student found. Update or Delete is available.",
          "success"
        );

      } else if (JPDB.isNotFound(result)) {
        recordNo = null;

        busy = false;
        setMode("new");

        showStatus(
          "New Roll Number. Fill the form and Save.",
          "primary"
        );

      } else {
        throw new Error(
          result.message || "Lookup failed."
        );
      }

    } catch (error) {
      if (version !== lookupVersion) return;

      busy = false;
      el("rollNo").disabled = false;

      updateButtons();
      handleError("Lookup failed", error);
      el("rollNo").focus();
    }
  }

  // ---------------------------------------
  // CREATE: PUT
  // ---------------------------------------

  async function saveStudent() {
    if (mode !== "new" || busy) return;

    const student = getStudentData();

    if (!student) return;

    busy = true;
    updateButtons();

    showStatus("Saving student...", "primary");

    try {
      const result =
        await JPDB.createStudent(student);

      JPDB.assertSuccess(result);

      alert("Student saved successfully!");
      resetForm();

    } catch (error) {
      handleError("Save failed", error);

    } finally {
      busy = false;
      updateButtons();
    }
  }

  // ---------------------------------------
  // UPDATE: UPDATE
  // ---------------------------------------

  async function updateStudent() {
    if (
      mode !== "existing" ||
      recordNo == null ||
      busy
    ) return;

    const student = getStudentData();

    if (!student) return;

    busy = true;
    updateButtons();

    showStatus("Updating student...", "primary");

    try {
      const result =
        await JPDB.updateStudent(
          recordNo,
          student
        );

      JPDB.assertSuccess(result);

      alert("Student updated successfully!");
      resetForm();

    } catch (error) {
      handleError("Update failed", error);

    } finally {
      busy = false;
      updateButtons();
    }
  }

  // ---------------------------------------
  // DELETE: REMOVE
  // ---------------------------------------

  async function deleteStudent() {
    if (
      mode !== "existing" ||
      recordNo == null ||
      busy
    ) return;

    const rollNo = el("rollNo").value;

    const confirmed = confirm(
      "Are you sure you want to delete student " +
      rollNo + "?\n\nThis cannot be undone."
    );

    if (!confirmed) return;

    busy = true;
    updateButtons();

    showStatus("Deleting student...", "primary");

    try {
      const result =
        await JPDB.deleteStudent(recordNo);

      JPDB.assertSuccess(result);

      alert("Student deleted successfully!");
      resetForm();

    } catch (error) {
      handleError("Delete failed", error);

    } finally {
      busy = false;
      updateButtons();
    }
  }

  // ---------------------------------------
  // READ: GET_BY_RECORD
  // ---------------------------------------

  async function searchByRecord() {
    if (busy) return;

    const raw =
      el("recordSearch").value.trim();

    const recNo = Number(raw);

    if (
      raw === "" ||
      !Number.isSafeInteger(recNo) ||
      recNo <= 0
    ) {
      alert("Enter a valid positive record number.");
      return;
    }

    const version = ++lookupVersion;

    busy = true;
    updateButtons();

    showStatus(
      "Searching by record number...",
      "primary"
    );

    try {
      const result =
        await JPDB.getByRecord(recNo);

      if (version !== lookupVersion) return;

      JPDB.assertSuccess(result);

      const data = JPDB.parseData(result);

      if (!data || !data.record) {
        throw new Error(
          "Invalid record response."
        );
      }

      el("studentForm").reset();
      populateStudent(data.record);

      recordNo = data.rec_no ?? recNo;

      busy = false;
      setMode("existing");

      showStatus(
        "Student loaded by record number.",
        "success"
      );

    } catch (error) {
      if (version !== lookupVersion) return;

      handleError("Record lookup failed", error);

    } finally {
      busy = false;
      updateButtons();
    }
  }

  // ---------------------------------------
  // INITIALIZATION
  // ---------------------------------------

  function init() {
    el("rollNo").addEventListener(
      "blur",
      lookupStudent
    );

    el("rollNo").addEventListener(
      "keydown",
      event => {
        if (event.key === "Enter") {
          event.preventDefault();
          el("rollNo").blur();
        }
      }
    );

    el("saveBtn").addEventListener(
      "click",
      saveStudent
    );

    el("updateBtn").addEventListener(
      "click",
      updateStudent
    );

    el("deleteBtn").addEventListener(
      "click",
      deleteStudent
    );

    el("resetBtn").addEventListener(
      "click",
      resetForm
    );

    el("recordBtn").addEventListener(
      "click",
      searchByRecord
    );

    el("studentForm").addEventListener(
      "submit",
      event => event.preventDefault()
    );

    resetForm();
  }

  return { init };
})();

document.addEventListener(
  "DOMContentLoaded",
  StudentApp.init
);

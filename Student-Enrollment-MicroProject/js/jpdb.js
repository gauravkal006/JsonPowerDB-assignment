
"use strict";

const JPDB = (() => {
  const config = JPDB_CONFIG;

  function checkToken() {
    if (
      !config.TOKEN ||
      config.TOKEN === "PASTE_YOUR_CONNECTION_TOKEN_HERE"
    ) {
      throw new Error(
        "Configure your JsonPowerDB connection token first."
      );
    }
  }

  function parseResponse(raw) {
    let result = JSON.parse(raw);

    if (typeof result === "string") {
      result = JSON.parse(result);
    }

    if (!result || typeof result !== "object") {
      throw new Error("Invalid JsonPowerDB response.");
    }

    return result;
  }

  async function request(cmd, endpoint, options = {}) {
    checkToken();

    const payload = {
      token: config.TOKEN,
      dbName: config.DB_NAME,
      rel: config.REL_NAME,
      cmd,
      ...options
    };

    // JsonPowerDB accepts JSON request strings.
    // text/plain is used to avoid unnecessary
    // browser CORS preflight requests.
    const response = await fetch(
      config.BASE_URL + endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload)
      }
    );

    const raw = await response.text();

    let result;

    try {
      result = parseResponse(raw);
    } catch {
      throw new Error(
        "Server returned an invalid JSON response."
      );
    }

    // Never display the request payload because
    // it contains the connection token.
    const responseBox =
      document.getElementById("responseBox");

    if (responseBox) {
      responseBox.textContent =
        JSON.stringify(result, null, 2);
    }

    if (!response.ok && !result.message) {
      throw new Error("HTTP " + response.status);
    }

    return result;
  }

  function parseData(result) {
    let data = result.data;

    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    return data;
  }

  function assertSuccess(result) {
    if (Number(result.status) !== 200) {
      throw new Error(
        result.message || "Database operation failed."
      );
    }
    return result;
  }

  function isNotFound(result) {
    if (Number(result.status) !== 400) {
      return false;
    }

    const message =
      String(result.message || "").toLowerCase();

    return (
      message.includes("not found") ||
      message.includes("not exist") ||
      message.includes("no record") ||
      message.includes("no data")
    );
  }

  // READ: Search by Roll Number
  async function getByKey(rollNo) {
    return request("GET_BY_KEY", "/api/irl", {
      jsonStr: {
        "Roll-No": rollNo
      }
    });
  }

  // READ: Search by internal record number
  async function getByRecord(recNo) {
    return request("GET_BY_RECORD", "/api/irl", {
      record: recNo
    });
  }

  // CREATE: Insert new student
  async function createStudent(student) {
    return request("PUT", "/api/iml", {
      jsonStr: student
    });
  }

  // UPDATE: Modify existing record
  async function updateStudent(recNo, student) {
    const changes = { ...student };

    // Roll-No is the logical primary key.
    // Do not modify it during an update.
    delete changes["Roll-No"];

    return request("UPDATE", "/api/iml", {
      jsonStr: {
        [recNo]: changes
      }
    });
  }

  // DELETE: Remove existing record
  async function deleteStudent(recNo) {
    return request("REMOVE", "/api/iml", {
      record: recNo
    });
  }

  return {
    getByKey,
    getByRecord,
    createStudent,
    updateStudent,
    deleteStudent,
    parseData,
    assertSuccess,
    isNotFound
  };
})();

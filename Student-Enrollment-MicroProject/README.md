
# 🎓 Student Enrollment Management System

### A CRUD-Based Web Application Using JsonPowerDB

A responsive Student Enrollment Management System built using
**HTML5, CSS3, JavaScript, Bootstrap 5, and JsonPowerDB**.

This project demonstrates how to integrate a web-based form
with JsonPowerDB using REST APIs to perform Create, Read,
Update, and Delete (CRUD) operations.

---

## 📌 Project Overview

The Student Enrollment Management System is a web application
designed to simplify student record management.

Users can create student records, retrieve existing student
information, update details, and delete records.

The application uses **JsonPowerDB** for storing and
managing student enrollment information.

### Project Information

| Property | Details |
|----------|---------|
| Project Name | Student Enrollment Management System |
| Project Type | Internship Micro Project |
| Database | JsonPowerDB |
| Database Name | SCHOOL-DB |
| Relation Name | STUDENT-TABLE |
| Primary Key Field | Roll-No |
| Frontend | HTML5, CSS3, Bootstrap 5 |
| Programming Language | JavaScript |
| API Architecture | REST API |

---

## ✨ Features

- **Student Registration:** Add new student records.
- **Automatic Roll Number Lookup:** Check existing records.
- **Retrieve Student Details:** Fetch records using Roll Number.
- **Update Student Records:** Modify existing information.
- **Delete Student Records:** Remove records with confirmation.
- **Search by Record Number:** Retrieve records using rec_no.
- **Input Validation:** Prevent submission of empty fields.
- **Dynamic Form Controls:** Enable or disable buttons based
  on record availability.
- **Reset Functionality:** Clear the form and restore its
  initial state.
- **Responsive Design:** Compatible with desktop and mobile.
- **Database Response Viewer:** Display API responses.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Web page structure |
| CSS3 | Custom styling |
| Bootstrap 5 | Responsive user interface |
| JavaScript | Form validation and application logic |
| JsonPowerDB | Database storage |
| REST API | Communication with JsonPowerDB |
| VS Code | Development environment |
| Git & GitHub | Version control and hosting source code |

---

## 🗄️ Database Structure

**Database Name:** `SCHOOL-DB`

**Relation Name:** `STUDENT-TABLE`

### Student Record Fields

| Field Name | Description |
|------------|-------------|
| Roll-No | Unique student identifier |
| Full-Name | Student's full name |
| Class | Student's class |
| Birth-Date | Student's date of birth |
| Address | Student's residential address |
| Enrollment-Date | Date of student enrollment |

### Example JSON Record

```json
{
  "Roll-No": "STU101",
  "Full-Name": "Rahul Sharma",
  "Class": "12-A",
  "Birth-Date": "2008-05-15",
  "Address": "Amravati, Maharashtra",
  "Enrollment-Date": "2026-06-10"
}
```

---

## 🔄 CRUD Operations

The application uses JsonPowerDB commands to perform
database operations.

| Operation | JsonPowerDB Command | Description |
|-----------|---------------------|-------------|
| Create | PUT | Insert a new student |
| Read | GET_BY_KEY | Find a student by Roll Number |
| Read | GET_BY_RECORD | Find a student by record number |
| Update | UPDATE | Modify an existing student |
| Delete | REMOVE | Delete an existing student |

### Create

1. Enter a new Roll Number.
2. The application checks whether it exists.
3. If not found, the Save button becomes enabled.
4. Enter all required student details.
5. Click Save to insert the record.

### Read

1. Enter an existing Roll Number.
2. The application retrieves the corresponding record.
3. Student details appear automatically in the form.

### Update

1. Search for an existing student.
2. Modify the required fields.
3. Click Update.
4. The application updates the existing database record.

### Delete

1. Retrieve an existing student record.
2. Click Delete.
3. Confirm the deletion.
4. The record is removed from JsonPowerDB.

---

## 📂 Project Folder Structure

```text
Student-Enrollment-MicroProject/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── config.js
│   ├── jpdb.js
│   └── app.js
│
├── README.md
└── .gitignore
```

### File Descriptions

- `index.html` - Main student enrollment form.
- `css/style.css` - Custom styling and responsive layout.
- `js/config.js` - JsonPowerDB configuration.
- `js/jpdb.js` - Database API operations.
- `js/app.js` - CRUD logic, validation, and event handling.
- `README.md` - Project documentation.
- `.gitignore` - Files excluded from Git tracking.

---

## 🚀 Installation and Setup

### Prerequisites

- Visual Studio Code
- A modern web browser
- Live Server VS Code extension
- JsonPowerDB account
- Valid JsonPowerDB connection token
- Internet connection

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Student-Enrollment-Management-System.git
```

### Step 2: Open the Project

```bash
cd Student-Enrollment-Management-System
code .
```

### Step 3: Configure JsonPowerDB

Open `js/config.js` and configure:

```javascript
const JPDB_CONFIG = Object.freeze({
  BASE_URL: "https://api.login2explore.com:5577",
  DB_NAME: "SCHOOL-DB",
  REL_NAME: "STUDENT-TABLE",
  TOKEN: "YOUR_CONNECTION_TOKEN"
});
```

**Security Note:** Never commit a real connection token to
a public repository. For production, use a backend service
to keep database credentials secure.

### Step 4: Run the Application

1. Open `index.html` in VS Code.
2. Right-click and select **Open with Live Server**.
3. The application opens in your browser.
4. Enter a Roll Number to begin.

No npm installation or build process is required.

**Note:** Direct browser requests depend on JsonPowerDB
allowing cross-origin access (CORS).

---

## 🧠 Application Workflow

```text
Start Application
       |
       v
Enter Roll Number
       |
       v
GET_BY_KEY Request
       |
       v
Does Record Exist?
       |
   +---+---+
   |       |
  NO      YES
   |       |
   v       v
Enable   Display
Save     Existing Data
   |       |
   v       v
Create   Enable Update
Record   and Delete
   |       |
   +---+---+
       |
       v
Reset Form
       |
       v
Ready for Next Entry
```

---

## 🌟 Benefits of Using JsonPowerDB

### 1. JSON-Based Database
JsonPowerDB stores and manages information using
JSON-based data structures.

### 2. REST API Integration
The database provides REST APIs for inserting,
retrieving, updating, and deleting records.

### 3. Indexed Data Retrieval
Indexed fields support efficient record lookups.

### 4. Simplified Development
Developers can perform database operations without
writing traditional SQL queries.

### 5. Flexible Data Handling
JSON records provide flexibility for applications
working with structured data.

### 6. Lightweight Integration
JsonPowerDB can be integrated with JavaScript-based
applications through HTTP requests.

---

## 🧪 Testing

| Test Case | Expected Result |
|-----------|-----------------|
| Empty Roll Number | Validation message |
| New Roll Number | Save button enabled |
| Existing Roll Number | Student details displayed |
| Save valid student | Record inserted |
| Update student | Existing record modified |
| Delete student | Record removed |
| Reset form | Fields cleared and controls reset |
| Empty required field | Submission prevented |

Live database integration must be verified using
a valid JsonPowerDB connection.

---

## 📸 Screenshots

Screenshots can be added after testing the application.

Suggested screenshots:

1. Student Enrollment Form
2. New Student Registration
3. Existing Student Lookup
4. Student Update
5. Student Deletion
6. JsonPowerDB Database Records

---

## 📈 Future Enhancements

- Student search dashboard
- Display all students in a table
- Pagination and filtering
- Export student records to CSV
- Authentication and role-based access
- Server-side API integration
- Improved validation and error handling

---

## 📅 Release History

### Version 1.0.0 - Initial Release

- Created responsive student enrollment form.
- Integrated JsonPowerDB REST API.
- Implemented CRUD operations.
- Added automatic Roll Number lookup.
- Added input validation.
- Added dynamic Save, Update, Delete, and Reset controls.
- Added record-number search.
- Organized the application into separate files.

---

## 📊 Project Status

**Status:** Implemented; live database testing pending.

This project was developed as an internship micro project
to demonstrate web development and JsonPowerDB integration.

---

## 📚 References

- [JsonPowerDB Documentation](http://login2explore.com/jpdb/docs.html)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [GitHub Documentation](https://docs.github.com/)

---

## 👨‍💻 Author

**Gaurav Kalamkhede**

Internship Micro Project - JsonPowerDB

---

## ⭐ Support

If you find this project useful, consider giving the
repository a star on GitHub.
```

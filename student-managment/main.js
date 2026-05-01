var studentForm = document.getElementById('form-container');
var studentsTableBody = document.getElementById('students-table-body');
var studentCard = document.getElementById('student-card');
var studentDetails = document.getElementById('student-details');
var closeCardButton = document.getElementById('close-card');
var searchFilterRow = document.getElementById('search-filter-row');
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var ageFilter = document.getElementById('age-filter');
var genderFilter = document.getElementById('gender-filter');
var filterButton = document.getElementById('filter-button');
var gradesInputs = document.getElementsByName('grades');
var subjectGradesContainer = document.getElementById('subject-grades-container');

var isEditing = false;
var currentEditingId = null;
var currentStudent = null;

localStorage.removeItem('students');

function getStudents() {
    var stored = localStorage.getItem('students');

    return stored ? JSON.parse(stored) : [];
}

function saveStudents(students) {
    var studentsAsText = JSON.stringify(students);
    localStorage.setItem('students', studentsAsText);
}

function generateStudentId() {
    var students = getStudents();
    return students.length + 1;
}

function showStudentDetails(student) {
    currentStudent = student;
    studentDetails.innerHTML = '';

    studentDetails.appendChild( details('ID', student.id) );
    studentDetails.appendChild( details('Name', student.name) );
    studentDetails.appendChild( details('Age', student.age) );
    studentDetails.appendChild( details('Email', student.email) );
    studentDetails.appendChild( details('Contact', student.contact) );
    studentDetails.appendChild( details('Address', student.address) );
    studentDetails.appendChild( details('Grades', student.averageGrade) );
    studentDetails.appendChild( details('Attendance', student.attendance) );

    studentCard.classList.remove('hidden');
}

function details(label, value) {
    var div = document.createElement('div');
    div.innerHTML = '<span class="font-bold">' + label + ': </span>' + '<span>' + value + '</span>' + '<hr>';
    return div;
}

function hideStudentDetails() {
    studentCard.classList.add('hidden');
    currentStudent = null;
}
 
function getSelectedGradeValue() {
    var selected = document.querySelector('input[name="grades"]:checked');
    return selected ? selected.value : 'No';
}

function toggleSubjectFields() {
    if (!subjectGradesContainer) 
        return;
    if (getSelectedGradeValue() == 'Yes') {
        subjectGradesContainer.classList.remove('hidden');
    } else {
        subjectGradesContainer.classList.add('hidden');
    }
}


function deleteStudent() {
    if (!currentStudent) return;

    var students = getStudents();
    students = students.filter(student => student.id !== currentStudent.id);
    saveStudents(students);

    hideStudentDetails();
    renderStudents();
}

function updateStudent(student) {
    isEditing = true;
    currentEditingId = student.id;

    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('contact').value = student.contact;
    document.getElementById('gender').value = student.gender;
    document.getElementById('email').value = student.email;
    document.getElementById('address').value = student.address;
    var gradeRadio = document.querySelector('input[name="grades"][value="' + student.grades + '"]');
    if (gradeRadio) {
        gradeRadio.checked = true;
    } else {
        var defaultNo = document.querySelector('input[name="grades"][value="No"]');
        if (defaultNo) defaultNo.checked = true;
    }

    toggleSubjectFields();
    if (student.grades == 'Yes' && student.subjectGrades) {
        document.getElementById('subject-english').value = student.subjectGrades.english ;
        document.getElementById('subject-maths').value = student.subjectGrades.maths ;
        document.getElementById('subject-history').value = student.subjectGrades.history ;
        document.getElementById('subject-science').value = student.subjectGrades.science ;
    } 

    document.getElementById('attendance').value = student.attendance;

    var submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Student';
}

function toggleSearchFilterRow(){
    if (!searchFilterRow) return;
    var hasStudent = getStudents().length > 0;
    if(hasStudent){
        searchFilterRow.classList.remove('hidden');
    } else {
        searchFilterRow.classList.add('hidden');
    }
}

function applySearch(){
    var input = searchInput.value.trim().toLowerCase();
    var students = getStudents();

    if (input == ''){
        renderStudents(students);
        return;
    }

    var result = [];
    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var name = student.name.toLowerCase();
        var email = student.email.toLowerCase();

        if (name.includes(input) || email.includes(input)) {
            result.push(student);
        }
    }
    renderStudents(result);
}

function AgeFilter(){
    var students = getStudents();
    var category = ageFilter.value;

    var result =[];
    for (var i =0; i<students.length; i++){
        var student = students[i];
        var ageCategory = AgeCategory(student.age);

        if (ageCategory == category){
            result.push(student);
        }
    }

    if (category == 'all'){
        renderStudents(students);
        return;
    }
    renderStudents(result);
}

function AgeCategory(age) {
    var numberAge = parseInt(age, 10);
    if (numberAge < 18) {
        return 'under-18';
    } else if (numberAge <= 22) {
        return '18-22';
    } else if (numberAge <= 30) {
        return '23-30';
    }
    return 'above-30';
}

function applyFilters() {
    var students = getStudents();
    var selectedGender = genderFilter.value;
    var selectedAgeCategory = ageFilter.value;
    var result = [];

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var ageCategory = AgeCategory(student.age);

        var matchesGender = selectedGender === 'all' || student.gender === selectedGender;
        var matchesAge = selectedAgeCategory === 'all' || ageCategory === selectedAgeCategory;

        if (matchesGender && matchesAge) {
            result.push(student);
        }
    }

    renderStudents(result);
}

function renderStudents(filteredStudents) {
    var students = Array.isArray(filteredStudents) ? filteredStudents : getStudents();

    studentsTableBody.innerHTML = '';

    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        var row = document.createElement('tr');

        var idCell = document.createElement('td');
        idCell.className = 'px-4 py-3 border-t border-slate-200';
        idCell.textContent = student.id;

        var nameCell = document.createElement('td');
        nameCell.className = 'px-4 py-3 border-t border-slate-200';
        nameCell.textContent = student.name;

        var ageCell = document.createElement('td');
        ageCell.className = 'px-4 py-3 border-t border-slate-200';
        ageCell.textContent = student.age;

        var genderCell = document.createElement('td');
        genderCell.className = 'px-4 py-3 border-t border-slate-200';
        genderCell.textContent = student.gender;

        var emailCell = document.createElement('td');
        emailCell.className = 'px-4 py-3 border-t border-slate-200';
        emailCell.textContent = student.email;

        var averageGradeCell = document.createElement('td');
        averageGradeCell.className = 'px-4 py-3 border-t border-slate-200';
        averageGradeCell.textContent = student.averageGrade;

        var actionCell = document.createElement('td');
        actionCell.className = 'px-4 py-3 border-t border-slate-200';

        // buttons
        var buttonContainer = document.createElement('div')
        buttonContainer.className = 'grid grid-cols-3 gap-2 mt-2';

        var viewButton = document.createElement('button');
        viewButton.type = 'button';
        viewButton.className = 'rounded-xl bg-blue-500 px-3 py-2 text-white hover:bg-blue-600';
        viewButton.textContent = 'View More';
        viewButton.addEventListener('click', function () {
            showStudentDetails(student);
        });

        var updateButton = document.createElement('button');
        updateButton.type = 'button';
        updateButton.className = 'rounded-xl bg-green-500 px-3 py-2 text-white hover:bg-green-600';
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', function () {
            updateStudent(student);
        });

        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'rounded-xl bg-red-500 px-3 py-2 text-white hover:bg-red-600';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            var students = getStudents();
            students = students.filter(s => s.id !== student.id);
            saveStudents(students);
            renderStudents();
        });

        buttonContainer.appendChild(viewButton);
        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(genderCell);
        row.appendChild(emailCell);
        row.appendChild(averageGradeCell);
        row.appendChild(actionCell);

        actionCell.appendChild(buttonContainer);

        studentsTableBody.appendChild(row);
    }
    toggleSearchFilterRow();
}


studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var age = document.getElementById('age').value.trim();
    var contact = document.getElementById('contact').value.trim();
    var gender = document.getElementById('gender').value;
    var email = document.getElementById('email').value.trim();
    var address = document.getElementById('address').value.trim();
    var grades = getSelectedGradeValue();
    var attendance = document.getElementById('attendance').value.trim();

    var subjectGrades = null;
    var averageGrade = 'Not mentioned';
    var errorLabel = document.getElementById('grade-error');

    if (grades == 'Yes') {
        var hasGradeError = false;

        var english = parseFloat(document.getElementById('subject-english').value);
        document.getElementById('english-error').textContent = '';
        if (isNaN(english) || english < 0 || english > 100) {
            document.getElementById('english-error').textContent = 'Enter marks between 0 and 100';
            hasGradeError = true;
        }

        var maths = parseFloat(document.getElementById('subject-maths').value);
        document.getElementById('maths-error').textContent = '';
        if (isNaN(maths) || maths < 0 || maths > 100) {
            document.getElementById('maths-error').textContent = 'Enter marks between 0 and 100';
            hasGradeError = true;
        }

        var history = parseFloat(document.getElementById('subject-history').value);
        document.getElementById('history-error').textContent = '';
        if (isNaN(history) || history < 0 || history > 100) {
            document.getElementById('history-error').textContent = 'Enter marks between 0 and 100';
            hasGradeError = true;
        }

        var science = parseFloat(document.getElementById('subject-science').value);
        document.getElementById('science-error').textContent = '';
        if (isNaN(science) || science < 0 || science > 100) {
            document.getElementById('science-error').textContent = 'Enter marks between 0 and 100';
            hasGradeError = true;
        }

        if (hasGradeError) {
            return;
        }

            subjectGrades = { english, maths, history, science };
            averageGrade = ((english + maths + history + science) / 400 * 100).toFixed(2);
            averageGrade += '%';
    }

    var students = getStudents();

   if (isEditing) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].id == currentEditingId) {
            students[i].name = name;
            students[i].age = age;
            students[i].contact = contact;
            students[i].gender = gender;
            students[i].email = email;
            students[i].address = address;
            students[i].grades = grades;
            students[i].subjectGrades = subjectGrades;
            students[i].averageGrade = averageGrade;
            students[i].attendance = attendance;
        }
    }
        isEditing = false;
        currentEditingId = null;
        var submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Add Student';
    } else {
        var newStudent = {
            id: generateStudentId(),
            name: name,
            age: age,
            contact: contact,
            gender: gender,
            email: email,
            address: address,
            grades: grades,
            subjectGrades: subjectGrades,
            averageGrade: averageGrade,
            attendance: attendance
        };
        students.push(newStudent);
    }
    saveStudents(students);

    renderStudents();

    studentForm.reset();
    
    toggleSubjectFields();
    document.getElementById('subject-english').value = '';
    document.getElementById('subject-maths').value = '';
    document.getElementById('subject-history').value = '';
    document.getElementById('subject-science').value = '';
});

searchButton.addEventListener('click', applySearch);
filterButton.addEventListener('click', applyFilters);

for (var i = 0; i < gradesInputs.length; i++) {
    gradesInputs[i].addEventListener('change', toggleSubjectFields);
}

closeCardButton.addEventListener('click', hideStudentDetails);

studentCard.addEventListener('click', function (event) {
    if (event.target === studentCard) {
        hideStudentDetails();
    }
});

renderStudents();
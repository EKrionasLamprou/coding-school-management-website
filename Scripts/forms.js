function openNewForm(category) {
    $(`.${category}-input`).val(''); // reset form values
    $(`#${category}-form-heading`).text('Add'); // add correct heading
    goToPage(`${category}-form`);
}

function openEditForm(category, index) {
    let list = eval('Data.' + category);
    let obj = list[index];

    switch (category) {
        case 'courses':
            $('#courses-input-title').val(obj.title);
            $('#courses-input-stream').val(obj.stream);
            obj.isPartTime ?
                $('#courses-rbtn-parttime').prop("checked", true):
                $('#courses-rbtn-fulltime').prop("checked", true);
            $('#courses-input-startdate').val(obj.startDate);
            $('#courses-input-enddate').val(obj.endDate);
            $('#courses-input-trainers').val(Array.from(obj.trainers));
            $('#courses-input-assignments').val(Array.from(obj.assignments));
            $('#courses-input-index').val(obj.index);
            break;

        case 'students':
            $('#students-input-firstname').val(obj.firstName);
            $('#students-input-lastname').val(obj.lastName);
            $('#students-input-birthdate').val(obj.birthdate);
            $('#students-input-fees').val(obj.tuitionFees);
            $('#students-input-course').val(obj.course);
            getCourseAssignmentsList($('#students-input-course').val());
            $('#students-input-assignments').val(Array.from(obj.assignments));
            $('#students-input-index').val(obj.index);
            break;

        case 'trainers':
            $('#trainers-input-firstname').val(obj.firstName);
            $('#trainers-input-lastname').val(obj.lastName);
            $('#trainers-input-subject').val(obj.subject);
            $('#trainers-input-index').val(obj.index);
            break;

        case 'assignments':
            $('#assignments-input-title').val(obj.title);
            $('#assignments-input-description').val(obj.description);
            $('#assignments-input-subdate').val(obj.submitDate);
            $('#assignments-input-index').val(obj.index);
            break;
    }

    $(`#${category}-form-heading`).text('Edit');
    goToPage(`${category}-form`);
}

function deleteObject(category, index) {
    alert("The delete button is a work in progress.");
    return;

    if (!confirm("Delete object?")) return;

    let list = eval(`Data.${category}`);
    let obj = list[index];

    obj.delete();
}

function submitForm(event, category) {
    event.preventDefault();

    switch (category) {
        case 'courses': {
            let title = $('#courses-input-title').val();
            let stream = $('#courses-input-stream').val();
            let type = $('#courses-rbtn-parttime').is(':checked');
            let startDate = $('#courses-input-startdate').val();
            let endDate = $('#courses-input-enddate').val();
            let trainers = $('#courses-input-trainers').val();
            let assignments = $('#courses-input-assignments').val();
            let index = parseInt($('#courses-input-index').val());

            new Course(title, stream, type, startDate, endDate, trainers, assignments, index);
            getSelectOptions('students', 'course', Data.courses, false);
            break;
        }
        case 'students': {
            let firstname = $('#students-input-firstname').val();
            let lastname = $('#students-input-lastname').val();
            let birthdate = $('#students-input-birthdate').val();
            let tuitionFees = $('#students-input-fees').val();
            let course = $('#students-input-course').val();
            let assignments = $('#students-input-assignments').val();
            let index = parseInt($('#students-input-index').val());

            new Student(firstname, lastname, birthdate, tuitionFees, course, assignments, index);
            break;
        }
        case 'trainers': {
            let firstname = $('#trainers-input-firstname').val();
            let lastname = $('#trainers-input-lastname').val();
            let subject = formatTrainerSubjects($('#trainers-input-subject').val());
            let index = parseInt($('#trainers-input-index').val());

            new Trainer(firstname, lastname, subject, index);
            getSelectOptions('courses', 'trainers');
            break;
        }
        case 'assignments': {
            let title = $('#assignments-input-title').val();
            let description = $('#assignments-input-description').val();
            let submitDate = $('#assignments-input-subdate').val();
            let index = parseInt($('#assignments-input-index').val());

            new Assignment(title, description, submitDate, index);
            getSelectOptions('courses', 'assignments');
            break;
        }
    }

    updateAllTables();
    goToPage(`${category}-table`);
}

function getSelectOptions(category, target, list = null, isMultiple = true) {
    let select = $(`#${category}-input-${target}`);

    // If a custom list for options isn't defined, select the list from the Data class
    // of the corresponding category.
    if (!list) {
        list = eval(`Data.${target}`);
    }

    $(select).empty();

    if (!isMultiple) {
        $(select).append('<option value=null>(no option)</option>');
    }

    for (let item of list) {
        let option = `<option value=${item.index}>${item.getName()}</option>`;
        $(select).append(option);
    }
}

function getCourseAssignmentsList(index) {
    // To be used when the user selects a course from Student form.
    // The assignments list of the select input updates to show only,
    // the assignments that belong to the student's course.
    let course = Data.courses[index];
    let targetElem = document.getElementById('students-input-assignments');
    if (!course) return $(targetElem).empty();

    let assignments = Array.from(course.assignments).map(as => Data.assignments[as]);

    getSelectOptions('students', 'assignments', assignments);
}

function onCourseChange(actionElem) {
    return getCourseAssignmentsList(parseInt(actionElem.value));
}

function formatTrainerSubjects(input) {
    let words = input.split(/[ ,]+/);
    words = [...new Set(words)]; // removes duplicates
    words.sort();
    return words.join(', ');
}
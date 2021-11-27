class Data {
    static courses = [];
    static students = [];
    static trainers = [];
    static assignments = [];

    setIndex(category, index = null) {
        let list = eval('Data.' + category);

        if (index || index === 0) {
            list[index] = this;
            return index;
        }
        else {
            list.push(this);
            return list.length - 1;
        }
    }

    delete(category, index) {
        let list = eval('Data.' + category);

        function rearrangeIndices(list, category) {
            for (let i = 0; i < list.length; i++) {
                let oldIndex = list[i].index;
                list[i].index = i;
            }
        }

        list.splice(index, 1);
        rearrangeIndices(list, category);
        updateAllTables();
    }

    static getTableRow(table, ...cols) {
        let row = '<tr>';
        cols.map(col => row += `${col}`);
        row += '</tr>';

        $(table).append(row);
    }
}

class Course extends Data {
    static category = 'courses';

    constructor(title, stream, isPartTime, startDate, endDate,
        trainers = [], assignments = [], index = null) {
        super();

        this.title = title;
        this.stream = parseInt(stream);
        this.isPartTime = isPartTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainers = new Set(trainers.map(tr => parseInt(tr)));
        this.assignments = new Set(assignments.map(as => parseInt(as)));
        this.index = super.setIndex(Course.category, index);

        console.log(this);
    }

    delete() {
        Student.onCourseDeletion(this.index);
        super.delete(Course.category, this.index);
    }

    getName() { return `${this.title} (CB${this.stream})`; }

    getType() { return this.isPartTime ? 'Part-Time' : 'Full-Time'; }

    getTableRow() {
        Data.getTableRow($('#courses-table-body'), [
            `<th scope="row">${this.index + 1}</th>`,
            `<td>${this.title}</td>`,
            `<td>CB${this.stream}</td>`,
            `<td>${this.getType()}</td>`,
            `<td>${convertDateFormat(this.startDate)}</td>`,
            `<td>${convertDateFormat(this.endDate)}</td>`,
            `<td>${convertToUL(Data.students.filter(st => st.course === this.index).map(st => st.getName()))}</td>`,
            `<td>${convertToUL(Data.trainers.filter(tr => this.trainers.has(tr.index)).map(tr => tr.getName(true)))}</td>`,
            `<td>${convertToUL(Data.assignments.filter(as => this.assignments.has(as.index)).map(as => as.getName(true)))}</td>`,
            `<td>${convertToUL(Data.students.filter(st => st.course === this.index).map(st => st.getName(true)))}</td>`,
            `<td class="edit">${getEditButtons('courses', this.index)}</td>`
        ]);
    }

    // Updates the properties of the courses objects, when an item gets deleted.
    // (ex. remove the index of a Trainer from this.trainers, when the Trainer object gets deleted.)
    static onItemDeletion(category, index) {
        for (let course of Data.courses) {
            eval(`course.${category}.delete(index)`);
        }
    }
}

class Student extends Data {
    static category = 'students';

    constructor(firstName, lastName, birthdate, tuitionFees,
        course = null, assignments = [], index = null) {
        super();

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.tuitionFees = parseFloat(tuitionFees);
        this.course = (course || course == 0) ? parseInt(course) : null;
        this.assignments = new Set(assignments.map(as => parseInt(as)));
        this.index = super.setIndex(Student.category, index);

        console.log(this);
    }

    delete() {
        super.delete(Student.category, this.index);
    }

    getName(showAssignments = false) {
        if (showAssignments) {
            return this.getName() + ': ' + this.getAssignmentList();
        }

        return `${this.firstName} ${this.lastName}`;
    }

    getAssignmentList() {
        let list = Data.assignments.filter(as => this.assignments.has(as.index)).map(as => as.getName(true));
        if (list)
            return convertToUL(list);
    }
    
    getTableRow() {
        Data.getTableRow($('#students-table-body'), [
            `<th scope="row">${this.index + 1}</th>`,
            `<td>${this.firstName}</td>`,
            `<td>${this.lastName}</td>`,
            `<td>${convertDateFormat(this.birthdate)}</td>`,
            `<td>${this.tuitionFees}€</td>`,
            `<td>${(this.course !== null || this.course == 0) ? Data.courses[this.course].getName() : ''}</td>`,
            `<td>${this.getAssignmentList()}</td>`,
            `<td class="edit">${getEditButtons('students', this.index)}</td>`
        ]);
    }

    static onCourseDeletion(course) {
        for (let student of Data.students) {
            if (student.course === course) {
                student.course = null;
                student.assignments = new Set();
            }
        }
    }
}

class Trainer extends Data {
    static category = 'trainers';

    constructor(firstName, lastName, subject, index = null) {
        super();

        this.firstName = firstName;
        this.lastName = lastName;
        this.subject = subject;
        this.index = super.setIndex(Trainer.category, index);

        console.log(this);
    }

    delete() {
        super.delete(Trainer.category, this.index);
        Course.onItemDeletion(Trainer.category, this.index);
    }

    getName() { return `${this.firstName} ${this.lastName}`; }

    getTableRow() {
        Data.getTableRow($('#trainers-table-body'), [
            `<th scope="row">${this.index + 1}</th>`,
            `<td>${this.firstName}</td>`,
            `<td>${this.lastName}</td>`,
            `<td>${this.subject}</td>`,
            `<td class="edit">${getEditButtons('trainers', this.index)}</td>`
        ]);
    }
}

class Assignment extends Data {
    static category = 'assignments';

    constructor(title, description, submitDate, index = null) {
        super();

        this.title = title;
        this.description = description;
        this.submitDate = submitDate;
        this.index = super.setIndex(Assignment.category, index);

        console.log(this);
    }

    delete() {
        super.delete(Assignment.category, this.index);
        Course.onItemDeletion(Assignment.category, this.index);
    }

    getName() { return `${this.title}`; }

    getTableRow() {
        Data.getTableRow($('#assignments-table-body'), [
            `<th scope="row">${this.index + 1}</th>`,
            `<td>${this.title}</td>`,
            `<td colspan="2">${this.description}</td>`,
            `<td>${convertDateFormat(this.submitDate)}</td>`,
            `<td class="edit">${getEditButtons('assignments', this.index)}</td>`
        ]);
    }
}
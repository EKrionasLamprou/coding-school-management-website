function initiateSelectOptions() {
    getSelectOptions('courses', 'trainers');
    getSelectOptions('courses', 'assignments');
    getSelectOptions('students', 'course', Data.courses, false);
}

function main() {
    hideAll();
    goToPage('home');
    updateAllTables();
    showEdit(false);
    initiateSelectOptions();
}
main();
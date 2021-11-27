function updateTable(category) {
    let list = eval(`Data.${category}`);
    $(`#${category}-table-body`).empty();
    list.map(item => item.getTableRow());
}

function updateAllTables() {
    for (category of ['courses', 'students', 'trainers', 'assignments']) {
        updateTable(category);
    }
}

function convertDateFormat(date) {
    let components = date.split('-');
    components.reverse();
    return components.join('/');
}

function convertToUL(list) {
    let ul = '<ul>';
    list.map(item => ul += `<li>${item}</li>`);
    ul += '</ul>';

    return ul;
}

function getEditButtons(category, index) {
    return `
            <button class="edit btn btn-dark" onclick="openEditForm('${category}', ${index});">📝</button>
            <button class="edit btn btn-dark" onclick="deleteObject('${category}', ${index})">✖</button>
           `;
}
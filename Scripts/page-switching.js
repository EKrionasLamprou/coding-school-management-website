function goToPage(page) {
    $('.page').hide(300);
    $(`#${page}-page`).show(250);
    showBrand(page !== 'home');
}

function hideAll() {
    $('.page').hide();
}

function showBrand(show) {
    show ? $('#brand').show() : $('#brand').hide(200);
}

function showEdit(show) {
    show ? $('.edit').show(100) : $('.edit').hide(100);
}

function toggleEdit(editBtn) {
    toggle = editBtn.checked;
    showEdit(toggle);
}
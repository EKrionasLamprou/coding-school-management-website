function populateCourses() {
    new Course('GDScript', 24, true, '2021-10-20', '2021-04-20', [0], [0, 1]);
    new Course('C#', 25, true, '2021-10-25', '2021-04-25', [2], [3]);
    new Course('C#', 26, false, '2021-10-25', '2021-02-10', [2], [4]);
    new Course('Java', 27, true, '2021-10-25', '2021-04-25', [3], [3]);
    new Course('Python', 28, true, '2021-10-25', '2021-04-25', [7], [3, 9]);
    new Course('Javascript', 29, false, '2022-01-25', '2021-04-25', [4], [2, 6, 8]);
    new Course('C++', 30, true, '2022-02-03', '2022-08-03', [1, 2], [7]);
    new Course('SQL', 31, false, '2022-03-01', '2022-06-01', [6]);
}

function populateStudents() {
    new Student('Maria', 'Zafeiri', '1995-10-02', 2250, 0, [1]);
    new Student('Alekos', 'Nikitou', '1990-08-24', 2500, 0);
    new Student('Anastasia', 'Fontana', '1984-01-25', 2500, 0, [0, 1]);
    new Student('Nikolaos', 'Rigos', '1989-12-05', 2250, 0, [1]);
    new Student('Paris', 'Papadopoulos', '1993-09-02', 2000, 1, [3]);
    new Student('Ismini', 'Papadopoulou', '1993-09-02', 2000, 1, [3]);
    new Student('Alexandros', 'Valsamos', '1989-11-25', 2250, 1);
    new Student('Kostas', 'Peroukas', '1978-04-13', 2500, 2);
    new Student('Kirki', 'Vasiliou', '1990-05-11', 2250, 2, [4]);
    new Student('Maria', 'Argirou', '1994-01-25', 0, 2, [4]);
    new Student('Kuriakos', 'Alexiou', '1985-05-16', 2500, 3, [3]);
    new Student('Antonios', 'Psaras', '1987-06-03', 2500, 3);
    new Student('Aliki', 'Nikolaou', '1990-04-27', 2250, 3);
    new Student('Eleni', 'Kirkou', '1989-11-22', 2250, 4, [3]);
    new Student('Kostas', 'Kremmudas', '1999-07-14', 2250, 4, [9]);
    new Student('Nikolas', 'Maras', '1990-02-25', 2500, 4, [3, 9]);
    new Student('Xarilaos', 'Paleologos', '1994-04-15', 2500, 4);
    new Student('Iosif', 'Ntanas', '1991-02-07', 2500, 5, [2]);
    new Student('Mohamed', 'Jahal', '1990-05-12', 2500, 5, [6]);
    new Student('Konstantina', 'Kara', '1985-01-22', 2250, 5, [8]);
    new Student('Spuridon', 'Louis', '1989-05-26', 2500, 6, [7]);
    new Student('Giannis', 'Asimakis', '1993-10-10', 2500, 6, [7]);
    new Student('Ioanna', 'Tousi', '1986-04-21', 2250, 6);
}

function populateTrainers() {
    new Trainer('Juan', 'Garcia', 'Godot Game Engine');
    new Trainer('Vasileios', 'Foulidis', 'C, C++');
    new Trainer('Konstantinos', 'Amantis', 'C++, C#');
    new Trainer('Mario', 'Ricci', 'Java');
    new Trainer('Kyriaki', 'Poulimeni', 'HTML, CSS, Javascript');
    new Trainer('Antonios', 'Felekis', 'PHP');
    new Trainer('Maria', 'Egglezou', 'Databases');
    new Trainer('Anastasios', 'Kouvas', 'Python');
}

function populateAssignments() {
    new Assignment('2D Game', 'Make a small top-down 2D game.', '2021-12-26');
    new Assignment('3D Game', 'Make a small first-person 3D game.', '2022-02-15');
    new Assignment('Private School', 'Make a website for private school management.', '2022-02-20');
    new Assignment('Private School', 'Make a program for private school data management.', '2022-02-20');
    new Assignment('Private School', 'Make a program for private school data management.', '2022-12-05');
    new Assignment('Minecraft Mod', 'Make a mod for Minecraft.', '2022-03-09');
    new Assignment('Plane Tickets', 'Make a website for purchasing plane tickets.', '2022-04-12');
    new Assignment('Exercise on pointers', '', '2022-05-20');
    new Assignment('Theming', 'Develop a website based on a design.', '2022-05-20');
    new Assignment('Machine Learning', 'Make a program that learns from a given data and performs calculations based on it.', '2022-06-05');
}

populateCourses();
populateStudents();
populateTrainers();
populateAssignments();
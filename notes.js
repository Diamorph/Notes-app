const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    console.log(chalk.green.bold('Adding a new note'));
    const notes = loadNotes();
    const duplicateNotes = notes.findIndex(note => note.title === title);

    if (duplicateNotes === -1) {
        console.log(chalk.green.inverse('Successfully add note'));
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    } else {
        console.log(chalk.red.inverse('Duplicate note'));
    }
};

const removeNote = (title) => {
    console.log(chalk.red.bold('Remove note'));
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    if (notes.length > notesToKeep.length) { // no note find
        console.log(chalk.green.inverse('Successfully remove note'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
};

const listNotes = () => {
    console.log(chalk.blue.bold.inverse('List of Notes'));
    const notes = loadNotes();
    if (notes.length) {
        notes.forEach(note => console.log(chalk.blue(note.title)));
    } else {
        console.log(chalk.red.inverse('Note list is empty'));
    }
};

const readNote = (title) => {
    console.log(chalk.yellow.inverse('Read a note', title));
    const note = loadNotes().find(note => note.title === title);
    if (note) {
        console.log(chalk.yellow.bold('Title: ', note.title));
        console.log(chalk.yellow.bold('Body: ', note.body));
    } else {
        console.log(chalk.red.inverse(`Can\'t found a note with title "${title}"`));
    }
};

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

module.exports = {
    addNote: addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNote: readNote
};

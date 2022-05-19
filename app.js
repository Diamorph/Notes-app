const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// add, remove, read, list
yargs.version('1.1.0');
// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Create a new Note',
    builder: {
        title: {
            describe: 'Note title', // set description
            demandOption: true, // make it required, default=false
            type: 'string' // set type
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});
// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});
// Create List Command
yargs.command({
    command: 'list',
    describe: 'List of Notes',
    handler() {
        notes.listNotes();
    }
});
// Create Read Command
yargs.command({
    command: 'read',
    describe: 'Read a Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
});

yargs.parse();
// console.log(yargs.argv);


/** To start the script type in the terminal: node start.js*/ 

const nodemon = require ( 'nodemon');

nodemon({ script: './bin/www' })
  .on('start', console.clear)
  .on('restart', console.clear)
  .on('quit', () => {
    console.log('You exit the application');
    process.exit();
  });


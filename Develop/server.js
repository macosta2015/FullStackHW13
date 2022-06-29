const express = require('express');
const routes = require('./routes');

//import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });


// turn on connection to db and server USING sequelize
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


const init = async () => {
  try {
    await sequelize.sync({force:false});
    console.log('Sucessful connection to the database');

    app.listen(PORT, () => console.log('Express web server now listening'));
  } catch (err) {
    console.log(err);
  }
}

init();
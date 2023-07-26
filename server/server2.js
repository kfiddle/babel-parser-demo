import getPathArray from "../utils/fileNameArray.js";
import endPoints from "../utils/findServerEndpoints.js";

const code = `


const path = require('path');

const express = require('express');

const harmodevsRoutes = require('./routes/harmodevsRoutes');
const coolStuffRoutes = require('./routes/coolStuffRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/harmodevs', harmodevsRoutes);
app.use('/cool_stuff', coolStuffRoutes);

app.use('/harmodevs/name', (req, res, next) => { 
    res.locals.devs = ['eric', 'hamza', 'kj','sebastian', 'tim']
    return res.json({ devs: res.locals.devs})
})
app.use('/users', () => console.log('middleware will be here'))

app.use((req, res) => {
  console.log('catch-all hit');
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  // define Default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});

module.exports = app;
`;


console.log(endPoints(code));

// const endpointsObj = endPoints(code);
// for (let key in endpointsObj) {
//   endpointsObj[key] = getPathArray(endpointsObj[key]);
// }
// console.log(getPathArray(endpointsObj))

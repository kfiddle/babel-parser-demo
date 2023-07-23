import endPoints from "../utils/findServerEndpoints.js";

// get '/devs' from the app.use call
// store devRoutes based on '/devs'
// look back. Is there an object with { devRoutes: './routes/devRoutes.js' } somewhere?


const code = `
const devRoutes = require('./routes/devRoutes.js');
const jobRoutes = require('./routes/jobRoutes.js');
app.use('/devs', devRoutes);
app.use('/job', jobsRoutes);
`
console.log(endPoints(code))
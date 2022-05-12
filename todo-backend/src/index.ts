import 'dotenv/config'
import { v4 as uuidv4} from 'uuid';
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(cors())
app.use(bodyParser.json(), urlencodedParser);

const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
app.use('/api', todoRoutes);
app.use('/', authRoutes);


const dbURI = process.env.MONGO_URI || "mongodb://mongodb/todo"

mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(res => {
    app.listen(port, () => {
        console.log(`Todo App server started on port ${port}`)
    });
})
.catch(err => {
    console.log(err)
});
// app.listen(port, () => {
//     console.log(`Todo App DEV SERVER started on port ${port}`)
// })

import 'dotenv/config'
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const port = 80;
const urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(cors());
app.use(bodyParser.json(), urlencodedParser);
app.use(mongoSanitize({
        onSanitize: ({req, key}) => {
            console.warn(`This request[${key}] is sanitized`, req);
        }
    }),
);

const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

app.use('/api', todoRoutes);
app.use('/api', authRoutes);


const dbURI: string = process.env.TODO_MONGO_URI

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

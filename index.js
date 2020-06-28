const express = require('express');
const exphbs = require('express-handlebars');

const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const coursesRouter = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/courses', coursesRouter);

app.use(express.static('public'));

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

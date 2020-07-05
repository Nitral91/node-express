const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const coursesRouter = require('./routes/courses');
const cartRouter = require('./routes/cart');

const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5f02249ee7d5802cd89783a7');
        req.user = user;
        next() 
    } catch(e) {
        console.log(e);
    }
});

app.use(express.urlencoded({extended: true}))

app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/courses', coursesRouter);
app.use('/card', cartRouter);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.port || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://admin:MzH43BH1oOjy8nWF@cluster0-pizij.mongodb.net/shop';

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        const candidate = await User.findOne();

        if(!candidate) {
            const user = new User({
                email: 'admin@gmail.com',
                name: 'Admin',
                cart: {item: []}
            });
            await user.save();
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(e) {
        console.log(e)
    }
}

start();
const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add page',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const course = new Course(req.body.Name, req.body.Price, req.body.Image);
    await course.save();
    res.redirect('/courses');
});

module.exports = router;
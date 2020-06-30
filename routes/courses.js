const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Course.find().lean();
    console.log(courses);
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        return res.redirect('/');
    }
    const course = await Course.findById(req.params.id).lean();
    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    });

});

router.post('/edit', async (req, res) => {
    await Course.findByIdAndUpdate(req.body.id, req.body).lean();
    res.redirect('/courses');
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).lean();
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
});

module.exports = router;
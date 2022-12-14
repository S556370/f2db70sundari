var express = require('express');
var router = express.Router();

var university_controller = require('../controllers/universities');
/* GET home page. */
// redirect to login.
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

// router.get('/', university_controller.university_view_all_Page);
// router.get('/detail', university_controller.university_view_one_Page);
// router.get('/create', university_controller.university_create_Page);
// router.get('/update', university_controller.university_update_Page);
// router.get('/delete', university_controller.university_delete_Page);

router.get('/', secured , university_controller.university_view_all_Page);
router.get('/detail', secured, university_controller.university_view_one_Page);
router.get('/create', secured, university_controller.university_create_Page);
router.get('/update', secured, university_controller.university_update_Page);
router.get('/delete', secured, university_controller.university_delete_Page);

module.exports = router;
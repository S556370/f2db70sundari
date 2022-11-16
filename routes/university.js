var express = require('express');
var router = express.Router();

var university_controller = require('../controllers/universities');
/* GET home page. */

router.get('/', university_controller.university_view_all_Page);
router.get('/detail', university_controller.university_view_one_Page);
router.get('/create', university_controller.university_create_Page);
router.get('/update', university_controller.university_update_Page);
router.get('/delete', university_controller.university_delete_Page);


module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('university', { title: 'Search Results for University Class' });
});

module.exports = router;
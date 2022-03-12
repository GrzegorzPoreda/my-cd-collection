var express = require('express');
var router = express.Router();


router.get('/', (req,res) => {
    res.render('contact', {email: 'mycdcollection@gmail.com'});
});

module.exports = router;

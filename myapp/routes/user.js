var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  if(user){
    res.render('user',{user:user});
  }else{
    res.redirect('/');
  }
  
});

module.exports = router;

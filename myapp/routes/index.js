var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/main', function(req, res, next) {
  // res.end('111111');
  //获取用户输入的内容
  // console.log(req.body);
  let val = req.body;
  let userName = val.userName;
  let userPwd = val.userPwd;
  let userType = val.userType;
  //查询数据库
  db.query('select * from user where userName = ? and userPwd = ? and userType = ?',[userName,userPwd,userType],function(err,userdata){
    if(err){
      throw err;
    }else if(userdata.length > 0){
      console.log(userdata);
      // res.render('main');
      if(userdata[0].userType == 'student'){
        db.query('SELECT * FROM student WHERE userid = ?',[userdata[0].userid],function(err,studentdata){
          if(err){
            throw err;
          }else {
            console.log(studentdata);
            req.session.user = {
              userid: userdata[0].userid,
              userName: userdata[0].userName,
              userType: userdata[0].userType,
              personName: studentdata[0].name,
              personNo: studentdata[0].sno,
              personGender: studentdata[0].gender
            };
            res.render('main');
          }
        })
      }else if(userdata[0].userType == 'teacher'){
        db.query('SELECT * FROM teacher WHERE userid = ?',[userdata[0].userid],function(err,teacherdata){
          if(err){
            throw err;
          }else {
            // console.log(studentdata);
            req.session.user = {
              userid: userdata[0].userid,
              userName: userdata[0].userName,
              userType: userdata[0].userType,
              personName: teacherdata[0].name,
              personNo: teacherdata[0].tno,
              personGender: teacherdata[0].gender
            };
            res.render('main');
          }
        })
      }else {
        db.query('SELECT * FROM admin WHERE userid = ?',[userdata[0].userid],function(err,admindata){
          if(err){
            throw err;
          }else {
            // console.log(studentdata);
            req.session.user = {
              userid: userdata[0].userid,
              userName: userdata[0].userName,
              userType: userdata[0].userType,
              personName: admindata[0].name,
              personNo: admindata[0].ano,
              personGender: admindata[0].gender
            };
            res.render('main');
          }
        })
      }
    }else{
      res.render('tip',{message:'用户名或密码或用户类型有误'})
      // res.write('<head><meta charset="utf-8"/head>');
      // res.end('用户名或密码或用户类型有误');
      
    }
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
let db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageNum = req.query.page;
  const user = req.session.user;
  if(user){
    if(user.userType=='student'){
      db.query('SELECT * FROM student_course_view where sname=?',[user.personName],function(err,data){
        let pager = {};
        //当前第几页，默认1
        pager.pageCurrent = pageNum || 1;
        //总的记录数
        pager.maxNum = data.length;
        //每页显示多少条记录
        pager.pageSize = 5;
        //一个多次页
        pager.pageCount = parseInt(Math.ceil(pager.maxNum/pager.pageSize));
        //修改传递的数量
        let dataList = data.slice((pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize + pager.pageSize);
        if(err){
          throw err;
        }else{
          db.query('SELECT name FROM course',function(err,courseData){
            if(err){
              throw err;
            }else{
              db.query('SELECT name FROM teacher',function(err,teacherData){
                if(err){
                  throw err;
                }else{
                  res.render('studentCourse',{studentCourse:dataList,Course:courseData,pager,user,teachers:teacherData});
                }
              })
            }
          })
        }
      })
    }else if(user.userType=='teacher'){
      db.query('SELECT * FROM student_course_view where tname=?',[user.personName],function(err,data){
        let pager = {};
        //当前第几页，默认1
        pager.pageCurrent = pageNum || 1;
        //总的记录数
        pager.maxNum = data.length;
        //每页显示多少条记录
        pager.pageSize = 5;
        //一个多次页
        pager.pageCount = parseInt(Math.ceil(pager.maxNum/pager.pageSize));
        //修改传递的数量
        let dataList = data.slice((pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize + pager.pageSize);
        if(err){
          throw err;
        }else{
          db.query('SELECT c.name FROM course c JOIN teacher_course tc ON c.cno = tc.cno WHERE tc.tno = ?',[user.personNo],function(err,courseData){
            if(err){
              throw err;
            }else{
              db.query('SELECT name FROM teacher',function(err,teacherData){
                if(err){
                  throw err;
                }else{
                  res.render('studentCourse',{studentCourse:dataList,Course:courseData,pager,user,teachers:teacherData});
                }
              })
            }
          })
        }
      })
    }else {
      db.query('SELECT * FROM student_course_view',[user.personName],function(err,data){
        let pager = {};
        //当前第几页，默认1
        pager.pageCurrent = pageNum || 1;
        //总的记录数
        pager.maxNum = data.length;
        //每页显示多少条记录
        pager.pageSize = 5;
        //一个多次页
        pager.pageCount = parseInt(Math.ceil(pager.maxNum/pager.pageSize));
        //修改传递的数量
        let dataList = data.slice((pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize + pager.pageSize);
        if(err){
          throw err;
        }else{
          db.query('SELECT name FROM course',function(err,courseData){
            if(err){
              throw err;
            }else{
              db.query('SELECT name FROM teacher',function(err,teacherData){
                if(err){
                  throw err;
                }else{
                  res.render('studentCourse',{studentCourse:dataList,Course:courseData,pager,user,teachers:teacherData});
                }
              })
              
            }
          })
        }
      })
    }
    
  }else{
    res.redirect('/');
  }
  

});

module.exports = router;

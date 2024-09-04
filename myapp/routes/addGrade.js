var express = require('express');
var router = express.Router();
let db = require('../sql.js');
let multiparty = require('multiparty');

/* GET home page. */
router.post('/', function(req, res, next) {
  const user = req.session.user;
  let form = new multiparty.Form();
  let currentDate = new Date();
  form.parse(req,function(err,fields,files){
    console.log(currentDate);
    // console.log(fields);
    // console.log(user);
    db.query('SELECT enrollTime FROM course where name=?',[fields.courseName[0]],function(err,courseTime){
      if(err){
        throw err;
      }
      if(currentDate <= courseTime[0].enrollTime){
        // console.log(courseTime[0].enrollTime);
        // console.log('可录用');
        db.query('SELECT sc.id FROM student s JOIN student_course sc ON s.sno = sc.sno WHERE sc.tcid = (SELECT tcid FROM teacher_course WHERE cno = (SELECT cno FROM course WHERE name=?) AND tno=?) AND sc.grade IS NULL',[fields.courseName[0],user.personNo],function(err,scids){
          if(err){
            throw err;
          }else{
            // console.log(scids);
            scids.forEach(scid=>{
              // console.log(scid);
              db.query('update student_course set grade=? where id=?',[parseInt(fields.grade[0]),scid.id],function(err){
                if(err){
                  throw err;
                }
              })
            })
            //更新渲染页面
            db.query('SELECT * FROM student_course_view where tname=?',[user.personName],function(err,data){
              if(err){
                throw err;
              }else{
                db.query('SELECT c.name FROM course c JOIN teacher_course tc ON c.cno = tc.cno WHERE tc.tno = ?',[user.personNo],function(err,Course){
                 if(err){
                  throw(err);
                 }else{
                  let pager = {};
                  //当前第几页，默认1
                  pager.pageCurrent =  1;
                  //总的记录数
                  pager.maxNum = data.length;
                  //每页显示多少条记录
                  pager.pageSize = 5;
                  //一个多次页
                  pager.pageCount = parseInt(Math.ceil(pager.maxNum/pager.pageSize));
                  //修改传递的数量
                  let dataList = data.slice((pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize + pager.pageSize);
                  db.query('SELECT name FROM teacher',function(err,teacherData){
                    if(err){
                      throw err;
                    }else{
                      res.render('studentCourse',{studentCourse:dataList,Course,pager,user,teachers:teacherData});
                    }
                  })
                 }
                })
              }
            })
          }
        })
      }else{
        // console.log('不可录用');
        res.render('tip',{message:'超过录用时间'});
      }
    })
  })
});

module.exports = router;

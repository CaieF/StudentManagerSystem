var express = require('express');
var router = express.Router();
let db = require('../sql.js');

router.get('/',function(req, res, next){
  let pageNum = req.query.page;
  const user = req.session.user;
  let tcid = req.query.tcid;
  db.query(`delete from teacher_course where tcid=${tcid}`,function(err,data){
    if(err){
      throw err;
    }else{
      if(user){
        db.query('SELECT * FROM teacher_course_view',function(err,data){
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
            db.query('SELECT name FROM course',function(err,Course){
              if(err){
                throw err;
              }else{
                db.query('SELECT name FROM teacher',function(err,teacherData){
                  if(err){
                    throw err;
                  }else{
                    res.render('teacherCourse',{teacherCourse:dataList,Course,pager,user,teachers:teacherData});
                  }
                })
              }
            })
          }
        })
      }else{
        res.redirect('/');
      }
    }
  })
})

module.exports = router;
var express = require('express');
var router = express.Router();
let db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageNum = req.query.page;
  const user = req.session.user;
  if(user){
    if(user.userType=='student'){
      db.query('SELECT * FROM student_grade_view where sno=?',[user.personNo],function(err,data){
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
          db.query('SELECT DISTINCT s.class FROM student s ORDER BY s.class',function(err,Class){
            if(err){
              throw err;
            }else{
              res.render('studentGrade',{studentGrade:dataList,pager,Class,user});
            }
          })
        }
      })
    }else{
      db.query('SELECT * FROM student_grade_view',function(err,data){
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
          db.query('SELECT DISTINCT s.class FROM student s ORDER BY s.class',function(err,Class){
            if(err){
              throw err;
            }else{
              res.render('studentGrade',{studentGrade:dataList,pager,Class,user});
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

var express = require('express');
var router = express.Router();
let db = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let pageNum = req.query.page;
  const user = req.session.user;
  let cno = req.query.cno;
  db.query(`delete from course where cno=${cno}`,function(err,data){
    if(err){
      throw err;
    }else{
      db.query('SELECT * FROM course',function(err,data){
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
          db.query('select name from course',function(err,serachData){
            if(err){
              throw err;
            }else{
              res.render('course',{course:dataList,serachData,pager,user});
            }
          })
        }
      })
    }
  })
});

module.exports = router;
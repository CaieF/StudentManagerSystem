var express = require('express');
var router = express.Router();
let db = require('../sql.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  let pageNum = req.query.page;
  //拿到的搜索value数据
  let like = req.query.likeStudent || req.query.selectVal;
    db.query(`SELECT * FROM student WHERE  class LIKE '%${like}%' OR name LIKE '%${like}%' OR sno LIKE '%${like}%'`,function(err,data){
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
            res.render('student',{student:dataList,pager,Class,user});
          }
        })
      }
    })
  
});

module.exports = router;
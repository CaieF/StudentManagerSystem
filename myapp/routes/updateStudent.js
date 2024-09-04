var express = require('express');
var router = express.Router();
let db = require('../sql.js');
let multiparty = require('multiparty');

/* GET home page. */
router.post('/', function(req, res, next) {
  let pageNum = req.query.page;
  const user = req.session.user;
  let form = new multiparty.Form();
  form.parse(req,function(err,fields,files){
    let upSno = parseInt(fields.upSno[0]);
    let newSno = parseInt(fields.sno[0]);
    // console.log(fields);
    // console.log(upSno);
    db.query(`update student set sno=?,name=?,class=?,gender=? where sno=${upSno}`,[newSno,fields.name[0],fields.class[0],fields.gender[0]],function(err,data){
      if(err){
        // res.render('tip',{message:err});
        throw err;
      }else{
        db.query('SELECT * FROM student',function(err,data){
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
      }
    })
  })
});

module.exports = router;

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
    console.log(fields);
    db.query('SELECT COUNT(*) as count FROM teacher WHERE tno=?',[parseInt(fields.tno[0])],function(err,existingData){
      if(err){
        throw err;
      }
      if(existingData[0].count == 0){
        db.query('insert into teacher (tno,name,gender) values(?,?,?)',[parseInt(fields.tno[0]),fields.name[0],fields.gender[0]],function(err,data){
          if(err){
            // res.render('tip',{message:err});
            throw err;
          }else{
            db.query('SELECT * FROM teacher',function(err,data){
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
                db.query('select name from teacher',function(err,serachData){
                  if(err){
                    throw err;
                  }else{
                    res.render('teacher',{teacher:dataList,serachData,pager,user});
                  }
                })
              }
            })
          }
        })
      }else{
        res.render('tip',{message:'教师号重复'});
      }
    })
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
let db = require('../sql.js');
let multiparty = require('multiparty');

/* GET home page. */
router.post('/', function(req, res, next) {
  
  const user = req.session.user;
  let form = new multiparty.Form();
  form.parse(req,function(err,fields,files){
    console.log(fields.courseName[0]);
    console.log(fields.courseTeacher[0]);
    
    db.query('SELECT tno FROM teacher WHERE name = ?',[fields.courseTeacher[0]],function(err,teacherData){
      if(err){
        throw err;
      }
      if(teacherData.length > 0){
        db.query('SELECT cno FROM course WHERE name = ?',[fields.courseName[0]],function(err,courseData){
          if(err){
            throw err;
          }

          if(courseData.length > 0){
            db.query('SELECT COUNT(*) as count FROM teacher_course WHERE tno = ? AND cno = ?',[teacherData[0].tno,courseData[0].cno],function(err,existingData){
              if(err){
                throw err;
              }
              if(existingData[0].count == 0){
                //插入
                db.query('Insert into teacher_course VALUES(?,?,?,?)',[0,teacherData[0].tno,courseData[0].cno,0],function(err,data){
                if(err){
                  throw err;
                }else{
                  db.query('SELECT * FROM teacher_course_view',function(err,data){
                    if(err){
                      throw err;
                    }else{
                      db.query('SELECT name FROM course',function(err,Course){
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
                              res.render('teacherCourse',{teacherCourse:dataList,Course,pager,user,teachers:teacherData});
                            }
                          })
                        }
                      })
                    }
                  })
              }
                })
              }else{
                res.render('tip',{message:'该排课记录重复'});
              }
            })
          }else{
            console.log('课程数据异常');
            res.render('tip',{message:'课程数据异常'});
          }
        })
      }else{
        console.log('教师数据异常');
        res.render('tip',{message:'教师数据异常'});
      }
    })
  })
});

module.exports = router;

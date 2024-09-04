var express = require('express');
var router = express.Router();
let db = require('../sql.js');
let multiparty = require('multiparty');




//添加数据
router.post('/', function(req, res, next) {
  const user = req.session.user;
  let form = new multiparty.Form();
  let currentDate = new Date();
  form.parse(req,function(err,fields,files){
    // console.log(fields);
    db.query('SELECT sno FROM student WHERE sno= ?', [user.personNo], function(err, studentData) {
      if (err) {
        throw err;
      }
    
      if (studentData.length > 0) {
        db.query('SELECT cno,startTime,endTime FROM course WHERE name = ?', [fields.courseName[0]], function(err, courseData) {
          if (err) {
            throw err;
          }
    
          if (courseData.length > 0 && currentDate >= courseData[0].startTime && currentDate <= courseData[0].endTime) {
            db.query('SELECT tno FROM teacher WHERE name = ?', [fields.courseTeacher[0]], function(err, teacherData) {
              if (err) {
                throw err;
              }
              if (teacherData.length > 0) {
                db.query('SELECT tcid FROM teacher_course WHERE tno = ? AND cno = ?',[teacherData[0].tno,courseData[0].cno],function(err,tcdata){
                  if(err){
                    throw err;
                  }else{
                    if(tcdata.length > 0){
                      db.query('SELECT COUNT(*) as count FROM student_course WHERE sno = ? AND tcid = ?',[studentData[0].sno,tcdata[0].tcid],function(err,existingData){
                        if(err){
                          throw err;
                        }
                        if(existingData[0].count == 0){
                          db.query('Insert into student_course VALUES(?,?,?,?)', [0, studentData[0].sno, null,tcdata[0].tcid], function(err, data) {
                            if (err) {
                              throw err;
                            } else {
                              //更新
                              db.query('SELECT * FROM student_course_view where sname=?',[user.personName],function(err,data){
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
                                        res.render('studentCourse',{studentCourse:dataList,Course,pager,user,teachers:teacherData});
                                      }
                                    })
                                   }
                                  })
                                }
                              })
                            }
                          });
                        }else{
                          res.render('tip',{message:'该选课记录重复'});
                        }
                      })
                    }else{
                      res.render('tip',{message:'所选课程与教师不匹配'});
                    }
                  }
                })
                
              } else {
                // 处理 teacherData 为空的情况
                console.log('教师数据异常');
                res.render('tip',{message:'教师数据异常'});
              }
            });
          } else {
            // 处理 courseData 为空的情况
            res.render('tip',{message:'不在选课时间范围内'})
            console.log('课程数据异常');
          }
        });
      } else {
        // 处理 studentData 为空的情况
        res.render('tip',{message:'学生数据异常'});
        console.log('学生数据异常');
      }
    });
  });
});

module.exports = router;

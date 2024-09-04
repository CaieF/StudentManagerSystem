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
    console.log(fields);
    let updateid = fields.upid[0];
    // let updateGrade 
    if(user.userType == 'student'){
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
                    db.query('SELECT COUNT(*) as count FROM student_course WHERE sno = ? AND tcid = ?',[user.personNo,tcdata[0].tcid],function(err,existingData){
                      if(err){
                        throw err;
                      }
                      if(existingData[0].count == 0){
                        db.query(`update student_course set tcid=? where id=${updateid}`, [tcdata[0].tcid], function(err, data) {
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
            }
          });
        } else {
          // 处理 courseData 为空的情况
          console.log('课程数据异常');
          res.render('tip',{message:'不在选课时间范围内'});
        }
      });
    }else if(user.userType == 'teacher'){
      if(fields.grade[0] != null){
        db.query('SELECT enrollTime FROM course WHERE cno =(SELECT cno FROM teacher_course WHERE tcid = (SELECT tcid FROM student_course WHERE id = ?))',[updateid],function(err,courseTime){
          if(err){
            throw err;
          }
          if(currentDate <= courseTime[0].enrollTime){
            db.query(`update student_course set grade=? where id=${updateid}`,[parseInt(fields.grade[0])],function(err,data){
              if(err){
                throw err;
              }else{
                //更新
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
            res.render('tip',{message:'超过录用时间'});
          }
        })
      }else{
        res.render('tip',{message:'成绩数据异常'});
      }
    }
  });
});

module.exports = router;

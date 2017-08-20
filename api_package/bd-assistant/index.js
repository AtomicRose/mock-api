/**
 * @system              Mock-API系统
 * @fileTag             mock
 * @baseUri             /api/sys
 * @fileDescription     mock-api系统相关接口文档
 * @author              Atomer
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var fileBlock = require('../../generateMethod/fileBlock');
var generateHtml = require('../../generateMethod/generateHtml');
var achieve_sys = require('../../api_achieve/achieve_sys');


/**
 * 获取登录用户信息
 */
router.get('/api/v1/userCenter', function (req, res, next) {
  var query = req.query;
  res.json(
    {
      "code": 1000000,
      "message": "OK",
      "data": {
        "role": 2,
        "user": "baishen.fang@mingyizhudao.com",
        "userName": "\u65b9\u67cf\u8703",
        "avatar": "https:\/\/p.qlogo.cn\/bizmail\/p0Sh0ibb0MOsH9dWUSoXvP1V57TO2ZnnkK27XekJkQmZt3icESbibwMaQ\/0",
        "leading_group": 13,
        "city": [],
        "teamMemberCounts": 5,
        "unDistrictList": [
          {
            "id": 98,
            "staff_id": "SH0143",
            "name": null,
            "province_id": 460000,
            "province_name": "\u6d77\u5357",
            "city_id": 340400,
            "city_name": "\u6dee\u5357",
            "distributed_begin_at": "2017-06-27 16:55:01",
            "distributed_end_at": null,
            "created_at": "2017-06-27 16:55:01",
            "modified_at": "2017-07-05 20:57:53",
            "status": 1,
            "team_group": 13
          },
          {
            "id": 110,
            "staff_id": "SH9999",
            "name": "\u5927\u4e00",
            "province_id": 500000,
            "province_name": "\u91cd\u5e86",
            "city_id": 630100,
            "city_name": "\u897f\u5b81",
            "distributed_begin_at": "2017-06-27 21:07:29",
            "distributed_end_at": "2017-07-10 11:38:49",
            "created_at": "2017-06-27 21:07:29",
            "modified_at": "2017-07-10 11:38:49",
            "status": 1,
            "team_group": 13
          },
          {
            "id": 125,
            "staff_id": "SH0031",
            "name": "\u6b66\u4f73",
            "province_id": 320000,
            "province_name": "\u6c5f\u82cf",
            "city_id": 320800,
            "city_name": "\u6dee\u5b89",
            "distributed_begin_at": "2017-07-02 17:14:30",
            "distributed_end_at": "2017-07-09 11:27:43",
            "created_at": "2017-07-02 17:14:30",
            "modified_at": "2017-07-02 17:14:30",
            "status": 1,
            "team_group": 13
          }
        ],
        "unDistrictCount": 3,
        "pendingItemsCounts": 0,
        "staff_id": "SH0114",
        "doctorCounts": 0,
        "orderCounts": 0
      }
    }
  );
});

/**
 * 获取拜访记录列表
 */
router.get('/api/v1/visitRecords', function (req, res, next) {
  var query = req.query;
  res.json(
    {
      code: 1000000,
      message: 'OK',
      data: {
        list: [
          {
            id: 1,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 1,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 2,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 3,
            "doctor_department_name": "科室2",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 3,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 5,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 4,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 1,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 5,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 3,
            "doctor_department_name": "科室2",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 6,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 5,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 7,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 1,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 8,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 3,
            "doctor_department_name": "科室2",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 9,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 5,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 10,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 1,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 11,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 3,
            "doctor_department_name": "科室2",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          },
          {
            id: 12,
            "created_at": "2017-08-14T03:32:33.492Z",
            "doctor_attitude": 5,
            "doctor_department_name": "科室1",
            "doctor_hospital_name": "医院1",
            "doctor_id": 111,
            "doctor_medical_title": "医生专业",
            "doctor_name": "王小明",
            "doctor_user_id": 0,
            "interview_end_time": "2017-08-14T03:32:33.492Z",
            "interview_start_time": "2017-08-14T03:32:33.492Z",
            "location": "医院定位地址",
            "staff_id": "1001",
            "staff_name": "地推姓名",
            "visit_content": "拜访记录内容"
          }
        ],
        "page": parseInt(req.query.page),
        "page_size": 10,
        "size": 20
      }
    }
  );
});

router.get('/api/v1/visitDate', function (req, res, next) {
  var query = req.query;
  res.json({
    "code": 1000000,
    "data": {
      "list": ['2017-08-10T02:50:10.093Z', '2017-08-06T02:50:10.093Z']
    },
    "message": "ok"
  });
});

router.get('/api/v1/:id/visitRecord', function (req, res, next) {
  res.json({
    "code": 1000000,
    "data": {
      id: req.params.id,
      "created_at": "2017-08-15T02:47:14.944Z",
      "doctor_attitude": 5,
      "doctor_department_name": "string",
      "doctor_hospital_name": "string",
      "doctor_id": 0,
      "doctor_medical_title": "string",
      "doctor_name": "string",
      "doctor_user_id": 0,
      "interview_end_time": "2017-08-15T02:47:14.944Z",
      "interview_start_time": "2017-08-15T02:47:14.944Z",
      "location": "string",
      "staff_id": "string",
      "staff_name": "string",
      "visit_content": "string"
    },
    "message": "OK"
  });
})


module.exports = router;

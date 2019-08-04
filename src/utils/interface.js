const v = '/v1'
const api = {
    public:{
        dictionary:"/api/dictionary",
        coachDetail:"/api/schooladministration/get-login-employee",
        bind_teant:"/api/user/bind-tenant"  // 绑定租户
    },
    // 登录相关
    login:{
        code:"/api/wxuser/login", // 获取openid
        phone:"/api/wxuser/encryption", // 解密手机号
        send:"/api/sms/send", // 获取验证码
        vlogin:"/api/user/vcode-login",
        verification:v+"/api/wxuser/verification", // 登陆
        authentication:v+"/aplus-jx-public/universal/user/authentication", //登录
        updatePwd:v+"/aplus-jx-public/universal/user/updatePwd" //设置密码
    },
    coach:{
        coachDetail:"/api/schooladministration/get-employee-by-uid"
    },
    detail:{
        queryById:v+"/aplus-jx-schooladministration/employee/queryById"
    },
    my:{
        queryByTelphone:v+"/aplus-jx-schooladministration/employee/queryByTelphone", // 校验教练
        statistic:v+"/aplus-jx-schooladministration/clue/statistic",  // 线索统计数量
        generateWxCode:v+"/aplus-jx-schooladministration/employee/generateWxCode",  // 生成二维码
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication", // 校验token
        myStudentCount:"/api/student/query-student-num-by-coachid", // 我的学员统计
        getReferralsCount:v+"/aplus-jx-schooladministration/coachReferrals/getReferralsCount", //转介绍总数
        employee:v+"/aplus-jx-schooladministration/employee/queryById" , //教练
        addOrUpdate:"/api/leavemsg/save", // 意见反馈
        position:"/api/schooladministration/get-position"
    },
    // 线索
    clue:{
        getPageList:v+"/aplus-jx-schooladministration/clue/getPageList", //线索列表
        delete:v+"/aplus-jx-schooladministration/clue/delete", // 删除线索
        queryById:v+"/aplus-jx-schooladministration/clue/queryById", // 线索详情
        finish:v+"/aplus-jx-schooladministration/clue/finish", // 完成报名
        noreport:v+"/aplus-jx-schooladministration/clue/noreport", // 移回待转化
        remark:v+"/aplus-jx-schooladministration/clue/update", //修改备注
        update:v+"/aplus-jx-schooladministration/clue/update", // 编辑
        save:v+"/aplus-jx-schooladministration/clue/save" // 新增
    },
    // 我的学员
    student:{
        myStudents:v+"/aplus-jx-study/student/api/me/myStudents",
        query:"/api/student/query-formal-student-by-coach",
        queryDetail:"/api/student/query", // 学员详情接口
        training:"/api/student/change-study-process", // 设置集训接口
        trainRecord:"/api/student/course/record/query", // 训练记录接口
        fractionRecord:"/api/student/grade/query-coach-student", // 成绩记录接口
        statistics:"/api/student/query-student-num-by-status"
    },
    // 活动
    activity:{
        getPageList:"/group/wx/employee/getPageList", // 活动列表
        myGroups:"/group/wx/employee/myGroups", // 我的活动列表
        saveEmployee:"/group/wx/employee/saveEmployee", // 提交教练信息
        detail:"/group/wx/employee/detail" // 活动详情
    },
    userInfo:{
        getOpenid:"/group/wx/employee/getOpenid" // 获取openid
    },
    // 更换用车
    car:{
        getBindCarList:"/api/schooladministration/query-employee-cars", // 车辆
        changeCar:"/api/schooladministration/change-employee-current-car" // 更换车辆
    },
    // 请假调休
    leave:{
        gerRecordByCoachIdAndTime:v+"/aplus-jx-schooladministration/leave/lieu/gerRecordByCoachIdAndTime",
        getOffTimes:v+"/aplus-jx-schooladministration/leave/lieu/getOffTimes",
        off:"/api/schooladministration/save-employee-vacation",
        getOffRecordList:"/api/schooladministration/query-employee-finished-vacation", // 查询已休假
        getRecordList:"/api/schooladministration/query-employee-not-begin-vacation", // 查询待休假
        cancleOff:"/api/schooladministration/cancel-employee-vacation",
        delete:"/api/schooladministration/del-employee-vacation",
    },
    // 课表
    timetable:{
        query:"/api/student/course/record/coach/query",
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication",
        sign:"/api/student/course/record/update",
        gerRecordByCoach:v+"/aplus-jx-study/course/booked/record/gerRecordByCoach",

    },
    // 海报
    postr:{
        all:v+"/aplus-activity/poster/all",
        list:v+"/aplus-activity/poster/template/list"
    },
    // 早晚班
    work:{
        query:"/api/education/query-course-by-page", // 早晚班
        getOvertimeInterval:v+"/aplus-jx-study/time/interval/getOvertimeInterval",
        queryAll:v+"/aplus-jx-study/course/queryAll",
        start:"/api/education/open-course-batch",
        stop:"/api/education/close-course-batch"
    },
    classType:{
        queryClass:"/api/education/query-class",
    }

}
export default api;
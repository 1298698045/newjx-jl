const v = '/v1'
const api = {
    // 登录相关
    login:{
        send:v+"/aplus-jx-public/sms/send", // 获取验证码
        verification:v+"/aplus-jx-public/sms/verification", // 验证
        authentication:v+"/aplus-jx-public/universal/user/authentication", //登录
        updatePwd:v+"/aplus-jx-public/universal/user/updatePwd" //设置密码
    },
    detail:{
        queryById:v+"/aplus-jx-schooladministration/employee/queryById"
    },
    my:{
        queryByTelphone:v+"/aplus-jx-schooladministration/employee/queryByTelphone", // 校验教练
        statistic:v+"/aplus-jx-schooladministration/clue/statistic",  // 线索统计数量
        generateWxCode:v+"/aplus-jx-schooladministration/employee/generateWxCode",  // 生成二维码
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication", // 校验token
        myStudentCount:v+"/aplus-jx-study/student/api/me/myStudentCount", // 我的学员
        getReferralsCount:v+"/aplus-jx-schooladministration/coachReferrals/getReferralsCount", //转介绍总数
        employee:v+"/aplus-jx-schooladministration/employee/queryById" , //教练
        addOrUpdate:v+"/aplus-yunying/opinion/addOrUpdate" // 意见反馈
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
        myStudents:v+"/aplus-jx-study/student/api/me/myStudents"
    },
    // 活动
    activity:{
        getPageList:v+"/aplus-jx-koiactivity/group/wx/employee/getPageList", // 活动列表
        myGroups:v+"/aplus-jx-koiactivity/group/wx/employee/myGroups", // 我的活动列表
        saveEmployee:v+"/aplus-jx-koiactivity/group/wx/employee/saveEmployee", // 提交教练信息
        detail:v+"/aplus-jx-koiactivity/group/wx/employee/detail" // 活动详情
    },
    userInfo:{
        getOpenid:v+"/aplus-jx-koiactivity/group/wx/employee/getOpenid" // 获取openid
    },
    // 更换用车
    car:{
        getBindCarList:v+"/aplus-jx-finance/car/getBindCarList", // 车辆
        changeCar:v+"/aplus-jx-schooladministration/employee/changeCar" // 更换车辆
    },
    // 请假调休
    leave:{
        gerRecordByCoachIdAndTime:v+"/aplus-jx-schooladministration/leave/lieu/gerRecordByCoachIdAndTime",
        getOffTimes:v+"/aplus-jx-schooladministration/leave/lieu/getOffTimes",
        off:v+"/aplus-jx-schooladministration/leave/lieu/off",
        getOffRecordList:v+"/aplus-jx-schooladministration/leave/lieu/getOffRecordList",
        cancleOff:v+"/aplus-jx-schooladministration/leave/lieu/cancleOff",
    },
    // 课表
    timetable:{
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication",
        sign:v+"/aplus-jx-study/course/booked/record/sign",
        gerRecordByCoach:v+"/aplus-jx-study/course/booked/record/gerRecordByCoach",

    },
    // 海报
    postr:{
        all:v+"/aplus-activity/poster/all",
        list:v+"/aplus-activity/poster/template/list"
    },
    // 早晚班
    work:{
        getOvertimeInterval:v+"/aplus-jx-study/time/interval/getOvertimeInterval",
        queryAll:v+"/aplus-jx-study/course/queryAll",
        start:v+"/aplus-jx-study/course/start",
        stop:v+"/aplus-jx-study/course/stop"
    }

}
export default api;
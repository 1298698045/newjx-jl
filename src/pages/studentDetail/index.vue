<template>
    <div class="wrap">
        <div class="header">
            <i-row i-class="row">
                <i-col span="8">
                    <p class="name">姓名：{{detail.name}}</p>
                </i-col>
                <i-col span="2">
                    <p class="sex">{{detail.sex}}</p>
                </i-col>
                <i-col span="2">
                    <p class="sex">{{detail.age}}</p>
                </i-col>
                <i-col span="12" i-class="right">
                    <p class="phone">{{detail.mobile}}</p>
                </i-col>
            </i-row>
            <i-row i-class="row">
                <i-col span="3">
                    <p class="t_sty">{{detail.licenseType}}</p>
                </i-col>
                <i-col span="11">
                    <p class="classtype"><publicData :classValue="detail.classId"></publicData></p>
                </i-col>
                <i-col span="10">
                    <p class="classtype right">建档日期:{{detail.documentedTime}}</p>
                </i-col>
            </i-row>
        </div>
        <div class="nav">
            <i-row i-class="row_wrap">
                <i-col span="8" i-class="col">
                    <p>科目二</p>
                </i-col>
                <i-col span="8"  i-class="col">
                    <p :class="detail.km2Status=='1'?'ping':detail.km2Status=='2'?'pyello':''">{{detail.km2Value}}</p>
                </i-col>
                <i-col span="8"  i-class="col" v-if="detail.km2Status!='9'">
                    <van-button custom-class="btn" v-if="detail.km2Status=='1'" @click="getTraining('km2')">设为集训中</van-button>
                    <van-button custom-class="btn btning" v-if="detail.km2Status=='2'" @click="getOping('km2')">设为进行中</van-button>                    
                    <van-button custom-class="btn active" disabled v-if="detail.km2Status=='0'">设为集训中</van-button>
                </i-col>
            </i-row>
            <i-row i-class="row_wrap">
                <i-col span="8" i-class="col">
                    <p>科目三</p>
                </i-col>
                <i-col span="8"  i-class="col">
                    <p>{{detail.km3Value}}</p>
                </i-col>
                <i-col span="8"  i-class="col" v-if="detail.km3Status!='9'">
                    <van-button custom-class="btn" v-if="detail.km3Status=='1'" @click="getTraining('km3')">设为集训中</van-button>
                    <van-button custom-class="btn btning" v-if="detail.km3Status=='2'" @click="getOping('km3')">设为进行中</van-button>  
                    <van-button custom-class="btn active" disabled v-if="detail.km3Status=='0'">设为集训中</van-button>
                </i-col>
            </i-row>
        </div>
        <div class="content">
            <van-collapse custom-class="collapse" :value="activeNames" @change="onChange">
                <van-collapse-item name="1">
                    <view slot="title" class="slot_style">训练记录 <p>科二（已学{{detail.km2Lessons}}课节）</p> <p>科三（已学{{detail.km3Lessons}}课节）</p> </view>
                    <div class="boxWrap">
                        <i-row i-class="coll_row" v-for="(item,index) in arr" :key="index">
                            <i-col span="16">
                                <div class="t_title">
                                    <p>{{item.courseDate}}</p>
                                    <p>{{item.day}}</p>
                                    <p>{{item.startTime}}~{{item.endTime}}</p>
                                </div>
                                <p>科目二集训：{{item.studentNum}}/{{item.num}}人</p>
                                <p>教练员：{{item.coachName}}</p>
                            </i-col>
                            <i-col span="8" i-class="right">
                                <p>已完成</p>
                            </i-col>
                        </i-row>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse custom-class="collapse" :value="activeNames" @change="onChange">
                <van-collapse-item name="2">
                    <view slot="title" class="slot_style">成绩记录 
                        <p>科一<span>{{fraction.km1Score!=-1?fraction.km1Score:'无'}}</span></p>
                        <p>科二<span>{{fraction.km2Score!=-1?fraction.km2Score:'无'}}</span></p>
                        <p>科三<span>{{fraction.km3Score!=-1?fraction.km3Score:'无'}}</span></p>
                        <p>科四<span>{{fraction.km4Score!=-1?fraction.km4Score:'无'}}</span></p>
                    </view>
                    <div class="list_wrap">
                        <div class="header">
                            <p>科目一</p>
                            <p>{{fraction.km1Score>=90?'通过':fraction.km1Score<90?'未通过':'缺考'}}</p>
                            <p>{{fraction.km1Grades_length}}次</p>
                        </div>
                        <div class="cont" v-for="(item,index) in fraction.km1Grades" :key="index">
                            <p>第{{index+1}}次考试</p>
                            <p>{{item.examDate}}</p>
                            <p>{{item.examScore}}分</p>
                            <p>{{item.examScore>=90?'通过':item.examScore<90?'未通过':item.examScore==-1?'缺考':''}}</p>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <div class="header">
                            <p>科目二</p>
                            <p>{{fraction.km2Score>=80?'通过':fraction.km2Score<80?'未通过':'缺考'}}</p>
                            <p>{{fraction.km2Grades_length}}次</p>
                        </div>
                        <div class="cont" v-for="(item,index) in fraction.km2Grades" :key="index">
                            <p>第{{index+1}}次考试</p>
                            <p>{{item.examDate}}</p>
                            <p>{{item.examScore}}分</p>
                            <p>{{item.examScore>=80?'通过':item.examScore<80?'未通过':item.examScore==-1?'缺考':''}}</p>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <div class="header">
                            <p>科目三</p>
                            <p>{{fraction.km3Score>=90?'通过':fraction.km3Score<90?'未通过':'缺考'}}</p>
                            <p>{{fraction.km3Grades_length}}次</p>
                        </div>
                        <div class="cont" v-for="(item,index) in fraction.km3Grades" :key="index">
                            <p>第{{index+1}}次考试</p>
                            <p>{{item.examDate}}</p>
                            <p>{{item.examScore}}分</p>
                            <p>{{item.examScore>=90?'通过':item.examScore<90?'未通过':item.examScore==-1?'缺考':''}}</p>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <div class="header">
                            <p>科目四</p>
                            <p>{{fraction.km4Score>=90?'通过':fraction.km4Score<90?'未通过':'缺考'}}</p>
                            <p>{{fraction.km4Grades_length}}次</p>
                        </div>
                        <div class="cont" v-for="(item,index) in fraction.km4Grades" :key="index">
                            <p>第{{index+1}}次考试</p>
                            <p>{{item.examDate}}</p>
                            <p>{{item.examScore}}分</p>
                            <p>{{item.examScore>=90?'通过':item.examScore<90?'未通过':item.examScore==-1?'缺考':''}}</p>
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script>
import { getDictValue } from '../../utils/public'
import { getDictData } from  '../../utils/util'
import publicData from '../../components/publicData'
import { setTimeout } from 'timers';
export default {
    components:{
        publicData
    },
    data(){
        return {
            activeNames:[''],
            list:[1,2,3],
            arr:[
                {
                    date:"2019-05-10",
                    day:"星期三",
                    time:"09:00",
                    times:"10:00"
                },
                {
                    date:"2019-05-10",
                    day:"星期三",
                    time:"09:00",
                    times:"10:00"
                },
                {
                    date:"2019-05-10",
                    day:"星期三",
                    time:"09:00",
                    times:"10:00"
                }
            ],
            id:"",
            detail:{},
            listData:"",
            params:{},
            fraction:{},
            employeeId:""

        }
    },
    onLoad(options){
        // this.listData = wx.getStorageSync('listData');
        this.employeeId = wx.getStorageSync('employeeId');
        getDictData().then( dictionary => {
            var that = this;
            that.listData = dictionary;
        } );
        console.log(options);
        this.id = options.id;
        this.getQuery();
        this.trainRecordQuery();
        this.fractionRecord();
    },
    methods:{
        getQuery(){
            this.$httpWX.post({
                url:this.$api.student.queryDetail+"/"+this.id,
                data:{

                }
            }).then(res=>{
                console.log(res);
                this.detail = res.data;
                this.detail.documentedTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(this.detail.documentedTime);
                let age = this.computeAge(this.detail.baseInfo.birthday);
                let sex = getDictValue(this.listData,'gender',this.detail.baseInfo.gender)
                let km2Value = getDictValue(this.listData,'km_status',this.detail.km2Status)
                let km3Value = getDictValue(this.listData,'km_status',this.detail.km3Status)
                console.log('111',km2Value,km3Value);
                this.detail.age = age;
                this.detail.sex = sex;
                this.detail.km2Value = km2Value;
                this.detail.km3Value = km3Value;
            })
        },
        trainRecordQuery(){
            this.$httpWX.post({
                url:this.$api.student.trainRecord,
                data:{
                    params:{
                        studentId:this.id
                    }
                }
            }).then(res=>{
                console.log(res);
                this.arr = res.data.list;
                this.arr.forEach(item=>{
                    var items = item.courseDate;
                    var bookNum = item.bookNum.split(',');
                    var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
                    var myDate = new Date(Date.parse(items));
                    this.$set(item,'day',weekDay[myDate.getDay()])
                    this.$set(item,'num',Math.max.apply(null,bookNum))
                })
                console.log('41324',this.arr);
            })
        },
        fractionRecord(){
            this.$httpWX.post({
                url:this.$api.student.fractionRecord,
                data:{
                    params:{
                        studentId:this.id
                    }
                }
            }).then(res=>{
                console.log(res);
                this.fraction = res.data;
                this.fraction.km1Grades_length = this.fraction.km1Grades.length;
                this.fraction.km2Grades_length = this.fraction.km2Grades.length;
                this.fraction.km3Grades_length = this.fraction.km3Grades.length;
                this.fraction.km4Grades_length = this.fraction.km4Grades.length;
            })
        },
        // 设为集训中
        getTraining(km){
            if(km=='km2'){
                this.params = {
                    id:this.id,
                    km2Status:"2"
                }
            }else if(km=='km3') {
                this.params = {
                    id:this.id,
                    km3Status:"2"
                }
            }
            this.$httpWX.post({
                
                url:this.$api.student.training,
                data:{
                    params:this.params
                }
            }).then(res=>{
                console.log(res);
                wx.showToast({
                    title: res.msg,
                    icon:"success",
                    duration: 2000,
                    success: () => {
                        setTimeout(()=>{
                            this.getQuery();
                        },1000)
                    }
                })
            })
        },
        // 设为进行中
        getOping(km){
            if(km=='km2'){
                this.params = {
                    id:this.id,
                    km2Status:"1"
                }
            }else if(km=='km3') {
                this.params = {
                    id:this.id,
                    km3Status:"1"
                }
            }
            this.$httpWX.post({
                
                url:this.$api.student.training,
                data:{
                    params:this.params
                }
            }).then(res=>{
                console.log(res);
                wx.showToast({
                    title: res.msg,
                    icon:"success",
                    duration: 2000,
                    success: () => {
                        setTimeout(()=>{
                            this.getQuery();
                        },1000)
                    }
                })
            })
        },
        onChange(e){
            this.activeNames = e.mp.detail;
        },
        computeAge(startDate) {
            // 获得今天的时间
            var date = new Date();
            startDate = new Date(startDate);
            var newDate = date.getTime() - startDate.getTime();
            // 向下取整  例如 10岁 20天 会计算成 10岁
            // 如果要向上取整 计算成11岁，把floor替换成 ceil
            return Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
        }
    }
}
</script>
<style lang="scss">
    .wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .header{
            width: 100%;
            background: #fff;
            .row{
                padding: 20rpx;
                font-size: 28rpx;
                .name{
                    color: #4f4f4f;
                    font-weight: bold;
                }
                .sex{
                    color: #4f4f4f;
                }
                .phone{
                    color: #fd5c1f;
                }
                .right{
                    text-align: right;
                }
                .t_sty{
                    width: 37px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-size: 22rpx;
                    color: #fb6809;
                    background: rgba(251, 100, 2, 0.1);
                    border-radius: 20px;
                }
                .classtype{
                    font-size: 24rpx;
                    color: #979797;
                }
            }
        }
        .nav{
            width: 100%;
            background: #fff;
            margin: 20rpx 0;
            font-size: 28rpx;
            .row_wrap{
                padding: 0 20rpx;
                height: 30px;
                font-size: 24rpx;
                color: #4f4f4f;
                .col{
                    line-height: 30px;
                    .ping{
                        color: #0cc40f;
                    }
                    .pyello{
                        color:#fc7720;
                    }
                    .btn{
                        width: 92px;
                        height: 24px!important;
                        line-height: 24px!important;
                        color: #fb7015;
                        border:1rpx solid #fb7015;
                        font-size: 24rpx;
                    }
                    .active{
                        color: #ccc!important;
                        border: 1rpx solid #ccc!important;
                    }
                    .btning{
                        color: #0cc40f!important;
                        border: 1rpx solid #0cc40f;
                    }
                }
            }
        }
        .content{
            .collapse{
                background: #f2f2f2!important;
                .slot_style{
                    display: flex;
                    font-size: 24rpx;
                    color: #b2b2b2;
                    p{
                        margin: 0 20rpx;
                        span{
                            color: #fb7015;
                            font-weight: bold;
                            margin-left: 5rpx;
                        }
                    }
                }
                .boxWrap{
                    font-size: 24rpx;
                    color: #4f4f4f;
                    .coll_row{
                        border-bottom: 1rpx solid #efefef;
                        padding-bottom: 10rpx;
                        .t_title{
                            display: flex;
                            p{
                                flex: 1;
                            }
                        }
                        p{
                            color: #979797;
                            padding: 5rpx 0;
                        }
                        .right{
                            text-align: right;
                            p{
                                margin-top: 20%;
                            }
                        }
                    }
                }
                .list_wrap{
                    .header{
                        display: flex;
                        font-size: 24rpx;
                        color: #4f4f4f;
                        p{
                            flex: 1;
                        }
                        p:nth-child(2){
                            text-align:center;
                            font-size: 28rpx;
                            color: #0cc40f;
                        }
                        p:nth-child(3){
                            text-align:right;
                        }
                    }
                    .cont{
                        display: flex;
                        margin: 10rpx 0;
                        p{
                            flex: 1;
                        }
                        p:nth-child(3){
                            text-align: center;
                        }
                        p:nth-child(4){
                            text-align: right;
                            color: #0cc40f;
                        }
                    }
                }
            }
        }
    }
</style>

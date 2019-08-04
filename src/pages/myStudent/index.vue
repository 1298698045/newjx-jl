<template>
    <div class="wrap">
        <div class="header">
            <van-cell-group>
                <van-field
                    :value="value"
                    placeholder="学员姓名/手机号"
                    :border="false"
                    @change="changePhone"
                    @confirm="getEnter"
                    right-icon="search"
                    right-icon-class="icon"
                    @click="getQueryStudent"
                />
            </van-cell-group>
        </div>
        <div class="content">
            <van-tabs :active="active" color="#fd5c1f" sticky @change="onChange">
                <van-tab :title="conduct+p[0]">
                    <i-row i-class="row_wrap">
                        <i-col span="14">
                            <div class="sel_left">
                                <p :class="{active:idx==index}" v-for="(item,index) in arrName" :key="index" @click="getTab(index)">{{item}}</p>
                            </div>
                        </i-col>
                        <i-col span="10">
                            <div class="sel_time">
                                <picker class="gasBox" v-model="index" :range="array" @change="bindPickerChange">
                                    <p>{{array[index]}}<i-icon type="unfold" /></p>
                                </picker>
                                <picker class="gasBox" style="margin-left:10rpx;" v-model="number" :range="arrays" @change="getPickerChange">
                                    <p>{{arrays[number]}}<i-icon type="unfold" /></p>
                                </picker>
                            </div>
                        </i-col>
                    </i-row>
                </van-tab>
                <van-tab :title="training+p[1]"></van-tab>
                <van-tab :title="completed+p[2]">
                    <i-row i-class="row_wrap">
                        <i-col span="12">
                            <div class="sel_left">
                                <p :class="{actives:num==idx}" v-for="(v,idx) in arrNames" :key="idx" @click="getTabClick(idx)">{{v}}</p>
                            </div>
                        </i-col>
                        <i-col span="12">
                            <div class="sel_time">
                                <picker class="gasBox" mode="date" :value="date" @change="pickerDate">
                                    <p>{{date}}<i-icon type="activity" /></p>
                                </picker>
                                <picker class="gasBox" style="margin-left:10rpx;" v-model="numberOver" :range="arraysOver" @change="getPickerChangeOver">
                                    <p>{{arraysOver[numberOver]}}<i-icon type="unfold" /></p>
                                </picker>
                            </div>
                        </i-col>
                    </i-row>
                </van-tab>
            </van-tabs>
        </div>
        <div class="center">
            <div class="box_cont" v-for="(item,index) in list" :key="index">
                <i-row i-class="rows">
                    <i-col span="16">
                        <div class="title">
                            <p class="t_name">{{item.name}}</p>
                            <p class="t_sex">{{item.sex}}</p>
                            <p class="t_sex">{{item.ages}}</p>
                            <p class="t_phone">{{item.mobile}}</p>
                        </div>
                        <p class="t_status">
                            <span>
                                当前状态：科目二{{item.km2statusV}}
                            </span>
                            <span style="margin-left:20rpx;">科目三{{item.km3statusV}}</span>
                        </p>
                    </i-col>
                    <i-col span="8" i-class="r_btn">
                        <van-button custom-class="btn" @click="getDetail(item)">查看详情</van-button>
                    </i-col>
                </i-row>
                <!-- <i-row i-class="rows row_bottom">
                    <i-col span="16">
                        <p>最后上课时间：{{item.endTime}}</p>
                    </i-col>
                    <i-col span="3">
                        <p>{{item.subject}}</p>
                    </i-col>
                    <i-col span="5">
                        <p>已学{{num}}课节</p>
                    </i-col>
                </i-row> -->
            </div>
        </div>
    </div>
</template>
<script>
import { getDictValue } from '../../utils/public';
import { getDictData } from '../../utils/util'
export default {
    data(){
        return {
            value:"",
            active:0,
            arrName:['全部','活跃','潜水'],
            idx:2,
            index:1,
            array:['7天','30天','60天以上'],
            number:0,
            arrays:['全部科目','科目二','科目三'],
            numberOver:0,
            arraysOver:['全部科目','科目二','科目三'],
            num:1,
            arrNames:['全部','上月','本月'],
            conduct:'进行中',
            training:"集训中",
            completed:"已完成",
            date:"",
            list:[
                {
                    name:"李学员",
                    sex:"男",
                    age:"28",
                    phone:"13866669999",
                    status:0,
                    endTime:"2019-05-01  09:00-10:00",
                    subject:"科目二",
                    num:"2"
                },
                {
                    name:"李学员",
                    sex:"男",
                    age:"28",
                    phone:"13866669999",
                    status:0,
                    endTime:"2019-05-01  09:00-10:00",
                    subject:"科目二",
                    num:"2"
                },
                {
                    name:"李学员",
                    sex:"男",
                    age:"28",
                    phone:"13866669999",
                    status:0,
                    endTime:"2019-05-01  09:00-10:00",
                    subject:"科目二",
                    num:"2"
                }
            ],
            status:1,
            pagination:{
                current:1,
                pageSize:10
            },
            listData:"",
            activityDays:"",
            statusArr:[1,2,9],
            p:[],
            employeeId:""
        }
    },
    onLoad(){
        this.employeeId = wx.getStorageSync('employeeId');
        getDictData().then( dictionary => {
            var that = this;
            that.listData = dictionary;
        } );
        // this.listData = wx.getStorageSync('listData');
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var day = d.getDate();
        this.date = y + "-" + m + "-" + day;
        this.getQuery();
        this.queryStatistics().then(res=>{
            var that = this;
            console.log(that.p);
        });
    },
    methods:{
        queryStatistics(){
            return new Promise((resolve, reject) => {
                for(var i=0; i<this.statusArr.length;i++){
                    console.log(this.statusArr[i]);
                    this.$httpWX.post({
                        url:this.$api.student.statistics,
                        data:{
                            params:{
                                coachId:this.employeeId,
                                status:this.statusArr[i]
                            }
                        }
                    }).then(res=>{
                       this.p.push(res.data); 
                       return resolve(res.data);
                    })
                }
            })
        },
        getQuery(){
            this.$httpWX.post({
                url:this.$api.student.query,
                data:{
                    params:{
                        coachId:this.employeeId,
                        status:this.status,
                        // isActivity:this.idx=='1'?0:this.idx=='2'?1:'',
                        activityDays:this.index==0?7:this.index==1?30:this.index==2?60:'',
                        kmCode:this.number==1?'km2':this.number==2?'km3':''
                    },
                    pagination:this.pagination
                }
            }).then(res=>{
                console.log(res);
                this.list = res.data.list;
                this.list.forEach(item=>{
                    var dd = getDictValue(this.listData,"gender",item.baseInfo.gender);
                    var km2 = getDictValue(this.listData,"km_status",item.km2Status);
                    var km3 = getDictValue(this.listData,"km_status",item.km3Status);
                    this.$set(item,'sex',dd);
                    this.$set(item,'ages',this.computeAge(item.baseInfo.birthday));
                    this.$set(item,'km2statusV',km2);
                    this.$set(item,'km3statusV',km3);
                })
                console.log(this.list);
            })
        },
        computeAge(startDate) {
            // 获得今天的时间
            var date = new Date();
            startDate = new Date(startDate);
            var newDate = date.getTime() - startDate.getTime();
            // 向下取整  例如 10岁 20天 会计算成 10岁
            // 如果要向上取整 计算成11岁，把floor替换成 ceil
            return Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
        },
        changePhone(e){
            this.value = e.mp.detail;
        },
        getQueryStudent(){
            const url = "/pages/queryStudent/main";
            wx.navigateTo({url:url});
        },
        getEnter(e){
            console.log(e);
        },
        onChange(e){
            console.log(e);
            this.active = e.mp.detail.index;
            if(this.active == 0){
                this.status = 1;
                this.index = 1;
                this.number = 0;
                this.getQuery();
            }else if(this.active == 1){
                this.status = 2;
                this.index = -1;
                this.number = '';
                this.getQuery();
            }else if(this.active == 2){
                this.number = '';
                this.status = 9;
                this.getQuery();
            }
        },
        getTab(index){
            this.idx = index;
            this.getQuery();
        },
        bindPickerChange(e){
            this.index = e.mp.detail.value;
            // this.activityDays = this.index==0?7:this.index==1?30:60;
            this.getQuery();
        },
        getPickerChange(e){
            this.number = e.mp.detail.value;
            this.getQuery();
        },
        getPickerChangeOver(e){
            this.numberOver = e.mp.detail.value;
            this.$httpWX.post({
                url:this.$api.student.query,
                data:{
                    params:{
                        coachId:this.employeeId,
                        status:this.status,
                        // isActivity:this.idx=='1'?0:this.idx=='2'?1:'',
                        activityDays:this.index==0?7:this.index==1?30:this.index==2?60:'',
                        kmCode:this.numberOver==1?'km2':this.numberOver==2?'km3':''
                    },
                    pagination:this.pagination
                }
            }).then(res=>{
                this.list = res.data.list;
                this.list.forEach(item=>{
                    var dd = getDictValue(this.listData,"gender",item.baseInfo.gender);
                    var km2 = getDictValue(this.listData,"km_status",item.km2Status);
                    var km3 = getDictValue(this.listData,"km_status",item.km3Status);
                    this.$set(item,'sex',dd);
                    this.$set(item,'ages',this.computeAge(item.baseInfo.birthday));
                    this.$set(item,'km2statusV',km2);
                    this.$set(item,'km3statusV',km3);
                })
            })
        },
        getTabClick(idx){
            this.num = idx;
        },
        pickerDate(e){
            console.log(e);
            this.date = e.mp.detail.value;
        },
        // 学员详情
        getDetail(item){
            const url = "/pages/studentDetail/main?id="+item.id;
            wx.navigateTo({url:url})
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
        padding:20rpx;
        .icon{
            font-size: 20px!important;
        }
    }
    .content{
        .row_wrap{
            padding:20rpx 20rpx 0 20rpx;
            .sel_left{
                display: flex;
                justify-content: space-around;
                font-size: 28rpx;
                p{
                    width: 48px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background: #fff;
                    border:1rpx solid #e6e6ea;
                    border-radius: 12px;
                    font-size: 24rpx;
                    color: #b2b2b2;
                }
                p.active{
                    color:#fb7015;
                    border:1rpx solid #fb7015;
                }
                p.actives{
                    color:#fb7015;
                }
            }
            .sel_time{
                display: flex;
                .gasBox{
                    width: 48%;
                    height: 24px;
                    line-height: 24px;
                    font-size: 24rpx;
                    color: #4f4f4f;
                    text-align: center;
                    background: #e6e6ea;
                    border:1rpx solid #e6e6ea;
                }
            }
        }
    }
    .center{
        .box_cont{
            background: #fff;
            font-size: 28rpx;
            margin: 20rpx 0;
            .rows{
                padding:10rpx 20rpx;
                .title{
                    display: flex;
                    font-size: 28rpx;
                    p{
                        flex: 1;
                        color: #4f4f4f;
                    }
                    .t_name{
                        font-size: 28rpx;
                        font-weight: bold;
                        color: #4f4f4f;
                    }
                    .t_sex{
                        font-size: 24rpx;
                    }
                    .t_phone{
                        color: #fd5c1f;
                    }
                    
                }
                .t_status{
                    font-size: 24rpx;
                    color: #979797;
                    padding:10rpx 0;
                }
                .r_btn{
                    text-align: right;
                    margin-top:20rpx;
                    .btn{
                        width: 80px;
                        height: 24px;
                        line-height: 24px;
                        font-size: 24rpx;
                        text-align: center;
                        border-radius: 8rpx;
                        border:1rpx solid #fb7015;
                        color: #fb7015;
                    }
                }
            }
            .row_bottom{
                padding: 0 20rpx 20rpx 20rpx;
                font-size: 24rpx;
                color: #979797;
            }
        }
    }
}
</style>


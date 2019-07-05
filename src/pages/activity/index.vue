<template>
    <div class="wrap">
        <i-tabs :current="current" i-class="itabs" color="#fa6d11" @change="handleChange">
            <i-tab key="tab1" title="活动列表"></i-tab>
            <i-tab key="tab2" title="我的活动"></i-tab>
        </i-tabs>
        <div class="content" v-for="(item,index) in list" :key="index">
            <i-panel i-class="panel" hide-border="false">
                <i-row i-class="top">
                    <i-col span="9">
                        <div class="colLeft">
                            <image :src="imgUrl+item.pictureUrl" alt=""></image>
                            <!-- <p v-if="current!='tab2'" class="icon">团购</p> -->
                            <i-tag  v-if="item.type=='REDUCTION'" i-class="icon" name="团购"  color="red">
                                团购
                            </i-tag>
                        </div>
                    </i-col>
                    <i-col span="15" i-class="colRight">
                        <h3>{{item.name}}</h3>
                        <div class="box" v-if="item.type=='REDUCTION'">
                            <p style="color:#fa6d11;font-size:24rpx;font-weight:bold;">最低：<span style="font-size:30rpx;">{{item.price-item.discountsRestrictions}}</span></p>
                            <p style="text-decoration:line-through;margin:3px 10px;color:#fa6d11;font-size:20rpx;">原价{{item.price}}</p>
                            <p style="color:#fa6d11;font-size:20rpx;margin-left:30px;maring-top:3px;">减{{item.discountsMoney}}</p>
                        </div>
                        <div class="box" v-if="item.type=='COMMON'">
                            <p style="color:#fa6d11;font-size:24rpx;font-weight:bold;">团购价：<span style="font-size:30rpx;">{{item.discountsRestrictions}}</span></p>
                            <p style="text-decoration:line-through;margin:3px 10px;color:#fa6d11;font-size:20rpx;">原价{{item.price}}</p>
                            <p style="color:#fa6d11;font-size:20rpx;margin-left:30px;maring-top:3px;">{{item.peopleRestrictions}}人团</p>
                        </div>
                        <p style="font-size:20rpx;color:#979797;">活动归属：{{item.schoolName}}</p>
                    </i-col>
                </i-row>
                <i-row i-class="bottom" v-if="current!='tab1'">
                    <i-col span="4">
                        <p>开团数：<span>{{item.startGroupNum || ''}}</span></p>
                    </i-col>
                    <i-col span="13">
                        <p>参团人数：<span>{{item.joinGroupUserNum || ''}}</span></p>
                    </i-col>
                    <i-col span="7">
                        <i-button i-class="ibtn" type="primary"  @click="getRouter(item)">查看详情</i-button>
                    </i-col>
                </i-row>
                <i-row i-class="bottom" v-if="current=='tab1'">
                    <i-col span="16">
                        <p>活动时间：{{item.startTime || ''}}～{{item.endTime || ''}}</p>
                    </i-col>
                    <i-col span="8">
                        <div>
                            <i-button i-class="ibtn" type="primary"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo(item)">分享活动</i-button>
                        </div>
                    </i-col>
                </i-row>
                <!-- <div class="bottom" v-if="current!='tab1'">
                    <p style="color:red;margin-top:8rpx;">开团数：{{item.startGroupNum || ''}}</p>
                    <p style="margin-top:8rpx;color:blue;">参团人数：{{item.joinGroupUserNum || ''}}</p>
                    <i-button i-class="ibtn" type="primary"  @click="getRouter(item)">查看详情</i-button>
                </div> -->
                <!-- <div class="bottom" v-if="current=='tab1'">
                    <p style="color:red;margin-top:8rpx;">活动时间：{{item.startTime || ''}}～{{item.endTime || ''}}</p>
                    <i-button i-class="ibtn" type="primary"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo(item)">分享活动</i-button>
                </div> -->
            </i-panel>
        </div>
        <i-divider content="没有更多了"></i-divider>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgUrl:'http://aplusyx.oss-cn-beijing.aliyuncs.com/',
            current:'tab1',
            userInfo:"",
            list:[],
            isPage: true, // 是否可以翻页
            isNew:true,
            pageNo:1,
            pageSize:10,
            totalPage:0,
            openid:"",
            id:"",
            docid:"",
            pageNoT:1,
            pageSizeT:10,
            totalPageT:0,
            type:""
        }
    },
    onLoad(){
        this.current = 'tab1';
        this.queryLlist();
    },
    methods: {
        queryLlist(){
            this.$httpWX.post({
                url:this.$api.activity.getPageList,
                data:{
                    schoolId:String(wx.getStorageSync('schoolId')),
                    // schoolId:'1',
                    status:"PROGRESS",
                    pageNo:this.pageNo,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                console.log(res);
                this.totalPage = res.content.totalPage;

                if(this.pageNo * this.pageSize <= res.content.totalNum){
                    this.isPage = true;
                }else {
                    this.isPage = false;
                }
                let temp = [];
                if(this.pageNo == 1){
                    temp = res.content.item;
                }else {
                    temp = this.list.concat(res.content.item);
                }
                this.list = temp;
            })
        },
        myQuery(){
            this.$httpWX.post({
                url:this.$api.activity.myGroups,
                data:{
                    employeeId:wx.getStorageSync('userId'),
                    pageNo:this.pageNoT,
                    pageSize:this.pageSizeT
                }
            }).then(res=>{
                console.log(res);
                this.totalPageT = res.content.totalPage;
                 if(this.pageNoT * this.pageSizeT <= res.content.totalNum){
                    this.isNew = true;
                }else {
                    this.isNew = false;
                }
                let temp = [];
                if(this.pageNoT == 1){
                    temp = res.content.item;
                }else {
                    temp = this.list.concat(res.content.item);
                }
                this.list = temp;
            })
        },
        handleChange(e){
            this.current = e.mp.detail.key;
            if(this.current=='tab1'){
                this.pageNo = 1;
                this.queryLlist();
            }else if(this.current=='tab2'){
                this.pageNo = 1;
                this.myQuery();
            }
        },
        getRouter(item){
            this.id = item.id;
            this.docid = item.docid;
            const type = item.type;
            const url = '/pages/activityDetail/main?id='+this.id+'&docid='+this.docid + '&employeeId='+wx.getStorageSync('userId')+'&type='+type;
            wx.navigateTo({url:url});
        },
        bindGetUserInfo(item){
            console.log(item);
            this.type = item.type;
            this.id = item.id;
            var that = this;
            wx.login({
                success(res) {
                    console.log(res);
                    if(res.code){
                        that.$httpWX.get({
                            url:that.$api.userInfo.getOpenid+"/"+res.code,
                            data:{

                            }
                        }).then(res=>{
                            console.log(res);
                            that.openid = res.content.openid;
                        })
                    }
                    wx.getSetting({
                        success(res) {
                            console.log(res);
                            if (res.authSetting['scope.userInfo']) {
                                that.isShow = true;
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                wx.getUserInfo({
                                    success(res) {
                                        console.log(res.userInfo)
                                        that.userInfo = res.userInfo;
                                        that.userInfo.employeeId = wx.getStorageSync("userId");
                                        that.userInfo.schoolId = wx.getStorageSync("schoolId");
                                        that.userInfo.employeeName = wx.getStorageSync("userName");
                                        that.userInfo.employeePhone = wx.getStorageSync("phone");
                                        that.userInfo.id = that.id;
                                        that.userInfo.mode = '1';
                                        that.userInfo.coachMark = true; // 教练标识
                                        var userInfo = JSON.stringify(that.userInfo);
                                        wx.navigateToMiniProgram({
                                            appId: 'wxe825ca816def4b19',
                                            path: 'pages/activityDetail/main?userInfo='+userInfo+'&type='+that.type,
                                            extraData: {
                                                foo: 'bar'
                                            },
                                            // envVersion: 'release',
                                            envVersion:'trial',
                                            // envVersion: 'develop',
                                            success(res) {
                                                // 打开成功
                                                console.log(res);
                                                that.getSubmit();
                                            }
                                        })
                                    }
                                })
                            }else {

                            }
                        }
                    })
                }
            })
        },

        // 提交教练信息
        getSubmit(){
            this.$httpWX.post({
                url:this.$api.activity.saveEmployee,
                data:{
                    openid:this.openid,
                    headUrl:this.userInfo.avatarUrl,
                    employeeId:wx.getStorageSync("userId"),
                    employeeName:wx.getStorageSync("userName"),
                    employeePhone:wx.getStorageSync("phone"),
                    schoolId:String(wx.getStorageSync("schoolId"))
                }
            }).then(res=>{
                console.log(res);
            })
        }
    },
    // 下拉刷新
    onPullDownRefresh() {
        this.isPage = true;
        this.pageNo = 1;
        if(this.current=='tab1'){
            this.queryLlist();
        }else if(this.current=='tab2'){
            this.myQuery();
        }
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.current=='tab1'){

            if (this.isPage) {
                // if(this.totalPage == 1){
                //     return false;
                // }else {
                    this.pageNo++;
                    this.queryLlist();
                // }
            }
        }else if(this.current=='tab2'){
             if (this.isNew) {
                // if(this.totalPageT == 1){
                //     return false;   
                // }else{
                    this.pageNoT++;
                    this.myQuery();
                // }
            }
        }
    }
}
</script>

<style lang="scss">
.wrap{
    .itabs{
        font-size: 16px;
    }
}
    .panel{
        background: #fff;
        padding: 15rpx;
        .top{
            padding-bottom:10rpx;
            .colLeft{
                width:100%;
                height: 160rpx;
                // overflow: hidden;
                position: relative;
                image{
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                }
                .icon{
                    position: absolute;
                    top: 0;
                    left:0;
                    color: #fff;
                    font-size: 20rpx;
                    background: #fb6809!important;
                    border:none!important;
                }
            }
            .colRight{
                padding: 0 20rpx;
                font-size: 28rpx;
                h3{
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #4f4f4f;
                }
                .box{
                    padding: 15rpx 0;
                    display: flex;
                }
            }
        }
        .bottom{
            padding: 15rpx 0;
            // display: flex;
            border-bottom:1rpx solid #ebebeb;
            font-size: 20rpx;
            p{
                color:#979797;
                span{
                    font-weight: 500;
                    color:#fb6809;
                }
            }
            div{
                margin-left: 30rpx;
            }
            .ibtn{
                width: 80px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                margin-top:-10px!important;
                background-image: linear-gradient(90deg, 
                #fc8902 0%, 
                #fb4003 100%)!important;
                box-shadow: 0px 2px 10px 0px 
                rgba(253, 135, 2, 0.6)!important;
                border-radius:21px;
            }
        }
    }
</style>

<template>
  <div class="wrap">
    <!-- <div class="nav">
      <image style="width: 100%; height: 100%;" src="/static/images/work.png"></image>
    </div>
    <div class="content_box">
      <div class="conten_item" @click="toPage('/pages/fuelReport/main')">
        <p><i class="iconfont icon-ranliaofeitibao"></i></p>
        <p>燃料费提报</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/repairRegister/main')">
        <p><i class="iconfont icon-weixiutibao"></i></p>
        <p>维修提报</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/repairCost/main')">
        <p><i class="iconfont icon-weixiufeitibao"></i></p>
        <p>维修费提报</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/AskForLeave/main')">
        <p><i class="iconfont icon-qingjiatiaoxiu"></i></p>
        <p>请假调休</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/replacementCar/main')">
        <p><i class="iconfont icon-genghuanyongche"></i></p>
        <p>更换用车</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/quitApply/main')">
        <p><i class="iconfont icon-lizhishenqing"></i></p>
        <p>离职申请</p></div>
      <div class="conten_item" @click="toPage('/pages/toExamine/main')">
        <p><i class="iconfont icon-weixiushenhe"></i></p>
        <p>维修审核</p>
      </div>
      <div class="conten_item" @click="toPage('/pages/overtime/main')">
        <p><i class="iconfont icon-zaowanban"></i></p>
        <p>早晚班</p>
      </div>
    </div> -->
    <div class="boxWrap">
      <div class="rowBox" @click="toPage('/pages/AskForLeave/main')">
        <p>
          <image src="/static/images/icon2.png" style="width:44px;height:44px;"></image>
        </p>
        <p>请假调休</p>
      </div>
      <div class="rowBox" @click="toPage('/pages/replacementCar/main')">
        <p>
          <image src="/static/images/icon1.png" style="width:44px;height:44px;"></image>
        </p>
        <p>更换用车</p>
      </div>
    </div>
    <!-- <div class="boxWrap"> -->
      <!-- <i-row i-class="rowBox"  @click="toPage('/pages/AskForLeave/main')">
        <i-col span="4" style="text-align:center;">
          <image src="/static/images/icon2.png" style="width:50rpx;height:50rpx;"></image>
        </i-col>
        <i-col span="16"><p style="margin-left:20rpx;font-size:30rpx;margin-top:8rpx;">请假调休</p></i-col>
        <i-col span="4" style="text-align:center;">
          <i-icon size="24"  color="#5e5e5e" type="enter" />
        </i-col>
      </i-row>
      <i-row i-class="rowBox" @click="toPage('/pages/replacementCar/main')">
        <i-col span="4" style="text-align:center;">
          <image src="/static/images/icon1.png" style="width:50rpx;height:50rpx;"></image>
        </i-col>
        <i-col span="16"><p style="margin-left:20rpx;font-size:30rpx;margin-top:8rpx;">更换用车</p></i-col>
        <i-col span="4" style="text-align:center;">
          <i-icon size="24"  color="#5e5e5e" type="enter" />
        </i-col>
      </i-row> -->

      <!-- 早晚班 -->
      <!-- <i-row i-class="rowBox" @click="toPage('/pages/overtime/main')">
        <i-col span="4" style="text-align:center;">
          <image src="/static/images/icon3.png" style="width:50rpx;height:50rpx;"></image>
        </i-col>
        <i-col span="16"><p style="margin-left:20rpx;font-size:30rpx;margin-top:8rpx;">早晚班</p></i-col>
        <i-col span="4" style="text-align:center;">
          <i-icon size="24"  color="#5e5e5e" type="enter" />
        </i-col>
      </i-row> -->
    <!-- </div> -->
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){

    },
    onShow(){
      // this.getToken();
    },
    onLoad(){
      this.getMycoach();
    },
    methods:{
      // 校验token
      getToken(){
        let token = wx.getStorageSync('token');
        this.$httpWX.get({
          url:this.$api.timetable.checkAuthentication +  "/"+token,
          data:{

          }
        }).then(res=>{
          console.log('token',res);
          if(res.status.code * 1 !== 10){
            wx.showLoading();
            wx.hideLoading();
            setTimeout( () => {
              wx.showToast({
                title: '请重新登录!',
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            wx.reLaunch({
              url:"/pages/login/main"
            })
          }
        })
      },
      // 查询教练
    getMycoach(){
      this.$httpWX.get({
        url: this.$api.detail.queryById + "/" + wx.getStorageSync('userId'),
        data:{
          
        }
      }).then(res=>{
        console.log(res);
        wx.setStorageSync('timeIntervalId',res.content.timeIntervalId);
        wx.setStorageSync('coachName',res.content.name)
      })
    },
      toPage(urls){
        wx.navigateTo({
          url:urls
        })
      }
    }
  }
</script>
<style lang="scss">
.iconfont{
font-size:35px;
}
.nav{
  height:128px;
  text-align:center;
  font-size:20px;
}
.content_box{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  font-size:12px;
  margin-top:20px;
}
.conten_item{
  width:18%;
  padding:10px;
  text-align:center;
}
.boxWrap{
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
}
.boxWrap .rowBox{
  width:159px;
  padding:90rpx 0;
  margin:45rpx 20rpx;
  background: #fff;
  box-shadow:0 1px 1px rgba(0,0,0,0.1);
  border-radius: 5px;
  font-size: 28rpx;
  p{
    text-align: center;
  }
  
}
</style>

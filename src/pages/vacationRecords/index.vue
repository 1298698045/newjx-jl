<template>
  <div class="wrap">
    <!-- 休假记录 -->
    <div class="container" v-if="state==0">
      <div class="header">
        <h3>
          <!-- <span>|</span> -->
          待休假
          <span>{{list.length}}</span>
          <!-- （x课时） -->
        </h3>
        <div class="content">
          <div class="row" v-for="(item,index) in list" :key="index">
            <i-row>
              <i-col span="4">
                <p class="p_time">开始时间</p>
                <p class="p_time">结束时间</p>
              </i-col>
              <i-col span="10">
                <p class="p_col p_time">{{item.vacationStartDate}}  {{item.vacationStartTime}}</p>
                <p class="p_col p_time">{{item.vacationEndDate}}    {{item.vacationEndTime}}</p>
              </i-col>
              <i-col span="4">
                <div style="margin-top:20rpx;">
                  <i-button i-class="ibtn" @click="getRevoke(item)">撤销</i-button>
                </div>
                <div v-if="item.auditStatus==2">
                  <i-button i-class="ibtn btn_active btn_one" @click="getDelete(item)">删除</i-button>
                  <i-button i-class="ibtn btn_active">修改</i-button>
                </div>
              </i-col>
              <i-col span="6" i-class="r">
                <p>•{{item.auditStatus==0?'审核中':item.auditStatus==1?'已完成':item.auditStatus==2?'已驳回':item.auditStatus==3?'已撤销':''}}</p>
              </i-col>
            </i-row>
          </div>
        </div>
      </div>
      <div class="center">
        <h3>
          <!-- <span>|</span> -->
          已休假
          <span>{{contList.length}}</span>
          <!-- （x课时） -->
        </h3>
        <div class="boxCont">
          <div class="rows"  v-for="(item,index) in contList" :key="index">
            <i-row>
              <i-col span="4">
                <p class="p_time">开始时间</p>
                <p class="p_time">结束时间</p>
              </i-col>
              <i-col span="14">
                 <p class="p_col p_time">{{item.vacationStartDate}}  {{item.vacationStartTime}}</p>
                <p class="p_col p_time">{{item.vacationEndDate}}    {{item.vacationEndTime}}</p>
              </i-col>
              <i-col span="6" i-class="r">
                <p>{{item.auditStatus==0?'审核中':item.auditStatus==1?'已完成':item.auditStatus==2?'已驳回':item.auditStatus==3?'已撤销':''}}</p>
              </i-col>
            </i-row>
          </div>
          
        </div>
      </div>
    </div>
    <div class="show" v-if="state==1">
      <div class="box">
        <h3>
          <i class="iconfont icon-neirongweikong" style="font-size:130rpx;color:#5d5d5d;"></i>
        </h3>
        <p>您还没有相关记录呢~</p>
      </div>
    </div>
    <i-modal i-class="modal" :visible="visible" @ok="goConfirm" @cancel="goCancel">
      <div>
        <span>是否取消休假？</span>
      </div>
      <!-- <view class="slot">
        <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
        <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm">确认</i-button>
      </view> -->
    </i-modal>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      state:0,
      contList:[],
      list: [],
      visible:false,
      id:"",
      leaveDate:"",
      amFlag:"",
      pagination:{
         current: 0,
         pageSize: 10,
      },
      date:"",
      employeeId:""
    };
  },
  onLoad(){
    this.employeeId = wx.getStorageSync('employeeId');
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    this.date = y + "-" + m + "-" + day;
    this.getQueryList();
    this.get2QueryList();
  },
  methods: {
    getQueryList(){
      this.$httpWX.post({
        url:this.$api.leave.getRecordList,
        data:{
          params:{
            employeeId:this.employeeId
          }
        }
      }).then(res=>{
        let list = res.data.list;
        this.list = list;
      })
    },
    get2QueryList(){
      this.$httpWX.post({
        url:this.$api.leave.getOffRecordList,
        data:{
          params:{
            employeeId:this.employeeId
          }
        }
      }).then(res=>{
        let list = res.data.list;
        this.contList = list;
      })
    },
    goCancel(){
      this.visible = false;
    },
    goConfirm(){
      this.$httpWX.post({
        url:this.$api.leave.cancleOff,
        data:{
          params:{
            vacationId:this.id
          }
        }
      }).then(res=>{
        console.log(res);
        wx.showLoading();
        wx.hideLoading();
        setTimeout( () => {
          wx.showToast({
            title: res.msg,
            icon: "none",
          });
          setTimeout( () =>{
            wx.hideToast();  
          },2000)
        },0);
        this.visible = false;
        this.getQueryList();
      })
    },
    getDelete(item){
      this.$httpWX.post({
        url:this.$api.leave.delete,
        data:{
          params:{
            vacationId:item.id
          }
        }
      }).then(res=>{
        wx.showToast({
            title: res.msg,
            icon:"success",
            duration: 2000,
            success: () => {
                setTimeout(()=>{
                    this.getQueryList();
                },1000)
            }
        })
      })
    },
    // 撤销
    getRevoke(item) {
      this.id = item.id;
      this.leaveDate = item.leaveDate;
      this.amFlag = item.amFlag;
      this.visible = true;
    }
  },
     /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .container {
    width: 93%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    .header {
      width: 100%;
      height: auto;
      margin: 30rpx 0;
      h3 {
        font-size: 28rpx;
        font-weight: bold;
        color:#4f4f4f;
        padding: 15rpx 0;
        span {
          width: 40px;
          height: 21px;
          line-height:21px;
          background: #fff;
          text-align: center;
          color: #fb6809;
          background-color: rgba(251, 100, 2, 0.1);
          border-radius: 10px;
          font-size: 11px;
          display:inline-block;
          margin-left: 10px;
        }
      }
      .content {
        width: 100%;
        height: auto;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        // padding:0 20rpx;
        .row {
          width: 93%;
          margin: 0 auto;
          font-size: 24rpx;
          color: #5e5e5e;
          border-bottom: 1rpx solid #faf9f9;
          padding:30rpx 0;
          .p_col{
            color: #4f4f4f;
            font-weight: bold;
          }
          .p_time{
            margin: 8rpx 0;
          }
          .ibtn {
            width: 140rpx !important;
            height: 24px !important;
            line-height: 24px !important;
            font-size: 24rpx !important;
            color: #fb7015 !important;
            margin: 0 !important;
            border-radius: 10rpx !important;
            background: #fff !important;
            border: 1rpx solid #fb7015 !important;
            box-sizing: border-box !important;
          }
          .btn_active{
            height: 20px!important;
            line-height: 20px!important;
          }
          .btn_one{
            border:1rpx solid #b1b1b1!important;
            color: #b1b1b1!important;
            margin-bottom: 10rpx!important;
          }
          .r{
            p{
              text-align: right;
              margin-top: 25rpx;
            }
          }
        }
        .row:last-child {
          border-bottom: none;
        }
      }
    }
    .center {
      width: 100%;
      height: auto;
      overflow: hidden;
      h3 {
        font-size: 28rpx;
        font-weight: bold;
        color:#4f4f4f;
        padding: 15rpx 0;
        span {
          width: 40px;
          height: 21px;
          line-height:21px;
          background: #fff;
          text-align: center;
          color: #fb6809;
          background-color: rgba(251, 100, 2, 0.1);
          border-radius: 10px;
          font-size: 11px;
          display:inline-block;
          margin-left: 10px;
        }
      }
      .boxCont {
        width: 100%;
        height: auto;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        .rows {
          width: 93%;
          margin: 0 auto;
          font-size: 24rpx;
          color: #5e5e5e;
          border-bottom: 1rpx solid #faf9f9;
          padding:30rpx 0;
          .p_col{
            color: #4f4f4f;
            font-weight: bold;
          }
          .p_time{
            margin: 8rpx 0;
          }
          .r{
            text-align: right;
            margin-top: 25rpx;
            color: #979797;
          }
        }
        .rows:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .show {
    width: 100%;
    height: 100%;
    .box {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      h3{
        padding-bottom:30rpx;
      }
      p {
        color: #999999;
        font-size: 28rpx;
      }
    }
  }
.modal{
  div {
    color: #212121 !important;
    margin:20px 0;
    span {
      color: black;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
  .slot {
    text-align: center;
    display: flex;
    .leftBtn {
      width: 200rpx;
      height: 30px;
      line-height: 30px;
      text-align: center;
      flex: 1 !important;
      border-radius: 40rpx;
      /* background: -webkit-linear-gradient(left, #878787, #b1b1b1) !important; */
      background: #414141!important;
      color: #fff !important;
      margin-left: 50rpx;
    }
    .rightBtn {
      width: 200rpx;
      height: 30px;
      line-height: 30px;
      flex: 1 !important;
      border-radius: 40rpx;
      /* background: -webkit-linear-gradient(left, #f41856, #e65179) !important; */
      background: #ff3f00!important;
      color: #fff !important;
    }
  }
}

}
</style>

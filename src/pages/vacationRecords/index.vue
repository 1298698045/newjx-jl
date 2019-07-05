<template>
  <div class="wrap">
    <!-- 休假记录 -->
    <div class="container" v-if="state==0">
      <div class="header">
        <h3>
          <!-- <span>|</span> -->
          待休假
          <span>{{contList.length}}</span>
          <!-- （x课时） -->
        </h3>
        <div class="content">
          <div class="row" v-for="(item,index) in contList" :key="index">
            <i-row>
              <i-col i-class="icol" span="6">
                <p>{{item.leaveDate}}</p>
              </i-col>
              <i-col i-class="icol" span="4">
                <p>{{item.weekDay=='0'?'星期一':item.weekDay=='1'?'星期二':item.weekDay=='2'?'星期三':item.weekDay=='3'?'星期四':item.weekDay=='4'?'星期五':item.weekDay=='5'?'星期六':item.weekDay=='6'?'星期日':''}}</p>
              </i-col>
              <i-col i-class="icol" span="8">
                <p>{{item.amFlag=='0'?'上午':item.amFlag=='1'?'下午':''}}</p>
              </i-col>
              <i-col i-class="icol" span="4" @click="getRevoke(item)">
                <i-button i-class="ibtn">撤销</i-button>
              </i-col>
            </i-row>
          </div>
        </div>
      </div>
      <div class="center">
        <h3>
          <!-- <span>|</span> -->
          已休假
          <span>{{list.length}}</span>
          <!-- （x课时） -->
        </h3>
        <div class="boxCont">
          <div class="rows" v-for="(item,idx) in list" :key="idx">
            <i-row>
              <i-col i-class="icol" span="6">
                <p>{{item.leaveDate}}</p>
              </i-col>
              <i-col i-class="icol" span="4">
                <p>{{item.weekDay=='0'?'星期一':item.weekDay=='1'?'星期二':item.weekDay=='2'?'星期三':item.weekDay=='3'?'星期四':item.weekDay=='4'?'星期五':item.weekDay=='5'?'星期六':item.weekDay=='6'?'星期日':''}}</p>
              </i-col>
              <i-col i-class="icol" span="8">
                <p>{{item.amFlag=='0'?'上午':item.amFlag=='1'?'下午':''}}</p>
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
    <i-modal i-class="modal" :visible="visible" :show-ok="false" :show-cancel="false">
      <view>
        <span>是否取消休假？</span>
      </view>
      <view class="slot">
        <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
        <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm">确认</i-button>
      </view>
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
      amFlag:""
    };
  },
  onLoad(){
    this.getQueryList();
  },
  methods: {
    getQueryList(){
      this.$httpWX.get({
        url:this.$api.leave.getOffRecordList+"/"+wx.getStorageSync('userId'),
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.contList = res.content.offList;
        this.list = res.content.alreadyOffList;
      })
    },
    goCancel(){
      this.visible = false;
    },
    goConfirm(){
      this.$httpWX.post({
        url:this.$api.leave.cancleOff,
        data:{
          id:this.id,
          leaveDate:this.leaveDate,
          amFlag:this.amFlag,
          coachId:wx.getStorageSync('userId')
        }
      }).then(res=>{
        console.log(res);
        // wx.showToast({
        //   title:res.status.message,
        //   icon:'none',
        //   duration: 2000
        // })
        wx.showLoading();
        wx.hideLoading();
        setTimeout( () => {
          wx.showToast({
            title: res.status.message,
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
      this.getQueryList();
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
          .icol {
            // text-align: center;
            // padding: 20rpx 0;
            p {
              margin-top: 10rpx;
            }
          }
          .ibtn {
            width: 140rpx !important;
            height: 50rpx !important;
            line-height: 50rpx !important;
            font-size: 24rpx !important;
            color: #fb7015 !important;
            margin: 0 !important;
            border-radius: 10rpx !important;
            background: #fff !important;
            border: 1rpx solid #fb7015 !important;
            box-sizing: border-box !important;
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
          padding:40rpx 0;
          .icol {
            // padding: 30rpx 0 !important;
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
  view {
    color: #212121 !important;
    margin:20rpx 0;
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

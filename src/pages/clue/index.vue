<template>
  <div class="wrap">
    <div class="header">
      <!-- <p :class="{active:num==index}" v-for="(item,index) in title" :key="index" @click="getTab(index)">{{item}}</p> -->
      <p :class="{active:num==0}" @click="getTab(0)">待转化({{totalNum}})</p>
      <p :class="{active:num==1}" @click="getTab(1)">已报名({{totalNumT}})</p>
    </div>
    <div class="content">
      <div
        class="rows"
        v-for="(item,index) in list"
        :key="index"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @click="getDetail(item)"
        @tap="getTap"
        @longtap="getLongtap(item)"
      >
        <i-row>
          <i-col span="12">
            <p style="margin-left:20rpx;">{{item.name}}</p>
          </i-col>
          <i-col span="10" v-if="num==0" style="text-align:right;color:#666;">{{item.createTime}}</i-col>
          <i-col span="10" v-if="num==1" style="text-align:right;color:#666;">{{item.finishTime}}</i-col>
          <i-col span="2" style="text-align:center;">
            <i-icon type="enter" size="20"/>
          </i-col>
        </i-row>
      </div>
    </div>
    <cluesAddButton></cluesAddButton>
    <i-modal i-class="modal" :visible="visible" @ok="goConfirm" @cancel="goCancel">
      <view style="padding:30rpx 0;color:black;">
        <span>是否删除线索？</span>
      </view>
      <!-- <view class="slot">
        <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
        <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm">确认</i-button>
      </view> -->
    </i-modal>
  </div>
</template>
<script>
import cluesAddButton from "../../components/cluesAddButton";
export default {
  components: { cluesAddButton },
  data() {
    return {
      title: ["待转化", "已报名"],
      num: 0,
      list: [],
      visible: false,
      status: 0,
      pageNo: 1,
      pageSize: 15,
      isPage: true, // 是否可以翻页
      totalNum: "",
      totalNumT:"",
      id: "",
      // 触摸开始时间
      touchStartTime: 0,
      // 触摸结束时间
      touchEndTime: 0,
      // 最后一次单击事件点击发生时间
      lastTapTime: 0,
      // 单击事件点击后要触发的函数
      lastTapTimeoutFunc: null
    };
  },
  onLoad() {
    this.getQuery();
    this.queryAll();
    this.query();
  },
  onShow(){
    this.getQuery();
    this.queryAll();
    this.query();
  },
  methods: {
    getTab(index) {
      this.num = index;
      index == 0 ? (this.status = 0) : index == 1 ? (this.status = 1) : "";
      this.getQuery();
    },
    getDetail(item) {
      this.id = item.id;
    },
    getTap(e) {
      var that = this;
      // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
      if (that.touchEndTime - that.touchStartTime < 350) {
        // 当前点击的时间
        var currentTime = e.timeStamp;
        var lastTapTime = that.lastTapTime;
        // 更新最后一次点击时间
        that.lastTapTime = currentTime;

        // 如果两次点击时间在300毫秒内，则认为是双击事件
        if (currentTime - lastTapTime < 300) {
          console.log("double tap");
          // 成功触发双击事件时，取消单击事件的执行
          clearTimeout(that.lastTapTimeoutFunc);
          // wx.showModal({
          //   title: "提示",
          //   content: "双击事件被触发",
          //   showCancel: false
          // });
        } else {
          // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
          that.lastTapTimeoutFunc = setTimeout(function() {
            const url =
              "/pages/clueDetail/main?id=" + that.id + "&mode=" + that.num;
            wx.navigateTo({ url: url });
          }, 300);
        }
      }
    },
    touchStart(e) {
      console.log(e);
      this.touchStartTime = e.timeStamp;
    },
    touchEnd(e) {
      console.log(e);
      this.touchEndTime = e.timeStamp;
    },
    // 长按事件
    // getLongtap(item) {
    //   console.log(item);
    //   this.id = item.id;
    //   if (this.num == 0) {
    //     this.visible = true;
    //   }
    // },
    goCancel() {
      this.visible = false;
    },
    goConfirm() {
      this.$httpWX
        .post({
          url: this.$api.clue.delete+"/" + this.id,
          data: {}
        })
        .then(res => {
          console.log(res);
          this.visible = false;
          wx.showToast({
            title: res.status.message,
            icon: "none"
          });
          this.getQuery();
          this.queryAll();
        });
    },
    query(){
      this.$httpWX.post({
        url: this.$api.clue.getPageList,
          data: {
            coachSign:wx.getStorageSync('coachSign'),
            status: 1,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
      }).then(res=>{
        this.totalNumT = res.content.totalNum;
      })
    },
    queryAll(){
      this.$httpWX.post({
        url: this.$api.clue.getPageList,
          data: {
            coachSign:wx.getStorageSync('coachSign'),
            status: 0,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
      }).then(res=>{
        this.totalNum = res.content.totalNum;
      })
    },
    getQuery(isNew) {
      this.$httpWX
        .post({
          url: this.$api.clue.getPageList,
          data: {
            coachSign:wx.getStorageSync('coachSign'),
            status: this.status,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res);
          // this.list = res.content.item;
          // this.totalNum = res.content.totalNum;
          if (this.pageNo * this.pageSize <= res.content.totalNum) {
            this.isPage = true;
          } else {
            this.isPage = false;
          }
          let temp = [];
          if (this.pageNo == 1) {
            temp = res.content.item;
          } else {
            temp = this.list.concat(res.content.item);
          }
          this.list = temp;
        });
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.isPage = true;
    this.pageNo = 1;
    this.getQuery();
    this.queryAll();
    this.query();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.isPage) {
      this.pageNo++;
      this.getQuery();
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    overflow: hidden;
    background: #fff;
    display: flex;
    p {
      flex: 1;
      text-align: center;
      padding: 20rpx 0;
      font-size: 16px;
      color: #979797;
    }
    p.active {
      color: #fb7015;
      border-bottom: 2px solid #fb7015;
    }
  }
  .content {
    width: 100%;
    .rows {
      background: #fff;
      padding: 30rpx 10rpx;
      font-size: 28rpx;
      border-bottom: 1rpx solid #efefef;
    }
    .rows:last-child {
      border-bottom: none;
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
      background: #414141 !important;
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
      background: #ff3f00 !important;
      color: #fff !important;
    }
  }
}
</style>

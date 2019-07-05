<template>
  <div class="wrap">
    <!-- 维修记录 -->
    <div class="boxWrap" v-if="state==0">
      <i-row i-class="header">
        <i-col span="6" i-class="left">
          <p>
            <picker mode="date" v-model="time" start="2010" end="2099" fields="year" v-on:change="bindDateChange">
              <span>{{time}}</span>
              <i-con i-class="Types" type="unfold" size="20" color="#bfbfbf"></i-con>
            </picker>
          </p>
        </i-col>
        <i-col span="18" i-class="right">
            <i-tabs i-class="itabs" :curren="current" color="red" scroll v-on:change="handleChangeScroll">
                <i-tab v-for="(item,index) in list" :key="index" :title="item.title" :i-class="current==index?'active':'itab'"></i-tab>
            </i-tabs>
        </i-col>
      </i-row>
      <div class="centerWrap" v-if="current==0">
            <div class="leftTab">
                <scroll-view scroll-y="true" :style="style1"  class="left_tabbar_list">
                    <view v-on:click="changeTab(index)" class="left_tabbar_item" :class="activeIndex==index?'active':''" v-for="(item,index) in tabslist" :key="index">
                      <div class="box" :class="activeIndex==index?'active':'box'">
                          <p>{{item.tabName}}</p>
                      </div>
                    </view>
                </scroll-view>
            </div>
            <div class="rightTab">
                <scroll-view scroll-y="true"  class="tab_panel">
                    <i-row i-class="rowWrap" v-if="activeIndex==0" v-for="(item,idx) in contentList" :key="idx">
                      <i-col span="6">{{item.plate_number}}</i-col>
                      <i-col span="6">{{item.money}}元</i-col>
                      <i-col span="8">{{item.timer}}</i-col>
                      <i-col span="4" @click="getRevoke(idx)">
                        <i-con i-class="undo" type="undo" size="20" color="#585858"></i-con>
                      </i-col>
                    </i-row>
                </scroll-view>
            </div>
      </div>
      <!-- <div class="bottom">
        合计：&nbsp;1502.88元
      </div> -->
    </div>
    <div class="show" v-if="state==1">
      <div class="box">
        <h3>
          <i class="iconfont icon-neirongweikong" style="font-size:130rpx;color:#5d5d5d;"></i>
        </h3>
        <p>您还没有相关记录呢~</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      state: 0,
      current: "",
      activeIndex: "",
      time: "2018",
      index: 0,
      array: ["2018", "2019", "2020"],
      list: [
        {
          id: 0,
          title: "全部"
        },
        {
          id: 1,
          title: "1月"
        },
        {
          id: 2,
          title: "2月"
        },
        {
          id: 3,
          title: "3月"
        },
        {
          id: 4,
          title: "4月"
        },
        {
          id: 5,
          title: "5月"
        },
        {
          id: 6,
          title: "6月"
        },
        {
          id: 7,
          title: "7月"
        },
        {
          id: 8,
          title: "8月"
        },
        {
          id: 9,
          title: "9月"
        },
        {
          id: 10,
          title: "10月"
        },
        {
          id: 11,
          title: "11月"
        },
        {
          id: 12,
          title: "12月"
        }
      ],
      tabslist: [
        {
          tabName: "审核中"
        },
        {
          tabName: "已完成"
        },
        {
          tabName: "被拒绝"
        },
        {
          tabName: "已撤销"
        }
      ],
      contentList: [
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        },
        {
          plate_number: "晋E 1234教",
          money: 150.21,
          timer: "07-25 10:21"
        }
      ]
    };
  },
  methods: {
    bindDateChange(e) {
      this.time = e.mp.detail.value;
    },
    handleChangeScroll(detail) {
      console.log(detail);
      this.current = detail.mp.detail.key;
    },
    // 左侧tab
    changeTab(e) {
      this.activeIndex = e;
    },
    // 撤销
    getRevoke(idx) {
      // console.log(idx);
      this.contentList.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .boxWrap {
    .header {
      width: 100%;
      height: auto;
      overflow: hidden;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      .left {
        padding: 30rpx 0;
        text-align: center;
        border-right: 1rpx solid #d3d3d3;
        p {
          font-size: 24rpx;
          color: #666666;
        }
      }
      .right {
        .itabs {
          height: 50px !important;
          line-height: 50px !important;
          .itab {
            font-size: 24rpx !important;
            color: #666666 !important;
          }
          .active {
            font-size: 24rpx !important;
            color: #f66f8d !important;
          }
        }
      }
    }
    .centerWrap {
      width: 100%;
      height: 100%;
      margin-top: 30rpx;
      overflow: hidden;
      display: flex;
      .leftTab {
        width: 15%;
        height: 1000rpx;
        overflow: scroll;
        position: fixed;
        top: 120rpx;
        left: 0;
        .left_tabbar_list {
          color: #7c7c7c;
          font-size: 26rpx;
          width: 100%;
          text-align: center;
          border-bottom: 1rpx solid #fff;
          .left_tabbar_item {
            font-size: 20rpx;
            background: #f2f2f2;
            .box {
              width: 66%;
              margin: 0 auto;
              padding: 40rpx 0;
              border-bottom: 1rpx solid #bfbfbf;
            }
            .active {
              border-bottom: none;
            }
          }
          .active {
            background: #fff;
            color: #e6517b;
            transition: all 0.5s;
            animation: show 0.5s;
          }
        }
      }
      .rightTab {
        width: 85%;
        height: 1000rpx;
        overflow: scroll;
        padding-bottom: 100rpx;
        background: #fff;
        position: fixed;
        top: 120rpx;
        left: 56px;
        .tab_panel {
          display: inline-block;
          white-space: nowrap;
          .rowWrap {
            margin-left: 30rpx;
            padding: 30rpx 0;
            border-bottom: 1rpx solid #bfbfbf;
            font-size: 24rpx;
            color: #5e5e5e;
            text-align: center;
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: auto;
      padding: 35rpx 0;
      overflow: hidden;
      color: #fff;
      font-size: 28rpx;
      text-align: center;
      background: -webkit-linear-gradient(left, #f41856, #e65179);
      position: fixed;
      bottom: 0;
      left: 0;
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
        padding-bottom: 30rpx;
      }
      p {
        color: #999999;
        font-size: 28rpx;
      }
    }
  }
}
</style>

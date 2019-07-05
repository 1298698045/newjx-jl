<template>
  <div class="wrap">
    <!-- 审核 -->
    <div class="boxWrap" v-if="state==0">
      <div class="header">
        <div class="tab" v-for="(item,index) in list" :key="index" @click="tabSwitch(index)">
          <p :class="{active:show==index}">{{item}}</p>
          <h3 v-if="show==index"></h3>
        </div>
      </div>
      <div class="center">
        <!-- 待审核 -->
        <div class="container" v-for="(item,index) in contList" :key="index" v-if="show==0">
          <i-row i-class="topBox">
            <i-col span="4">
              <p>{{item.name}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.plate}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.timer}}</p>
            </i-col>
          </i-row>
          <ul>
            <li  v-for="(i,idx) in item.parts" :key="idx">
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12"><span>{{i.one_parts}}</span>元</i-col>
            </li>
            <!-- <li> 
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12">元</i-col>
            </li>
            <li>
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12">元</i-col>
            </li>
            <li>
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12">元</i-col>
            </li>
            <li>
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12">元</i-col>
            </li> -->
          </ul>
          <i-row i-class="btnBox" v-if="item.status == 0">
            <i-col i-class="concat" span="9">
              <p>合计：{{item.contMoney}}元</p>
            </i-col>
            <i-col  i-class="icol" span="5" @click="getCall()">
              <i-button i-class="ibtn">电话</i-button>
            </i-col>
            <i-col  i-class="icol" span="5" @click="getRefuse()">
              <i-button i-class="ibtn">拒绝</i-button>
            </i-col>
            <i-col  i-class="icol" span="5" @click="getAgree()">
              <i-button i-class="ibtn">同意</i-button>
            </i-col>
          </i-row>
          <div class="btnActive"  v-if="item.status == 1">
            <p>合计：{{item.contMoney}}元</p>
          </div>
        </div>
        <!-- 已完成 -->
        <div class="container" v-for="(item,index) in contList" :key="index" v-if="show==1">
          <i-row i-class="topBox">
            <i-col span="4">
              <p>{{item.name}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.plate}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.timer}}</p>
            </i-col>
          </i-row>
          <ul>
            <li  v-for="(i,idx) in item.parts" :key="idx">
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12"><span>{{i.one_parts}}</span>元</i-col>
            </li>
          </ul>
          <div class="btnActive"  v-if="item.status == 0">
            <p>合计：{{item.contMoney}}元</p>
          </div>
        </div>
        <!-- 已拒绝 -->
        <div class="container" v-for="(item,index) in contList" :key="index" v-if="show==2">
          <i-row i-class="topBox">
            <i-col span="4">
              <p>{{item.name}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.plate}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.timer}}</p>
            </i-col>
          </i-row>
          <ul>
            <li  v-for="(i,idx) in item.parts" :key="idx">
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12"><span>{{i.one_parts}}</span>元</i-col>
            </li>
          </ul>
          <div class="btnActive"  v-if="item.status == 0">
            <p>合计：{{item.contMoney}}元</p>
          </div>
        </div>
        <!-- 已撤销 -->
        <div class="container" v-for="(item,index) in contList" :key="index" v-if="show==3">
          <i-row i-class="topBox">
            <i-col span="4">
              <p>{{item.name}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.plate}}</p>
            </i-col>
            <i-col span="10">
              <p>{{item.timer}}</p>
            </i-col>
          </i-row>
          <ul>
            <li  v-for="(i,idx) in item.parts" :key="idx">
              <i-col i-class="oneCol" span="12">
                <p>维修部位</p>
              </i-col>
              <i-col i-class="towCol" span="12"><span>{{i.one_parts}}</span>元</i-col>
            </li>
          </ul>
          <div class="btnActive"  v-if="item.status == 0">
            <p>合计：{{item.contMoney}}元</p>
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
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      state:0,
      list: ["待审核", "已完成", "已拒绝", "已撤销"],
      show: 0,
      contList: [
        {
          status: 0,
          name: "杨修远",
          plate: "晋A0000教",
          timer: "2018-07-28 10:25",
          parts: [
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            }
          ],
          contMoney: "2210.23"
        },
        {
          status: 0,
          name: "杨修远",
          plate: "晋A0000教",
          timer: "2018-07-28 10:25",
          parts: [
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            },
            {
              one_parts: "100"
            }
          ],
          contMoney: "2210.23"
        }
      ]
    };
  },
  methods: {
    tabSwitch(index) {
      this.show = index;
    },
    // 电话
    getCall() {
      wx.makePhoneCall({
        phoneNumber: "400-8888-8888",
        success: function() {
          console.log("拨打电话成功！");
        },
        fail: function() {
          console.log("拨打电话失败！");
        }
      });
    },
    // 拒绝
    getRefuse() {},
    // 同意
    getAgree() {}
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .boxWrap{
    .header {
      width: 100%;
      height: auto;
      overflow: hidden;
      background: #fff;
      display: flex;
      position: fixed;
      top:0;
      left:0;
      .tab {
        flex: 1;
        text-align: center;
        font-size: 24rpx;
        color: #666666;
        padding: 20rpx 0 5rpx 0;
        p {
          padding-bottom: 15rpx;
          border-right: 1rpx solid #ccc;
        }
        .active {
          color: #ef3064;
        }
        // p:last-child{
        //   border: none;
        // }
        h3 {
          width: 66rpx;
          height: 10rpx;
          background: #ef3064;
          border-radius: 10rpx;
          margin: 0 auto;
        }
      }
    }
    .center {
      width: 95%;
      height: 100%;
      margin: 80rpx auto;
      overflow: hidden;
      .container {
        width: 100%;
        height: auto;
        background: #fff;
        margin: 30rpx 0;
        border-radius: 15rpx;
        box-shadow:0 1px 6px rgba(0,0,0,.2);
        .topBox {
          font-size: 24rpx;
          text-align: center;
          color: #fff;
          padding: 20rpx 0;
          background: -webkit-linear-gradient(left, #f41856, #e65179) !important;
          border-top-left-radius: 15rpx;
          border-top-right-radius: 15rpx;
        }
        ul {
          width: 100%;
          height: auto;
          overflow: hidden;
          padding: 20rpx 15rpx;
          border-bottom: 1rpx solid #707382;
          li {
            width: 45%;
            height: auto;
            margin: 10rpx;
            // margin:0 auto;
            border: 1rpx solid #5e5e5e;
            border-radius: 10rpx;
            font-size: 24rpx;
            color: #666666;
            // margin: 20rpx 0;
            float: left;
            .oneCol {
              padding: 12rpx 12rpx;
              p {
                text-align: center;
                border-right: 1rpx solid #707382;
              }
            }
            .towCol {
              padding: 10rpx 10rpx;
              text-align: right;
              span {
                margin-right: 30rpx;
                color: #e65179;
              }
            }
          }
        }
        .btnBox {
          width: 100%;
          height: auto;
          overflow: hidden;
          background: #fff;
          .concat {
            text-align: center;
            color: #666666;
            padding: 10rpx 0;
            p {
              font-size: 24rpx;
              line-height: 80rpx;
              border-right: 1rpx solid #5e5e5e;
            }
          }
          .icol {
            margin: none !important;
            .ibtn {
              width: 123rpx;
              height: 60rpx !important;
              line-height: 60rpx !important;
              font-size: 24rpx !important;
              color: #fff !important;
              background: -webkit-linear-gradient(
                left,
                #f41856,
                #e65179
              ) !important;
              border-radius: 10rpx;
            }
          }
        }
        .btnActive {
          text-align: center;
          p {
            padding: 30rpx 0;
            font-size: 24rpx;
            color: #5e5e5e;
          }
        }
      }
    }
  }
  .show{
    width: 100%;
    height: 100%;
    .box{
      width: 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      h3{
        padding-bottom: 30rpx;
      }
      p{
        color:#999999;
        font-size: 28rpx;
      }
    }
  }
}
</style>

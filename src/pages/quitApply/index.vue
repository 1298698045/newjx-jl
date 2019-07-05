<template>
  <div class="wrap">
    <!-- 离职申请 -->
    <div class="container">
      <div class="header">
         <picker class="gasBox" mode="date" v-model="time" @change="bindPickerChange">
          <i-input i-class="inp" title="离职日期" :value="time"></i-input>
          <i-con i-class="icon" type="activity" size="24" color="#707480"></i-con>
        </picker>
      </div>
      <div class="center">
        <!-- <p>离职原因</p> -->
        <i-input type="text" title="离职原因" disabled></i-input>
        <textarea class="text" name="textarea" v-model="text" id="" cols="30" rows="10" maxlength="1000" @change="onKeyTarea"></textarea>
      </div>
    </div>
    <div class="bottom">
      <i-button i-class="ibtn" @click="getSubmit">提&nbsp;&nbsp;交</i-button>
    </div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      time: "2018-09-30",
      text: ""
    };
  },
  methods: {
    bindPickerChange(e) {
      this.time = e.mp.detail.value;
    },
    onKeyTarea(e) {
      // console.log(e);
      this.text = e.mp.detail.value;
    },
    getSubmit() {
      console.log(this.time, this.text);
      wx.switchTab({
        url: "/pages/workbench/main"
      });
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .container {
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
    margin: 20rpx 0;
    .header {
      width: 100%;
      height: auto;
      overflow: hidden;
      .gasBox {
        position: relative;
        .inp {
          color: #3a3a3a;
        }
        .icon {
          position: absolute;
          top: 25%;
          right: 50rpx;
        }
      }
    }
    .center {
      // width: 100%;
      // margin-left: 30rpx;
      p {
        color: #989898;
        font-size: 28rpx;
        padding: 20rpx 0;
      }
      .text {
        // width: 100%;
        margin-left: 30rpx;
        font-size: 28rpx;
      }
    }
  }
  .bottom {
    width: 95%;
    height: auto;
    overflow: hidden;
    margin: 60rpx auto;
    .ibtn {
      color: #fff !important;
      background: -webkit-linear-gradient(left, #f31d59, #e84572) !important;
      border-radius: 40rpx !important;
    }
  }
}
</style>

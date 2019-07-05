<template>
  <div class="wrap">
    <i-panel title="个人信息" i-class="panel">
      <i-input i-class="inp" title="姓名:" :value="info.name" placeholder="请输入姓名" @change="changeName"></i-input>
      <i-input i-class="inp" title="职务:" :value="info.post" placeholder="请输入职务" @change="changePost"></i-input>
      <i-input i-class="inp" title="手机号:" :value="info.phone" placeholder="请输入手机号" @change="changePhone"></i-input>
      <i-input i-class="inp" title="驾校:" :value="info.school" placeholder="请输入驾校" @change="changeSchool"></i-input>
      <i-input i-class="inp" title="学车价格:" :value="info.carPrice" placeholder="请输入学车价格" @change="changeCarPrice"></i-input>
      <i-input i-class="inp" title="口号:" :value="info.slogan" placeholder="请输入口号" @change="changeSlogan"></i-input>
    </i-panel>
    <!-- <i-panel title="海报类型">
            <button style="text-align:center;font-size:30rpx;" @click="getGenerate">朋友圈招生海报</button>
    </i-panel>-->
    <view class="caption-wrap">
      <i-collapse name="123">
        <i-collapse-item :title="name" i-class="qwe" name="1" i-class-title="collName">
          <view
            slot="content"
            class="cons"
            style="overflow:auto;background:#fff;padding:10px;border-bottom:1rpx solid #efefef;"
          >
            <p
              class="bords"
              v-for="(item,index) in list"
              :key="index"
              @click="getGenerate(item)"
            >
              <span>{{item.name}}</span>
              <i-icon type="enter" size="20" style="float:right;"/>
            </p>
          </view>
        </i-collapse-item>
      </i-collapse>
    </view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        name: "赵小云",
        post: "经理",
        phone: "18867896789",
        school: "北京驾校",
        carPrice: "3680",
        slogan: "我要学车！！！"
      },
      name: "朋友圈招生海报",
      list: []
    };
  },
  onLoad() {
    this.getQuery();
  },
  computed: {
    getCount() {
      // return this.$store.state.count;
      return this.$store.getters.getC;
    }
  },
  methods: {
    getQuery() {
      const url = this.$api.postr.all;
      const data = {
        status: 1,
        clients:1
      };
      this.$httpWX
        .post({
          url: url,
          data: data
        })
        .then(res => {
          this.list = res.content;
        });
    },
    changeName(e) {
      this.info.name = e.target.detail.value;
    },
    changePost(e) {
      this.info.post = e.target.detail.value;
    },
    changePhone(e) {
      this.info.phone = e.target.detail.value;
    },
    changeSchool(e) {
      this.info.school = e.target.detail.value;
    },
    changeCarPrice(e) {
      this.info.carPrice = e.target.detail.value;
    },
    changeSlogan(e) {
      this.info.slogan = e.target.detail.value;
    },
    // 朋友圈招生海报
    getGenerate(item) {
      // this.$store.commit("inser");
      //   this.$store.dispatch("getInser");
      console.log(item);
      console.log(this.info);
      if (this.info.name == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入姓名!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else if (this.info.post == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入职务!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else if (this.info.phone == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入手机号!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else if (this.info.school == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入驾校!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else if (this.info.carPrice == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入学车价格!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else if (this.info.slogan == "") {
        wx.showLoading();
        wx.hideLoading();
        setTimeout(() => {
          wx.showToast({
            title: "请输入口号!",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000);
        }, 10);
      } else {
        console.log(this.info);
        wx.setStorageSync('content',this.info);
        wx.navigateTo({
          url: "/pages/friends/main?id=" + item.id
        });
      }
    }
  }
};
</script>
<style lang="scss">
.qwe {
  /* background:-webkit-linear-gradient(left, #F41856 , #E65179)!important; */
  background: #ff612c !important;
  font-size: 28rpx;
  margin: 0 20rpx;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  // padding:10rpx 0;
}
.panel {
  padding: 0 20rpx !important;
  .inp{
    color: #979797;
    font-size: 28rpx;
  }
}
.caption-wrap {
  margin-top: 20rpx;
}
.collName{
  display:block;
}
.bords{
  overflow:hidden;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #d2d2d2;
}
.bords:last-child{
  border-bottom:none;
}
</style>

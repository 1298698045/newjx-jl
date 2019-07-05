<template>
  <div class="wrap">
    <div
      class="content"
      :class="{active:num==index}"
      v-for="(item,index) in list"
      :key="index"
      @click="getSubmit(item,index)"
    >
      <div class="imgWrap">
        <img class="imgs" :src="'https://aplusyx.oss-cn-beijing.aliyuncs.com/'+item.url" alt>
      </div>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      num: 0
    };
  },
  onLoad(options) {
    console.log(wx.getStorageSync("content"));
    this.id = options.id;
    this.getQuery();
  },
  methods: {
    getQuery() {
      const url = this.$api.postr.list;
      const data = {
        posterId: this.id
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
    getSubmit(item, index) {
      console.log(item.url);
      wx.setStorageSync("imgs", item.url);
      this.num = index;
      wx.navigateTo({
        url: "/pages/wimg/main"
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
  display: flex;
  // justify-content:space-between;
  flex-wrap:wrap;
  padding: 20rpx;
  .content {
    width: 110px;
    height: 168px;
    margin: 10rpx;
    box-sizing: border-box;
    border-radius: 6px;
    position: relative;
    .imgWrap {
      width: 100%;
      height: 100%;
      .imgs {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
    p {
      position: absolute;
      bottom: 0;
      background:rgba(0,0,0,.25);
      width: 100%;
      height: 24px;
      line-height: 24px;
      color: #fff;
      font-size: 28rpx;
      text-align: center;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
    }
  }
  .content.active {
    border: 1rpx solid red;
    box-sizing: border-box;
  }
}
</style>


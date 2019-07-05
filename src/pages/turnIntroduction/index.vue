<template>
  <div class="wrap">
    <div class="content">
      <i-row i-class="row" v-for="(item,index) in list" :key="index">
        <i-col span="2" @click="getDelate(item)">
          <i-icon type="delete_fill" size="22" />
        </i-col>
        <i-col span="6">
          <h3 style="margin-top:6rpx;">{{item.name}}</h3>
        </i-col>
        <i-col span="8">
          <h3 style="margin-top:6rpx;">{{item.gender}}</h3>
        </i-col>
        <i-col span="8">
          <p @click="getAdd(item)">添加至我的转介绍</p>
        </i-col>
      </i-row>
    </div>
    <div class="add" @click="getAddRouter">
      <i-icon type="add" size="40" color="#fff"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        id:"",
        max:[],
        name:"",
      list: [
        // {
        //   name: "马经纬",
        //   sex: "男",
        //   cont: "添加至我的转介绍"
        // }
      ]
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.name = options.name;
    // this.$httpWX
    //   .post({
    //     url: "/v1/aplus-jx-schooladministration/coachReferrals/queryAll",
    //     data: {
    //       coachId: wx.getStorageSync("userId"),
    //       referralsId:options.id
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.list = res.content;
    //     this.list.forEach(item=>{
    //         this.max = item.tags.split(',')
    //     })
    //   });
    this.getQuery();
    wx.setNavigationBarTitle({
      title: options.name+'的转介绍'
    });
  },
  methods:{
    getQuery(){
      this.$httpWX
      .post({
        url: "/v1/aplus-jx-schooladministration/coachReferrals/queryAll",
        data: {
          coachId: wx.getStorageSync("userId"),
          referralsId:this.id
        }
      })
      .then(res => {
        console.log(res);
        this.list = res.content;
        this.list.forEach(item=>{
            this.max = item.tags.split(',')
        })
      });
    },
      getAdd(item,v){
          console.log(this.max);
          this.$httpWX.post({
              url:"/v1/aplus-jx-schooladministration/coachReferrals/save",
              data:{
                  coachId:wx.getStorageSync('userId'),
                  name:item.name,
                  gender:item.gender,
                  phone:item.phone,
                  tags:this.max.join()
              }
          }).then(res=>{
              console.log(res);
              if(res.status.code == '10'){
                  wx.navigateTo({
                      url:"/pages/myIntroduce/main"
                  })
              }
          })
      },
      getDelate(item){
        console.log(item);
        this.$httpWX
        .DELETE({
          url:
            "/v1/aplus-jx-schooladministration/coachReferrals/remove/" +
            item.id,
          data: {}
        })
        .then(res => {
          wx.showToast({
            title: res.status.message,
            icon: 'success',
            duration: 2000
          })
          this.getQuery();
        });
      },
      getAddRouter(){
          wx.navigateTo({
              url:"/pages/lookupStudent/main?id="+this.id+ "&name=" + this.name
          })
      }
  },
     /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.getQuery();
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
  height: 1000%;
  .content {
    width: 92%;
    margin: 20rpx auto;
    background: #fff;
    border-radius: 20rpx;
    .row {
      font-size: 24rpx;
      padding: 30rpx;
      p {
        width: 220rpx;
        padding: 10rpx 0;
        color: #fff;
        background: #ff3f00;
        text-align: center;
        border-radius: 10rpx;
      }
    }
  }
  .add {
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50%;
    background: #ff3f00;
    text-align: center;
    position: absolute;
    bottom: 50rpx;
    right: 50rpx;
  }
}
</style>

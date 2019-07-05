<template>
  <div class="wrap">
    <div class="header">
      <i-row>
        <i-col span="18">
          <i-input i-class="inp" v-model="phone" type="number" placeholder="请输入学员手机号" @change="getChange"></i-input>
        </i-col>
        <i-col span="6">
          <p @click="getShow">查看</p>
        </i-col>
      </i-row>
    </div>
    <div class="showContent" v-if="isShow">
      <i-row v-if="information!=null">
        <i-col span="6">{{information.name}}</i-col>
        <i-col span="3">{{information.sex}}</i-col>
        <i-col span="6" style="text-align:left;">{{information.telphone}}</i-col>
      </i-row>
      <i-button i-class="btn" @click="getAdd">添 加</i-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      isShow: false,
      information:{
          name:"",
          sex:"",
          telphone:""
      },
      cont:"",
      ident:"" ,//标识
      referralsId:"",
      name:""
    };
  },
  onShow(){
    this.phone = '';
    this.isShow = false;
  },
  onLoad(options){
    console.log(options.bs);
    this.ident = options.bs;
    this.name = options.name;
    this.referralsId = options.id;

  },
  methods: {
    getChange(e){
      // console.log(e.mp.detail.detail.value);
      this.phone = e.mp.detail.detail.value;
    },
    getShow() {
        this.$httpWX.get({
            url:"/v1/aplus-jx-study/student/getStudentBaseInfoByPhone/"+this.phone,
            data:{

            }
        }).then(res=>{
            console.log(res);
            this.information = res.content;
            if(res.status.code*1 === 10){
              this.isShow = true;
            }
        })
    },
    // 转介绍总数
    getCont(){
      this.$httpWX.get({
        url:"/v1/aplus-jx-schooladministration/coachReferrals/getReferralsCount/" + wx.getStorageSync('userId'),
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.cont = res.content;
        wx.setStorageSync('cont',this.cont);
      })
    },
    getAdd(){
        this.$httpWX.post({
            url:"/v1/aplus-jx-schooladministration/coachReferrals/save",
            data:{
                coachId:wx.getStorageSync('userId'),
                name:this.information.name,
                gender:this.information.sex,
                phone:this.information.telphone,
                tags:"",
                referralsId:this.referralsId
            }
        }).then(res=>{
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
          if(res.status.code=='20'){
            return false;
          }else {
            this.getCont();
            if(this.ident == 'bs1'){
              wx.navigateTo({
                url: '/pages/myIntroduce/main'
              })
            }else if(this.referralsId){
              wx.navigateTo({
                url: '/pages/turnIntroduction/main?id='+this.referralsId+ "&name=" + this.name
              })
            }
          }
        })
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  .header {
    width: 90%;
    margin: 50rpx auto;
    .inp {
      border-top-left-radius: 20rpx;
      border-bottom-left-radius: 20rpx;
    }
    p {
      width: 170rpx;
      height: 95rpx;
      line-height: 95rpx;
      background: #ff3f00;
      text-align: center;
      font-size: 24rpx;
      color: #fff;
      margin-left: 20rpx;
      border-top-right-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
    }
  }
  .showContent {
    width: 95%;
    height: auto;
    margin: 0 auto;
    border-top: 1rpx solid #8b8b8b;
    font-size: 28rpx;
    padding: 50rpx;
    font-weight: bold;
    .btn {
      width: 600rpx !important;
      height: 100rpx !important;
      line-height: 100rpx !important;
      margin: 200rpx auto;
      text-align: center !important;
      color: #fff !important;
      font-size: 30rpx !important;
      background: #ff3f00 !important;
      border-radius: 30px !important;
    }
  }
}
</style>

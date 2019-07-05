<template>
  <div class="wrap">
    <div class="header">
      <img src="/static/images/head.png" alt>
    </div>
    <div class="content">
      <div class="boxWrap">
        <van-field
          :value="phone"
          required
          type="number"
          maxlength="11"
          clearable
          label="手机号："
          placeholder="请输入手机号"
          @change="onChangePhone"
        />
        <van-field
          :value="password"
          required
          center
          clearable
          label="密码："
          password
          placeholder="请输入密码"
          use-button-slot
          @change="onChangeCode"
        ></van-field>
      </div>
      <div class="btnWrap">
        <button class="quitBtn" @click="getVerification">登录</button>
        <p @click="getRouter">
          <span>忘记密码？</span>
        </p>
      </div>
    </div>
    <i-modal i-class="modal" :visible="isModal" :show-cancel="false" @ok="getOk">
      <div>
        <i-icon type="success_fill" size="80" color="#7ed321"/>
      </div>
      <h3>认证成功</h3>
      <p>点击开始设置密码</p>
    </i-modal>
  </div>
</template>
<script>
import { setInterval } from "timers";

export default {
  data() {
    return {
      phone: "",
      password: "",
      isModal: false
    };
  },
  onLoad(){
    let phone = wx.getStorageSync('phone');
    let password = wx.getStorageSync('password');
    if(phone){
      this.phone = phone;
    }
    if(password){
      this.password = password;
    }
  },
  methods: {
    onChangePhone(e) {
      this.phone = e.mp.detail;
    },
    onChangeCode(e) {
      this.password = e.mp.detail;
    },
    getVerification() {
      wx.setStorageSync("token", "");
      wx.setStorageSync("schoolId", "");
      wx.setStorageSync("userId", "");
      this.$httpWX
        .post({
          url: this.$api.login.authentication,
          data: {
            loginName: this.phone,
            password: this.password,
            clientType: "coach_app"
          }
        })
        .then(res => {
          // console.log(this.phone+','+this.password)
          console.log(res);
          wx.showToast({
            title: res.status.message,
            icon: "none",
            duration: 2000,
            mask: true
          });
          wx.setStorageSync("token", res.content.token);
          wx.setStorageSync("schoolId", res.content.schoolId);
          wx.setStorageSync("userId", res.content.userId);
          wx.setStorageSync("userName", res.content.userName);
          this.userId = res.content.userId;
          wx.setStorageSync("id", res.content.id);
          // wx.setStorageSync('identity',res.content.identity);
          if (res.status.code * 1 === 10) {
            wx.setStorageSync("phone", this.phone);
            wx.setStorageSync("password", this.password);
            this.getDetail();
          }
        });
      // this.isModal = true;
    },
     // 教练详情
    getDetail(){
      this.$httpWX.get({
        url:this.$api.detail.queryById+'/'+this.userId,
        data:{
          
        }
      }).then(res=>{
        let status = res.content.status;
        if(status=="YGZT03"){
          wx.showLoading();
          wx.hideLoading();
          setTimeout( () => {
            wx.showToast({
              title: "教练已离职，不能登录！",
              icon: "none",
            });
            setTimeout( () =>{
              wx.hideToast();  
            },2000)
          },10);
          return false;
        }else {
          if(wx.getStorageSync('code')){
            wx.switchTab({
              url: '/pages/timetable/main'
            })
          }else{
            wx.reLaunch({
              url:"/pages/setupPass/main"
            })
          }
        }
      })
    },
    // 忘记密码
    getRouter(){
        const url = '/pages/newLogin/main';
        wx.navigateTo({url:url});
    },
    getOk() {
      this.isModal = false;
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/assets/login.scss";
</style>

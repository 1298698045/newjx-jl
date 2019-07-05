<template>
  <div class="wrap">
    <!-- 修改密码 -->
    <div class="box">
      <i-input title="新密码" v-model="newPassword" type="password" placeholder="至少6位，数字和字母组合" v-on:change="newBindPassword"></i-input>
      <i-input title="确认密码" v-model="password" type="password" placeholder="至少6位，数字和字母组合" v-on:change="confirmPassword"></i-input>
    </div>
    <div class="btn">
      <i-button i-class="submit" @click="getSubmit">保&nbsp;&nbsp;存</i-button>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return {
        newPassword:"",
        password:""
      }
    },
    methods:{
      // 新密码
      newBindPassword(val){
        this.newPassword = val.mp.detail.detail.value
      },
      // 确认密码
      confirmPassword(val){
        this.password = val.mp.detail.detail.value
      },
      // 保存
      getSubmit(){
        if(this.newPassword == "" || this.password == ""){
          wx.showToast({
            title:"请输入密码",
            icono:"success",
            duration:2000
          })
          return false;
        }else if(this.newPassword.length < 6 || this.password.length < 6){
          wx.showToast({
            title:"密码过于简单",
            icono:"success",
            duration:2000
          })
          return false;
        }else if(this.password != this.newPassword){
          wx.showToast({
            title:"密码输入不一致",
            icono:"success",
            duration:2000
          })
          return false;
        }else{
          this.$httpWX.post({
            url:"/v1/aplus-jx-public/universal/user/updatePwd",
            data:{
              password:this.newPassword,
              confirmPwd:this.password,
              id:wx.getStorageSync('id')
              // token:wx.getStorageSync('token'),
            }
          }).then(res=>{
            console.log(res);
            wx.setStorageSync('password',this.password);
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
            wx.switchTab({
              url: '/pages/timetable/main'
            })
            wx.setStorageSync('code','1');
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .wrap{
    width: 100%;
    height: 100%;
    .box{
      width:90%;
      height: auto;
      overflow: hidden;
      margin: 50rpx auto;
      background: #fff;
      border-radius: 20rpx;
    }
    .btn{
      width: 95%;
      margin: 150rpx auto;
      .submit{
        width: 70%;
        margin: 0 auto;
        color:#fff!important;
        // background: -webkit-linear-gradient(left, #f41856, #e65179) !important;
        background: #ff3f00!important;
        border-radius: 40rpx;
      }
    }
  }
</style>

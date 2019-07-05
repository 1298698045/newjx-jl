<template>
<!-- http://testyx.aplusx.com/wximg/jiaxiao/back.jpg -->
  <div class="outDiv" style="background:url('http://yx.aplusx.com/wximg/jiaxiao/back.jpg')no-repeat;background-size:100% 100%;">
    <form>
      <view class='login-from'>
        <view style="width:188px;height:48px;margin:0 auto;"> 
          <image style="width:100%;height:100%;" src="/static/images/logo.png"></image>
        </view>
        <view class='inputBox'>
            <view class='inputC'>
              <!-- <label class="labelText"absolute>手机号</label> -->
               <i-input title="手机号" v-model = "phone" autofocus placeholder="请输入手机号" type="number" @change="phoneChange"/>
               <i-icon type="close" i-class="clearicon" @click="getDelete" />
            </view>
            <view class='inputC'>
              <!-- <label class="labelText">密&nbsp&nbsp&nbsp码</label> -->
              <i-input title="密码" v-model="password" placeholder="请输入密码" v-if="isShow" type="password" @change="psdChange"/>
              <i-input title="密码" v-model="password" placeholder="请输入密码" v-if="show" type="" @change="psdChange"/>
              <i-icon i-class="clearicon" type="browse_fill" v-if="isShow" size="22" color="#d6d6d6" @click="getIsShow"></i-icon>
              <i-icon i-class="clearicon" type="browse_fill" v-if="show" size="22" color="#5e5e5e" @click="getIsShow"></i-icon>
            </view>
        </view>
        <!--按钮-->
        <view><button class="loginBtn" type="" data-login="home-boss" @click="formSubmit">登录</button></view>
        <!-- <view style="text-align:right;margin-right:15px;font-size:12px;"><a href="/pages/changePassword/main">忘记密码</a></view> -->
        <view class="cont">
          <!-- <p class="pbtn">
            <i-icon type="right" size="20" color="black" />
          </p> -->
          <!-- <p class="size">我已阅读并同意<span style="border-bottom:1rpx solid #ff3f00;">《服务条款》</span>和<span style="border-bottom:1rpx solid #ff3f00;">《隐私政策》</span></p>   -->
        </view>
      </view>
    </form>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: [],
      phone: '',
      code:"",
      password: '',
      psdflag:true,
      userId:"",
      isShow:true,
      show:false
    }
  },

  created () {
   
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
  methods:{
    phoneChange(v) {
      console.log(v)
      this.phone = v.target.detail.value;
    },
    psdChange(v) {
      this.password = v.target.detail.value;
    },
    // 删除手机号
    getDelete(){
      this.phone = "";
    },
    // 显示密码
    getIsShow(){
      this.isShow = !this.isShow;
      this.show = !this.show;
    },
    formSubmit(){
      // if(this.phone && this.password){
      //   wx.setStorageSync('phone',this.phone);
      //   wx.setStorageSync('password',this.password);
      // }
          wx.setStorageSync('token','');
          wx.setStorageSync('schoolId','');
          wx.setStorageSync('userId','');
          this.$httpWX
        .post({
          url: "/v1/aplus-jx-public/universal/user/authentication",
          data: {
            loginName: this.phone,
            password: this.password,
            clientType:"coach_app"
          }
        })
        .then(res => {
          // console.log(this.phone+','+this.password)
          console.log(res);
          wx.showToast({
              title: res.status.message,
              icon: 'none',
              duration: 1000,
              mask:true
          })
          wx.setStorageSync('token',res.content.token);
          wx.setStorageSync('schoolId',res.content.schoolId);
          wx.setStorageSync('userId',res.content.userId);
          wx.setStorageSync('userName',res.content.userName)
          this.userId = res.content.userId;
          wx.setStorageSync('id',res.content.id);
          // wx.setStorageSync('identity',res.content.identity);
          if (res.status.code * 1 === 10) {
            wx.setStorageSync('phone',this.phone);
            wx.setStorageSync('password',this.password);
            this.getDetail();
          }
          
        });
    },
    // 教练详情
    getDetail(){
      this.$httpWX.get({
        url:"/v1/aplus-jx-schooladministration/employee/queryById/"+this.userId,
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
              url:"/pages/changePassword/main"
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
page{
  height: 100%;
}
 
.phcolor{
    color:#eee;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding-top:45px;
  /* padding: 0 15px; */
} 
 .homeTitle{
   margin-top: 1px;
   height: 40px;
   line-height: 40px;
   text-align: center;
   width: 100%;
   background-color: #424b61;
   color: #fff;
   font-size: 16px;
 }
/*表单内容*/
.login-from {
  flex: auto;
  height:100%;
  width: 100%;
}
 
.inputView {
  background-color: #fff;
  line-height: 44px;
  width: 100%;
}
/*输入框*/
.nameImage, .keyImage {
  margin-left: 22px;
  width: 14px;
  height: 14px
}
 
.loginLab {
  position:absolute;
  color: #545454;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  padding-left: 15px;
}
.checkNum{
  padding-left:65px;
  padding-right: 0;
  display: block;
  height: 35px;
  margin-top: 11px;
  color: #cccccc;
  font-size: 14px;
  background-color: #f2f2f2;
}
/*按钮*/

.loginBtn {
  /* width: 80%; */
  /* margin: 25px;  */
  width:58%;
  margin-top: 80px;
  margin-bottom: 30px;
  background-color:#ff3f00;
  color:#fff;
  border-radius:42rpx;
}
.codebtn{
  position: absolute;
  right: 15px;
   background-color:rgb(247, 105, 104);
   color: #fff;
   margin-left: 1px;
   height: 40px;
   line-height: 40px;
}
.inputBox{
  margin-top: 20px;
  padding-left: 15px;
  background: #fff;
  position: relative;
  border-radius:6px;
  /* margin:15px; */
  margin:45px 30px 30px 30px;
  box-shadow:0 1px 6px rgba(0,0,0,.2);
}
.inputC{
  display: flex;
  position:relative;
}
.inputText{
  display: block;
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-left: 15px;
}
.labelText{
  width:80px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}
.labelBtn{
  background: rgb(247, 105, 104);
  color: white;
}
.iconfont{
  font-size: 24px;
  color: #424b61;
  position:absolute;
  right:15px;
  height:40px;
  line-height:40px;
  z-index: 99;
}
.iconviewed{
  color:#eee;
}
.clearicon{
  line-height:20px;
  position:absolute;
  top:50%;
  transform:translatey(-50%);
  text-align:center;

}
.cont{
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  .size{
    float: left;
    font-size: 24rpx;
    color:#fff;
    margin-top: 10rpx;
    margin-left: 20rpx;
    span{
      color: #ff3f00;
    }
  }
}
.cont .pbtn{
  width: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 50%;
  background: #ff3f00;
  text-align: center;
  float: left;
}
</style>

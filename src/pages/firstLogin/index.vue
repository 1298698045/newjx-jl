<template>
  <div class="outDiv">
    <form>
      <view class='login-from'>
        <view style="text-align:center;margin-top:20px;"> 
          <image style="width: 150px; height: 80px;" src="/static/images/logo.png"></image>
        </view>
        <view class='inputBox'>
            <view class='inputC'>
              <!-- <label class="labelText"absolute>手机号</label> -->
               <i-input title="身份证" v-model = "code" autofocus placeholder="身份证号" @change="changeCode"/>
               <i-icon type="close" i-class="clearicon" />
            </view>
            <view class='inputC'>
              <!-- <label class="labelText"absolute>手机号</label> -->
               <i-input title="手机号" v-model = "phone" autofocus placeholder="手机号" type="number" @change="changePhone"/>
               <i-icon type="close" i-class="clearicon" />
            </view>
            <view class='inputC'>
              <!-- <label class="labelText">密&nbsp&nbsp&nbsp码</label> -->
              <i-input title="密码" v-model="password" placeholder="密码" type="password" @change="changePsd"/>
            </view>
        </view>
        <!--按钮-->
        <view><button class="loginBtn" type="" data-login="home-boss" @click="formSubmit">认证</button></view>
        <view style="text-align:center;font-size:12px;"><i-icon type="success" size="14" color="#f41856"/>我已阅读并同意《爱加教练用户协议》</view>
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
      psdflag:true
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  methods:{
    changeCode(event){
      this.code = event.target.detail.value;
    },
    changePhone(event){
      this.phone = event.target.detail.value;
    },
    changePsd(event){
      this.password = event.target.detail.value;
    },
    formSubmit(){
      console.log(this.password);
      console.log(this.phone);
      wx.redirectTo({
        url: '/pages/login/main'
      })
    }
  }
}
</script>

<style>
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
.loginBtnView {
  width: 100%;
  height: auto;
  background-color: #f41856;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}
 
.loginBtn {
  /* width: 80%; */
  margin: 25px;
  background-color:#f41856;
  color:#fff;
  border-radius:21px;
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
  margin:15px;
  box-shadow:0 1px 6px rgba(0,0,0,.2);
}
.inputC{
  display: flex;
  position:relative;
}
/*.inputBox>.inputC:nth-child(2){
  border-top: 1px solid #cccccc;
}*/
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
</style>

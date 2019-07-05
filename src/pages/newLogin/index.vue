<template>
    <div class="wrap">
        <div class="header">
            <img src="/static/images/head.png" alt="">
        </div>
        <div class="content">
            <div class="boxWrap">
                <van-field
                    :value="phone"
                    required
                    type="number"
                    maxlength=11
                    clearable
                    title-width="60px"
                    label="手机号："
                    placeholder="请输入后台系统登记的手机号"
                    @change="onChangePhone"
                />
                 <van-field
                    :value="code"
                    required
                    center
                    clearable
                    title-width="60px"
                    label="验证码："
                    placeholder="请输入短信验证码"
                    use-button-slot
                    @change="onChangeCode"
                >
                    <van-button v-if="house1" custom-class="btn" slot="button" size="small" @tap="getCode">获取验证码</van-button>
                    <van-button v-if="house2" custom-class="btn active" slot="button" size="small"> <span>{{second}}s</span>重新获取</van-button>
                </van-field>
            </div>
            <div class="btnWrap">
                <button class="quitBtn" @click="getVerification">验证</button>
                <p>
                    <span @click="routeLogin">已有账号，直接登录</span>
                </p>
            </div>
        </div>
        <i-modal i-class="modal" :visible="isModal" :show-cancel="false" @ok="getOk">
            <div>
                <i-icon type="success_fill" size="80" color="#7ed321" />
            </div>
            <h3>认证成功</h3>
            <p>点击开始设置密码</p>
        </i-modal>
    </div>
</template>
<script>
import { setInterval, setTimeout } from 'timers';
export default {
    data(){
        return {
            phone:"",
            code:"",
            time:"获取验证码",
            isClick:  true,
            interval:null,
            isModal:false,
            second: 61,
            house1: true,
            house2:false
        }
    },
    methods: {
        getCode(){
            if(this.phone == ''){
                wx.showToast({
                    title: '请输入手机号',
                    icon: 'success',
                    duration: 2000
                })
            }else if(this.phone.length!=11){
                wx.showToast({
                    title: '手机号输入有误',
                    icon: 'success',
                    duration: 2000
                })
            }else {
                this.$httpWX.post({
                        url:this.$api.login.send,
                        data:{
                            mobiles:[this.phone],
                            template_id:"COACH"
                        }
                }).then(res=>{
                    console.log(res);
                    if(res.status.code * 1 === 10){
                        this.gainCode();
                    }else {
                        wx.showToast({
                            title: res.status.message,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            }
        },
        gainCode(){
            // let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            // let phone = this.phone;
            // if(!(telStr.test(phone))){
            //     console.log('手机号码不规范')
            // }else {
            //     console.log('校验成功');
                var that = this;
                var second = this.second;
                if(second == 0){
                    this.second = 61;
                    this.house1 = true;
                    this.house2 = false;
                    return ;
                }
                var time  = setTimeout(()=>{
                    this.second--;
                    this.house1 = false,
                    this.house2 = true;
                    this.gainCode();
                },1000)
            // }
        },
        onChangePhone(e){
            this.phone = e.mp.detail;
        },
        onChangeCode(e){
            this.code = e.mp.detail;
        },
        // 获取验证码
        // gainCode(){
        //     if(!this.isClick){
        //         return;
        //     }
        //     this.isClick = false;
        //     let times = 60;
        //     this.time = times+'s';
        //     let timer = setInterval(()=>{
        //         times--;
        //         this.time = times+'s';
        //         if(times<0){
        //             this.time = '重新获取';
        //             this.isClick = true;
        //             clearInterval(timer);
        //         }
        //     },1000)
        // },
        getVerification(){
           if(this.code == ''){
               return false;
           }else {
               this.$httpWX.post({
                   url:this.$api.login.verification,
                   data:{
                       mobiles:[this.phone],
                       captcha:this.code
                   }
               }).then(res=>{
                   if(res.status.code * 1 === 10){
                       wx.setStorageSync('id',res.content.id);
                       wx.setStorageSync('newInfo',JSON.stringify(res.content));
                       this.isModal = true;
                   }else {
                        wx.showToast({
                            title: res.status.message,
                            icon: 'success',
                            duration: 2000
                        })
                   }
               })
           }
        },
        getOk(){
            this.isModal = false;
            const url = "/pages/setupPass/main";
            wx.redirectTo({url:url});
        },
        // 已有账号直接登录
        routeLogin(){
            const url = '/pages/tLogin/main';
            wx.navigateTo({url:url});
        }
    },
}
</script>

<style lang="scss">
    @import '../../../static/assets/login.scss';
</style>

<template>
    <div class="wrap">
        <div class="content">
            <i-panel i-class="content">
                <form>
                    <div class="box">
                        <i-input title="姓名：" i-class="inp" v-model="form.name" autofocus placeholder="请输入姓名" @change="changeName"/>
                        <p class="clearicon">*</p>
                    </div>
                    <div class="box">
                        <i-input title="手机号：" i-class="inp" v-model="form.phone" autofocus placeholder="请输入手机号" type="number" maxlength="11" @change="changePhone"/>
                        <p class="clearicon">*</p>
                    </div>
                    <picker class="gasBox" v-model="index" :range="array" @change="bindPickerChange">
                        <i-input title="性别：" i-class="inp" :value="array[index]" disabled placeholder="请选择性别"></i-input>
                    </picker>
                    <i-input type="idcard" i-class="idcard" title="身份证号：" v-model="form.cardCode" autofocus placeholder="请输入身份证号" @change="changeIdNumber"/>
                    <!-- <i-input title="备注：" v-model="form.context" autofocus  placeholder="请输入备注"></i-input> -->
                    <div class="center">
                        <!-- <i-input type="text" title="备注：" disabled></i-input> -->
                        <textarea class="text" name="textarea" v-model="form.remark" id="" cols="20" rows="10" maxlength="1000" placeholder="这里添加备注......" @change="onKeyTarea"></textarea>
                    </div>
                </form>
            </i-panel>
        </div>
        <div class="footer">
            <button class="quitBtn" @click="getSubmit">提交</button>
        </div>
        <!-- <i-button i-class="ibtn" type="primary" @click="getSubmit">提交</i-button> -->
        <i-modal i-class="modal" :visible="showModal" :show-ok="false" :show-cancel="fasle">
            <i class="iconfont icon-cuo" style="color:#fb6809;font-size:60px;"></i>
            <p style="font-size: 18px;color: #4f4f4f;">预约失败</p>
            <p style="font-size: 14px;color: #888888;padding:20rpx 0;">{{message}}</p>
        </i-modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                name:"",
                phone:"",
                sex:"",
                cardCode:"",
                remark:""
            },
            index:"",
            array:['男','女'],
            mode:"",
            id:"",
            coachSign:"",
            showModal:false,
            message:""
        }
    },
    onLoad(options){
        this.mode = options.mode;
        this.id = options.id;
        if(options.id){
            wx.setNavigationBarTitle({title: `编辑线索`})
            this.getQuery();
        }else{
            wx.setNavigationBarTitle({title: `新增线索`})
            this.form = {
                name:"",
                phone:"",
                sex:"",
                cardCode:"",
                remark:""
            };
            this.index = '';
        }
    },
    methods:{
        getQuery(){
            this.$httpWX.get({
                url:this.$api.clue.queryById+"/"+this.id,
                data:{

                }
            }).then(res=>{
                console.log(res);
                this.form = res.content;
                this.form.sex=='XB001'?this.index = 0:this.form.sex=='XB002'?this.index = 1:'';
            })
        },
        changeName(e){
            console.log(e);
            this.form.name = e.target.detail.value;
        },
        changePhone(e){
            this.form.phone = e.target.detail.value;
        },
        bindPickerChange(e){
            console.log(e);
            this.index = e.mp.detail.value;
            this.index == 0 ? this.form.sex = 'XB001':this.index == 1 ? this.form.sex = 'XB002' : '';
        },
        changeIdNumber(e){
            this.form.cardCode = e.target.detail.value;
        },
        onKeyTarea(e) {
            console.log(e);
            this.form.remark = e.mp.detail.value;
        },
        getSubmit(){
            console.log(this.form.name);
            if(this.form.name == ""){
                wx.showToast({
                    title: "姓名不可为空",
                    icon: "none",
                });
                return false;
            }else if(this.form.phone==""){
                wx.showToast({
                    title: "手机号不可为空",
                    icon: "none",
                });
                return false;
            }else if(this.id){
                this.$httpWX.post({
                    url:this.$api.clue.update,
                    data:{
                        id:this.id,
                        name:this.form.name,
                        phone:this.form.phone,
                        sex:this.form.sex,
                        cardCode:this.form.cardCode,
                        remark:this.form.remark
                    }
                }).then(res=>{
                    console.log(res);
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
                    },10);
                    if(res.status.code === 10){
                        const url = '/pages/clue/main';
                        wx.navigateBack({ delta: 2});
                    }
                })
            }else{
                this.$httpWX.post({
                    url:this.$api.clue.save,
                    data:{
                        coachSign:wx.getStorageSync('coachSign'),
                        name:this.form.name,
                        phone:this.form.phone,
                        sex:this.form.sex,
                        cardCode:this.form.cardCode,
                        remark:this.form.remark
                    }
                }).then(res=>{
                    console.log(res);
                    // wx.showToast({
                    //     title: res.status.message,
                    //     icon: "none",
                    // });
                    // wx.showLoading();
                    // wx.hideLoading();
                    // setTimeout( () => {
                    //     wx.showToast({
                    //         title: res.status.message,
                    //         icon: "none",
                    //     });
                    //     setTimeout( () =>{
                    //         wx.hideToast();  
                    //     },2000)
                    // },10);
                    
                    if(res.status.code === 10){
                        const url = '/pages/clue/main';
                        wx.navigateBack({url:url});
                    }else if(res.status.code === 20) {
                        this.showModal = true;
                        this.message = res.status.message;
                        var that = this;
                        setTimeout(()=>{
                            that.showModal = false;
                        },2000)
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-cuo:before {
  content: "\e646";
}
    .wrap{
        width: 100%;
        height: 100%;
        .content{
            width: 96%;
            height: auto;
            margin: 20rpx auto;
            border-radius: 3rpx;
            border:1rpx solid #efefef;
            .gasBox{
                border-bottom:1rpx solid #efefef!important;
                color:#4f4f4f;
            }
            .idcard{
                border-bottom:1rpx solid #efefef!important;
                color:#4f4f4f;
            }
            .box{
                position: relative;
                .inp{
                    border-bottom: 1rpx solid #efefef!important;
                    color:#4f4f4f;
                }
                .clearicon{
                    position:absolute;
                    top:32%;
                    left:10rpx;
                    color:red;
                }
            }
            .input-textarea{
                height: 300px;
                width: 100%;
                padding: 3px;
                background: #fff;
                color:#4f4f4f;
            }
            .center {
                .text {
                    width: 90%;
                    margin: 0 auto;
                    text-align: left;
                    // margin-left: 30rpx;
                    font-size: 28rpx;
                    background: #fff;
                }
            }
        }
        .footer{
            margin: 80rpx 0;
            text-align: center;
            .quitBtn{
                width: 240px;
                height: 40px;
                background-image: linear-gradient(90deg, 
                #fc8902 0%, 
                #fb4003 100%);
                box-shadow: 0px 2px 10px 0px 
                rgba(253, 135, 2, 0.6);
                border-radius: 21px;
                color:#fff;
                font-size:28rpx;
                line-height:80rpx
                }
            }
        .ibtn{
            background: #ff3f00!important;
            margin-top: 100rpx;
            border-radius:50rpx;
        }
        .modal{
            div{
                span{
                font-size: 28rpx;
                color: #4f4f4f;
                font-weight: bold;
                margin-left: 10rpx;
                }
            }
            p{
                color: #888888;
                padding: 15rpx 0;
            }
            }
    }
</style>

<template>
    <div class="wrap">
        <ul class="content">
            <li>
                <p class="left">登记时间：</p>
                <p class="right">{{form.createTime}}</p>
            </li>
            <li v-if="mode==1">
                <p class="left">报名时间：</p>
                <p class="right">{{form.finishTime}}</p>
            </li>
             <li>
                <p class="left">姓   名：</p>
                <p class="right">{{form.name}}</p>
            </li>
             <li>
                <p class="left">手机号：</p>
                <p class="right">{{form.phone}}</p>
            </li>
             <li>
                <p class="left">性  别：</p>
                <p class="right">{{form.sex=='XB001'?'男':form.sex=='XB002'?'女':''}}</p>
            </li>
             <li>
                <p class="left">身份证号：</p>
                <p class="right">{{form.cardCode}}</p>
            </li>
             <li>
                <p class="left">备  注：</p>
                <p class="right">{{form.remark}}</p>
            </li>
        </ul>
        <div class="footer">
            <i-row i-class="button-panel" v-if="mode==0">
                <i-col span="6" i-class="rb">
                    <i-button i-class="background-t" long="true" @click="btnEditClick">
                        <i class="iconfont icon-bianji">编辑</i>
                    </i-button>
                </i-col>
                <i-col span="6" i-class="rb">
                    <i-button i-class="background-t" long="true" @click="onToCallPhoneClick(form.phone)">
                        <i class="iconfont icon-dianhua">拨打电话</i>
                    </i-button>
                </i-col>
                <i-col span="6" i-class="rb">
                    <i-button i-class="background-t" long="true" @click="getComplete">
                        <i class="iconfont icon-wanchengbaoming">完成报名</i>
                    </i-button>
                </i-col>
                <i-col span="6">
                    <i-button i-class="background-t" long="true" @click="getRemark">
                        <i class="iconfont icon-beizhu">备注</i>
                    </i-button>
                </i-col>
            </i-row>
            <!-- <i-button i-class="btn" type="primary" @click="getBack" v-if="mode==1">移回待转化</i-button> -->
            <i-modal i-class="modal" :visible="visible" @ok="goConfirm(1)" @cancel="goCancel(1)">
                <div class="box-modal">
                    <span>完成报名</span>
                </div>
                <i-row i-class="rowsWrap">
                    <i-col span="5" i-class="l">
                        <p>报名日期</p>
                    </i-col>
                    <picker mode="date" :value="date" v-on:change="bindDateChange">
                        <i-col span="16" i-class="r">
                            <p>{{date}}</p>
                            <i-icon i-class="i-con" type="activity" size="20" color="#fb7015"/>
                        </i-col>
                    </picker>
                </i-row>
                <!-- <view>
                    <picker mode="date" :value="date" v-on:change="bindDateChange">
                        <div class="box">
                            <i-input title="报名日期：" type="" v-model="date" disabled></i-input>
                            <i-icon type="activity" i-class="icon" size="20"/>
                        </div>
                    </picker>
                </view> -->
                <!-- <view class="slot">
                    <i-button i-class="leftBtn" v-on:click="goCancel(1)">取消</i-button>
                    <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm(1)">确认</i-button>
                </view> -->
            </i-modal>
            <!-- 移回待转化 -->
            <i-modal i-class="modal" :visible="modalBack" @ok="goConfirm(2)" @cancel="goCancel(2)">
                <div class="box-modal">
                    <i-icon type="remind_fill" size="28" color="#fb6809" />
                    <span>提示</span>
                </div>
                <p class="ps">是否移回待转化?</p>
                <!-- <view class="slot">
                    <i-button i-class="leftBtn" v-on:click="goCancel(2)">取消</i-button>
                    <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm(2)">确认</i-button>
                </view> -->
            </i-modal>
            <i-modal i-class="modal" :visible="isModal" @ok="goConfirm(3)" @cancel="goCancel(3)">
                <!-- <div class="box-modal">
                    <i-icon type="remind_fill" size="28" color="#fb6809" />
                    <span>提示</span>
                </div> -->
                <div class="box-modal"></div>
                <div class="text-wrap">
                    <textarea class="textareaCont" v-if="isModal" name="textarea" id="" v-model="remark"  placeholder="这里添加备注......" maxlength="300" @change="onKeyTarea"></textarea>
                    <span>{{contentSize}}/{{count}}</span>
                </div>
            </i-modal>
        </div>
        <i-modal i-class="modal" :visible="clueModal" @ok="goConfirm(4)" @cancel="goCancel(4)">
            <div  class="box-modal">
                <i-icon type="remind_fill" size="28" color="#fb6809" />
                <span>提示</span>
            </div>
            <p style="padding-bottom:30rpx;">是否删除线索？</p>
        </i-modal>
        <div class="footerBtn" v-if="mode==0">
            <button class="quitBtn" @click="getCancelClue">删除线索</button>
        </div>
        <div class="footerBtn" v-if="mode==1">
            <button class="quitBtn" @click="getBack" >移回待转化</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:"",
            mode:"",
            visible:false,
            date:"",
            isModal:false,
            modalBack:false,
            remark:"",
            clueModal:false,
            form:{
                name:"",
                phone:"",
                sex:"",
                cardCode:"",
                createTime:"",
                remark:""
            },
            count:300
        }
    },
    computed: {
        contentSize () {
            return this.remark.length || 0
        }
    },
    onShow(){
        this.visible = false;
        this.isModal = false;
        this.modalBack = false;
    },
    onLoad(options){
        console.log(options);
        this.id = options.id;
        this.mode = options.mode;
        this.getQuery();
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
            })
        },
        // 完成报名
        getComplete(){
            this.date = "";
            this.visible = true;
        },
        // 移回待转化
        getBack(){
            this.modalBack = true;
        },
        // 报名日期
        bindDateChange(e) {
            this.date = e.target.value;
            console.log(this.date);
        },
        getRemark(){
            this.remark = this.form.remark;
            this.isModal = true;
        },
        goCancel(v){
            if(v===1){
                this.visible = false;
            }else if(v===2){
                this.modalBack = false;
            }else if(v===3){
                this.isModal = false;
            }else if(v===4){
                this.clueModal = false;
            }
        },
        // 删除线索
        getCancelClue(){
            this.clueModal = true;
        },
        goConfirm(v){
            if(v===1){
                if(this.date==""){
                    wx.showToast({
                        title: '请选择报名日期',
                        icon: "none",
                    });
                    return false;
                }
                // 完成报名
                this.$httpWX.post({
                    url:this.$api.clue.finish,
                    data:{
                        id:this.id,
                        finishTime:this.date
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
                    this.visible = false;
                    if(res.status.code * 1 === 10){
                        let url = '/pages/clue/main';
                        wx.navigateBack({url:url});
                    }
                })
            }else if(v===2){
                // 移回待转化
                this.$httpWX.post({
                    url:this.$api.clue.noreport+"/"+this.id,
                    data:{

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
                    this.modalBack = false;
                    if(res.status.code * 1 === 10){
                       let url = '/pages/clue/main';
                        wx.navigateBack({url:url});
                    }
                })
            }else if(v===3){
                // 备注
                this.$httpWX.post({
                    url:this.$api.clue.remark,
                    data:{
                        id:this.id,
                        remark:this.remark
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.status.code === 10){
                        this.isModal = false;
                        this.form.remark = this.remark;
                    }
                })
            }else if(v===4){
                this.$httpWX
                .post({
                    url: this.$api.clue.delete+"/" + this.id,
                    data: {}
                })
                .then(res => {
                    console.log(res);
                    this.clueModal = false;
                    wx.showToast({
                        title: res.status.message,
                        icon: "none",
                        duration: 3000
                    });
                    if(res.status.code * 1 === 10){
                        const url = '/pages/clue/main';
                        wx.navigateTo({url:url});
                    }
                });
            }

        },
        // 编辑
        btnEditClick(){
            const url = '/pages/clueAdd/main?mode='+'edit'+'&id='+this.id;
            wx.navigateTo({url:url});
        },
        // 拨打电话
        onToCallPhoneClick(phone){
            wx.makePhoneCall({
                phoneNumber: phone
            })
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

.icon-beizhu:before {
  content: "\e641";
}

.icon-bianji:before {
  content: "\e642";
}

.icon-dianhua:before {
  content: "\e643";
}

.icon-wanchengbaoming:before {
  content: "\e644";
}

    .wrap{
        width: 100%;
        height: 100%;
        .content{
            width: 93%;
            height: auto;
            margin: 20rpx auto;
            border-radius: 3rpx;
            border:1rpx solid #efefef;
            background: #fff;
            li{
                padding: 25rpx 20rpx;
                font-size: 28rpx;
                overflow: hidden;
                border-bottom: 1rpx solid #F4F4F4;
                .left{
                    float: left;
                    width:100px;
                }
                .right{
                    // float: right;
                    // text-align: center;
                    font-size: 28rpx;
                    color: #4f4f4f;
                }
            }
            li:last-child{
                height: 100rpx;
                border-bottom: none;
            }
        }
        .footer{
            // left: 0;
            // right: 0;
            // position: fixed;
            // bottom: 0;
            // padding: 0 10px 10px 10px;
            width: 93%;
            height: auto;
            margin: -20rpx auto;
            .button-panel{
                border: 1rpx solid #fff4e1;
                background-color: #fff4e1;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                // border-radius: 11px;
                .background-t{
                    background: transparent!important;
                    color: #fb6f14!important;
                    .iconfont{
                        font-size: 14px;
                        margin-right: 4px;
                    }
                }
            }
            .btn{
                background: #ff3f00!important;
                border-radius: 20rpx;
            }
        }
        .footerBtn{
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
        .modal{
            .box-modal{
                padding: 20rpx 0;
                span{
                    font-size: 28rpx;
                    color: #4f4f4f;
                    font-weight: bold;
                    margin-left: 10rpx;
                }
            }
            .rowsWrap{
                width: 90%;
                margin: 0 auto;
                padding:60rpx 0;
                .l{
                    font-size: 28rpx;
                    color:#4f4f4f;
                    text-align: center;
                    line-height: 45px;
                }
                .r{
                    width: 213px;
                    height: 45px;
                    background: #f6f6f6;
                    border-radius: 6px;
                    overflow: hidden;
                    p{
                        line-height: 45px;
                        float: left;
                        margin-left:50rpx;
                        font-size: 28rpx;
                        color:#4f4f4f;
                    }
                    .i-con{
                        line-height: 45px;
                        float:right;
                        margin-right: 20rpx;
                    }
                }
            }
            .ps{
                color: #888888;
                padding: 15rpx 0;
                padding-bottom:20px;
            }
            .text-wrap{
                .textareaCont{
                    width: 90%;
                    margin: 0 auto;
                    text-align: left;
                    border:1px solid #efefef;
                    border-radius:6px;
                    margin-bottom:10px;
                    line-height: 2;
                    color:#4f4f4f;
                }
                span{
                    display: block;
                    text-align: right;
                    color: #b4b4b4;
                    font-size: 13px;
                    margin-right:10px;
                    position:relative;
                    bottom:48px;
                    right:15px;
                }
            }
        }
    }
</style>

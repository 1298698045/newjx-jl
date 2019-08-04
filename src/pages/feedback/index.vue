<template>
    <div class="wrap">
        <div class="tip-box">
            我们非常感谢您的支持,真诚的希望得到您的宝贵意见和建议,<br>以便我们更好地完善我们的产品！
        </div>
        <div class="textarea-box">
            <textarea class="textarea" v-model="content"  name="textarea" placeholder="写下宝贵的建议..."  maxlength="300"></textarea>
            <span>{{contentSize}}/{{totalCount}}</span>
        </div>
        <button class="btn-cus-submit" @click="activeUpdSubmit">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content:"",
            totalCount: 300,
            name:""
        }
    },
    computed: {
        contentSize () {
            return this.content.length || 0
        }
    },
    onShow(){
        this.content = "";
    },
    onLoad(options){
        this.name = options.name;
    },
    methods:{
        activeUpdSubmit () {
            if (this.content === '') {
                wx.showToast({
                    title: '请输入反馈意见',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            let url = this.$api.my.addOrUpdate
            let params = {
                params:{
                    openid:"",
                    platform:"jx_teacher_app",
                    contact:"",
                    message:this.content
                }
            }
            this.$httpWX.post({
                url,
                data: params
            }).then(res => {
                wx.showToast({
                    title: res.data,
                    duration: 2000,
                    success: () => {
                        if (res.code == 0) {
                            setTimeout(() => {
                                wx.switchTab({url:'/pages/my/main'})
                            }, 1000);
                        }
                    }
                })
            })
        }
         
    }
}
</script>
<style lang="scss">
.textarea-box{
	width: 347px;
	margin: 10px auto 24px;
	background-color: #ffffff;
	border-radius: 6px;
	border: solid 1px #f4f4f4;
    padding: 14px;
    box-sizing: border-box;
    textarea{
        border: none;
        width: 100%;
        height: 300px;
        font-size:28rpx;
        line-height: 2
    }
    span{
        display: block;
        text-align: right;
        color: #b4b4b4;
        font-size: 13px;
        padding-top:10px;
        margin-right:10px;
    }
    
}
.btn-cus-submit{
  width:480rpx;
  height:80rpx;
  background-image:linear-gradient(90deg, #fc8902 0%, #fb4003 100%);
  box-shadow:0 4rpx 20rpx 0 rgba(253, 135, 2, 0.6);
  border-radius:42rpx;
  color:#fff;
  font-size:28rpx;
  line-height:80rpx;
  letter-spacing: 5px;
}
.tip-box{
    background: #fff4e1;
    font-size: 12px;
    text-align: center;
    color: #fb6f14;
    line-height: 1.5;
    padding: 10px;
}
</style>

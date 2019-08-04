<template>
    <div class="wrap">
        <div class="header">
            <img :src="imgUrl+list.pictureUrl" alt="">
        </div>
        <div class="content">
            <div class="boxHeader">
                <i-row i-class="rowT" v-if="type=='REDUCTION'">
                    <i-col style="color:#fb6809;font-size:24rpx;" span="6">最低：￥<span style="font-size:35rpx;font-weight:bold;">{{list.price - list.discountsRestrictions}}</span></i-col>
                    <i-col span="5">
                        <p style="text-decoration:line-through;margin-top:8rpx;color:#979797;font-size:24rpx;">原价{{list.price}}</p>
                    </i-col>
                    <i-col span="13" style="text-align:right;">
                        <p style="font-size:24rpx;color:#4f4f4f;">
                            每多一人，团价减 <span style="color:#fb6809;font-weight:bold;">{{list.discountsMoney}}</span>元
                        </p>
                    </i-col>
                </i-row>
                <i-row i-class="rowT"  v-if="type=='COMMON'">
                    <i-col style="color:#fb6809;font-size:28rpx;" span="7">团购价:￥<span style="font-size:35rpx;font-weight:bold;">{{list.discountsRestrictions}}</span></i-col>
                    <i-col span="6">
                        <p style="text-decoration:line-through;color:#979797;font-size:24rpx;">原价{{list.price}}</p>
                    </i-col>
                    <i-col span="11">
                        <p style="color:#4f4f4f;font-size:24rpx;">
                            <span style="color:#fb6809;">{{list.peopleRestrictions}}</span>人团
                        </p>
                    </i-col>
                </i-row>
                <p class="text-name">{{list.name}}</p>
                <p class="activ">活动归属：{{list.schoolName}}</p>
                <p class="activ">活动时间：{{list.startTime || ''}}～{{list.endTime || ''}}</p>
            </div>

            <div class="detailWrap" >
                <div :style="scrollTop>250?'position:fixed;top:0;left:0;right:0;border-bottom: 1rpx solid #ccc;background:#fff;':'position:inheirt;border:none;background:#fff;'">
                    <h3>
                        <span class="span-title">
                            活动详情
                        </span>
                    </h3>
                    <div class="navHeader">
                        <p>姓名</p>
                        <p>手机号</p>
                        <p>活动状态</p>
                        <p>现价</p>
                        <p>拨打电话</p>
                    </div>
                </div>
                <div class="listDetail" v-for="(item,index) in listInfo" :key="index">
                    <p style="margin-left:-20rpx;" class="ps">{{item.name||''}}</p>
                    <p  class="ps">{{item.phone||''}}</p>
                    <p style="margin-left:16rpx;" class="ps">{{item.status=='FINISHED'?'已结束':item.status=='ACTIVE'?'进行中':'已结束'}}</p>
                    <p style="color:#fb6809;" class="ps">{{item.realMoney}}</p>
                    <p @click="getPhone(item.phone)">
                        <button class="btn">电话</button>
                        <!-- <i-icon type="addressbook_fill" size="20" /> -->
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgUrl:'http://oss-dev.aplusx.com/',
            scrollTop:"",
            list:{},
            listInfo:[
                
            ],
            configId:"",
            employeeId:"",
            id:"",
            type:""
        }
    },
    onLoad(options){
        console.log(options);
        this.id = options.docid;
        this.configId = options.id;
        this.employeeId = options.employeeId;
        this.type = options.type;
        this.getQueryList();
    },
    methods: {
        getQueryList(){
            this.$fetch.post({
                url:this.$api.activity.detail,
                data:{
                    configId:this.configId,
                    employeeId:this.employeeId,
                    id:this.id
                }
            }).then(res=>{
                console.log(res);
                this.list = res.content;
                this.listInfo = res.content.aplusGroupWxUserList;
            })
        },
        getPhone(phone){
            wx.makePhoneCall({
                phoneNumber: phone // 仅为示例，并非真实的电话号码
            })
        }
    },
    onPageScroll:function(e){ // 获取滚动条当前位置
        this.scrollTop = e.scrollTop;
    },
}
</script>
<style lang="scss">
    .wrap{
        width: 100%;
        height: 100%;
        .header{
            width: 100%;
            height: 208px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                vertical-align: middle;
            }
        }
        .content{
            width: 100%;
            height: auto;
            .boxHeader{
                padding: 20rpx;
                font-size: 28rpx;
                background: #fff;
                .text-name{
                    font-size: 16px;
                    color:#4f4f4f;
                    padding: 20rpx  0;
                    font-weight: bold;
                }
                .activ{
                    font-size: 24rpx;
                    color: #979797;
                }
            }
            .detailFixed{
                width: 100%;
                position: fixed;
                top: 0;
                background: #fff;
                padding: 20rpx 0;
            }
            .detailWrap{
                background: #fff;
                padding: 20rpx 0;
                h3{
                    text-align: center;
                    padding: 15rpx 0;
                    .span-title{
                        font-size: 16px;
                        font-weight: bold;
                        padding-bottom:5rpx;
                        color:#4f4f4f;
                        border-bottom:2px solid #fb6809;
                    }
                }
                .navHeader{
                    display: flex;
                    font-size: 28rpx;
                    padding:10rpx 0;
                    color: #979797;
                    p{
                        flex: 1;
                        text-align: center;
                    }
                }
                .listDetail{
                    display: flex;
                    font-size: 28rpx;
                    padding:0 20rpx;
                    color: #4f4f4f;
                    p{
                        flex: 1;
                        text-align: center;
                        padding:10rpx 0;
                        .btn{
                            width: 64px;
                            height: 26px;
                            line-height: 26px;
                            text-align: center;
                            color: #fff;
                            font-size: 24rpx;
                            background-image: linear-gradient(90deg, 
                            #fc8902 0%, 
                            #fb4003 100%);
                            box-shadow: 0px 2px 10px 0px 
                            rgba(253, 135, 2, 0.6);
                            border-radius: 21px;
                        }
                    }
                    .ps{
                        margin-top: 10rpx;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="wrap">
        <div class="header">
            <i-row>
                <i-col span="20">
                    <van-cell-group>
                        <van-field
                            :value="value"
                            placeholder="学员姓名/手机号"
                            :border="false"
                            clearable
                            @change="changePhone"
                            @confirm="getEnter"
                            right-icon="search"
                            right-icon-class="icon"
                            @click="getQueryStudent"
                        />
                    </van-cell-group>
                </i-col>
                <i-col span="4">
                    <p @click="getCancel">取消</p>
                </i-col>
            </i-row>
        </div>
        <div class="center">
            <div class="box_cont" v-for="(item,index) in list" :key="index">
                <i-row i-class="rows">
                    <i-col span="16">
                        <div class="title">
                            <p class="t_name">{{item.name}}</p>
                            <p class="t_sex">{{item.sex}}</p>
                            <p class="t_sex">{{item.ages}}</p>
                            <p class="t_phone">{{item.mobile}}</p>
                        </div>
                        <p class="t_status">
                            <span>
                                当前状态：科目二{{item.km2statusV}}
                            </span>
                            <span style="margin-left:20rpx;">科目三{{item.km3statusV}}</span>
                        </p>
                    </i-col>
                    <i-col span="8" i-class="r_btn">
                        <van-button custom-class="btn" @click="getDetail(item)">查看详情</van-button>
                    </i-col>
                </i-row>
            </div>
        </div>
    </div>
</template>
<script>
import { getDictValue } from '../../utils/public';
import { getDictData } from '../../utils/util'
export default {
    data(){
        return {
            value:"",
            active:0,
            arrName:['全部','活跃','潜水'],
            idx:0,
            index:1,
            array:['7天','30天','60天以上'],
            number:0,
            arrays:['全部科目','科目二','科目三'],
            num:1,
            arrNames:['全部','上月','本月'],
            date:"",
            list:[],
            listData:[],
            pagination:{
                current:1,
                pageSize:10
            },
            employeeId:""
        }
    },
    onLoad(){
        this.employeeId = wx.getStorageSync('employeeId');
        getDictData().then( dictionary => {
            var that = this;
            that.listData = dictionary;
        } );
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var day = d.getDate();
        this.date = y + "-" + m + "-" + day;
    },
    methods:{
        changePhone(e){
            this.value = e.mp.detail;
        },
        getEnter(e){
            this.name = e.mp.detail;
            this.$httpWX.post({
                url:this.$api.student.query,
                data:{
                    params:{
                        coachId:this.employeeId,
                        keywords:this.name
                    },
                    pagination:this.pagination
                }
            }).then(res=>{
                this.list = res.data.list;
                this.list.forEach(item=>{
                    var dd = getDictValue(this.listData,"gender",item.baseInfo.gender);
                    var km2 = getDictValue(this.listData,"km_status",item.km2Status);
                    var km3 = getDictValue(this.listData,"km_status",item.km3Status);
                    this.$set(item,'sex',dd);
                    this.$set(item,'ages',this.computeAge(item.baseInfo.birthday));
                    this.$set(item,'km2statusV',km2);
                    this.$set(item,'km3statusV',km3);
                })
            })
        },
        computeAge(startDate) {
            // 获得今天的时间
            var date = new Date();
            startDate = new Date(startDate);
            var newDate = date.getTime() - startDate.getTime();
            // 向下取整  例如 10岁 20天 会计算成 10岁
            // 如果要向上取整 计算成11岁，把floor替换成 ceil
            return Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
        },
        getCancel(){
            this.value = "";
            this.list = [];
        },
        onChange(e){
            this.active = e.mp.detail.index;
        },
        getTab(index){
            this.idx = index;
        },
        bindPickerChange(e){
            console.log(e);
            this.index = e.mp.detail.value;
        },
        getPickerChange(e){
            this.number = e.mp.detail.value;
        },
        getTabClick(idx){
            this.num = idx;
        },
        pickerDate(e){
            this.date = e.mp.detail.value;
        },
        // 学员详情
        getDetail(item){
            const url = "/pages/studentDetail/main?id="+item.id;
            wx.navigateTo({url:url})
        }
    }
}
</script>
<style lang="scss">
.wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header{
        padding:20rpx;
        .icon{
            font-size: 20px!important;
        }
        p{
            font-size: 28rpx;
            font-weight: bold;
            color: #00c203;
            text-align: center;
            padding: 10px 0;
        }
    }
    .center{
        .box_cont{
            background: #fff;
            font-size: 28rpx;
            margin: 20rpx 0;
            .rows{
                padding:10rpx 20rpx;
                .title{
                    display: flex;
                    font-size: 28rpx;
                    p{
                        flex: 1;
                        color: #4f4f4f;
                    }
                    .t_name{
                        font-size: 28rpx;
                        font-weight: bold;
                        color: #4f4f4f;
                    }
                    .t_sex{
                        font-size: 24rpx;
                    }
                    .t_phone{
                        color: #fd5c1f;
                    }
                    
                }
                .t_status{
                    font-size: 24rpx;
                    color: #979797;
                    padding:10rpx 0;
                }
                .r_btn{
                    text-align: right;
                    margin-top:20rpx;
                    .btn{
                        width: 80px;
                        height: 24px;
                        line-height: 24px;
                        font-size: 24rpx;
                        text-align: center;
                        border-radius: 8rpx;
                        border:1rpx solid #fb7015;
                        color: #fb7015;
                    }
                }
            }
            .row_bottom{
                padding: 0 20rpx 20rpx 20rpx;
                font-size: 24rpx;
                color: #979797;
            }
        }
    }
}
</style>


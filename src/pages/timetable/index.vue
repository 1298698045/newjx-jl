<template>
  <div class="wrap">
    <div class="nav_box">
      <div class="nav_item">
        <p>科目二</p>
        <p>{{dataList.km2Lessons}}课时</p>
      </div>
      <!-- <div class="nav_item"></div> -->
      <div class="nav_item">
        <p>科目三</p>
        <p>{{dataList.km3Lessons}}课时</p>
      </div>
      <div class="nav_item" style="border-left:1px solid #eaeaea;padding-left:30px;">
        <p>总计</p>
        <p>{{dataList.km2Lessons+dataList.km3Lessons}}课时</p>
      </div>
    </div>
    <view class="container">
      <view class="left_tabbar">
        <scroll-view scroll-y="true" style="" class="left_tabbar_list">
          <view v-on:click="changeTab(item,index)" class="leftTitle" v-bind:class="[activeIndex==index?'active':'']" v-for="(item,index) in getLeftDates" :key="index">
            <view>
              <p>{{item.time}}</p>
              <p>{{item.time==date?'今日':item.day}}</p>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="right_content">
        <scroll-view scroll-y="true" style="" class="tab_panel">
          <view>
            <view v-for="(val,key,i) in records" :key="i"> <!-- ({{i+1}})  現在是{{content}} -->
               <view class="caption-wrap">
                  <i-collapse name="123">
                      <i-collapse-item  :title="arr[key][0].a +'   '+ arr[key][0].km +'   '+(arr[key][0].num+'/'+arr[key][0].c)" :name="i" i-class-title="title_class" i-class="qwe">
                          <view slot="content" style="overflow:auto;background:#fff;padding:5px;border-bottom:1rpx solid #f2f2f2;" v-for="(record,index) in val" :key="index">
                              <i-row i-class="rwo-wrap">
                                <i-col span="8" i-class="col-l">
                                  <div class="text-box">
                                    <p class="p-name">{{record.name}}</p>
                                    <p class="p-phone" @click="getCall(record.mobile)">
                                      <span>{{record.mobile}}</span>
                                      </p>
                                  </div>
                                </i-col>
                                <i-col span="8" i-class="col-c">
                                  <div class="text-box">
                                    <p>
                                      驾照类型: <span>{{record.licenseType}}</span>
                                    </p>
                                    <p class="ps">已学课时: <span>{{record.km2Lessons}}</span></p>
                                    <p>班型:{{record.classTitle}}</p>
                                  </div>
                                </i-col>
                                <i-col span="8" i-class="col-r">
                                  <div>
                                    <button v-if="record.signStatus=='0'" disabled>待签到</button>
                                    <button class="btn-confirm" v-if="record.signStatus==1&&record.confirmStatus==0" @click="confirm(record.id)">待确认</button>
                                    <!-- <button class="btn-sign" v-else-if="record.signStatus==0" disabled>未签到</button> -->
                                    <button class="btn-success" v-else-if="record.confirmStatus==1" disabled>已完成</button>
                                  </div>
                                </i-col>
                              </i-row>
                          </view>
                      </i-collapse-item>
                  </i-collapse>
              </view>
            </view>
          </view> 
        </scroll-view>
      </view>
    </view>
    <i-modal i-class="modal" :visible="visible" @ok="goConfirm" @cancel="goCancel">
      <div>
          <i-icon type="remind_fill" size="28" color="#fb6809" />
          <span>提示</span>
        </div>
        <p>学员是否学车?</p>
    </i-modal>
  </div>
</template>
<script>
  import { getDictValue } from '../../utils/public';
  import { getDictData } from '../../utils/util';
  export default {
    created() {
      
    },
    data(){
      return {
        date:"",
        coachId:"",
        activeIndex: 1,
        content:'123',
        flag:true,
        visible:false,
        courseRecordId:"",
        tabs: [],
        dataList:{
          partTwoCourseHour:'',
          partThreeCourseHour:'',
          totalCourseHour:'',
          bookedRecordList:[
            {
              interval:'',
              subject:'',
              signNum:'',
              bookedNum:'',
              recordList:[
                {
                  studentName:'',
                  studentPhone:'',
                  trainingStartTime:'',
                  trainingEndTime:'',
                  subjectCode:'',
                }
              ]
            }
          ]
        },
        schedule:[],
        pagination:{
          current:1,
          pageSize:20
        },
        arr:[],
        records:{},
        listData:[]
      }
    },
    onShow(){
      // this.getToken();
    },
    onLoad(){
      this.coachId = wx.getStorageSync('employeeId');
      getDictData().then( dictionary =>{
        var that = this;
        this.listData = dictionary;
      })
      var myDate = new Date();//获取系统当前时间
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var strDate = myDate.getDate();
      var h = myDate.getHours(); //获取系统时，
      var m = myDate.getMinutes(); //分
      this.date = year+'-'+month+'-'+strDate;
      this.queryAll(this.getDays(0));
    },
    computed:{
      getLeftDates(){//获取近8天日期
        console.log('computed')
        let dayArr = [];
        var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
        for(var i = -1;i<15;i++){
          var myDate = new Date(Date.parse(this.getDays(i)));
          // dayArr.push(this.getDays(i))
          dayArr.push({time:this.getDays(i),day:weekDay[myDate.getDay()]})
        }
        console.log(dayArr)
        return dayArr;
      }
    },
    methods:{
      queryAll(day){
        this.$httpWX.post({
          url:this.$api.timetable.query,
          data:{
            params:{
              courseDate:day,
              coachId:this.coachId,
              recordStatus:1
            },
            pagination:this.pagination
          }
        }).then(res=>{
          this.records = {};
          this.dataList = res.data;
          var arr = {};
          var keys = Object.keys(this.dataList.records);
          keys.sort()
          keys.forEach(key =>{
            var s = key.split('|');
            var a = getDictValue(this.listData,'km',s[1]);
            arr[key] = []
            arr[key].push({a:s[0],km:a,num:s[2],c:Math.max.apply(null,s[3].split(','))});
            this.records[key] = this.dataList.records[key];
          })
          console.log('1212112',this.records);
          // console.log('arr',arr);
          this.arr = arr;
        })
      },
      changeTab: function (date,tabindex) {
        console.log(date);
        this.queryAll(date.time);
        this.activeIndex = tabindex;
      },
      goCancel(){
        this.visible = false;
      },
      goConfirm(){
        this.$httpWX.post({
            url: this.$api.timetable.sign,
            data: {
              params:{
                id:this.courseRecordId,
                confirmStatus:1
              }
            }
          })
        .then(res => {
          console.log(res)
          wx.showToast({
            title: res.data,
            icon: 'succes',
            duration: 1000,
            mask:true
          })
          this.visible = false;
          this.queryAll(this.getDays(0));
        });
      },
      confirm(id){
        this.courseRecordId = id;
        this.visible = true;
      },
      getCall(phone){
          wx.makePhoneCall({
            phoneNumber: phone,
              success:function(){
              console.log("拨打电话成功！")
            },
            fail:function(){
              console.log("拨打电话失败！")
            }
          })
        },
        getClassList(day){

        },
        getDays(addDay){
          let d = new Date();
          d.setDate(d.getDate()+ parseInt(addDay)); 
          const y = d.getFullYear();
          let m = d.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          let day = d.getDate();
          day = day < 10 ? "0" + day : day;
          return y + "-" + m + "-" + day;
        }
    },
       /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.queryAll(this.getDays(0));
      this.activeIndex = this.activeIndex;
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
  }
</script>
<style  lang="scss">
.qwe{
  /* background:-webkit-linear-gradient(left, #F41856 , #E65179)!important; */
  background: #fff4e1!important;
}
.container {
  width: 100%;
  display: flex;
  overflow: hidden;
}
.leftTitle{
  width: 90px;
  height:80px;
  text-align:center;
  font-size:12px;
  display:flex;
  align-items:center;
  justify-content:center;

}
.left_tabbar {
  width: 24%;
  height: 500px;
  overflow: scroll;
}
.right_content {
  width: 76%;
  background: #fff;
}

.left_tabbar_item {
  color: #7c7c7c;
  font-size: 12px;
  width: 100%;
  padding: 20rpx 0;
  text-align: center;
  border-bottom: 1rpx solid #fff;
}

.left_tabbar_list {
  background: #e8e8e8;
}

.left_tabbar .active {
  background: #fff;
  color: #fb6f14;
  transition: all 0.5s;
  animation: show 0.5s;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.i-collapse-item-title-wrap {
/* background:-webkit-linear-gradient(left, #F41856 , #E65179)!important; */
background: #ff3f00!important;
}

.info_tel{
  background:#ff3f00;
  border:none!important;
}

.tab_panel {
  font-size: 24rpx;
}
.btnDiv.noclass{
  background:#e3e3e3!important;
  color:#333;
}
.info_box,.info_,.nav_box{
  display:flex;
  align-items:center;
  justify-content:space-around;
}
.nav_box{
  font-size:14px;
  // padding:10px 0;
  // margin-bottom:10px;
  background:#ff612c;
  color:#fff;
}
.nav_item{
  text-align:center;
  padding: 20rpx 0;
}
.nav_item p:nth-child(2){
  padding-top: 10rpx;
}
.info_div{
  padding:2px 10px;
  border:1px solid #ddd;
  border-radius:14px;
}
.textPadding{
  font-size:14px;
  padding:10px 0;
}
.btnDiv{
  height:121rpx;
  line-height:121rpx;
  width:106rpx;
  border-radius:16rpx;
  display:inline-block;
  margin:0 12rpx;
  text-align:center;
  background:#ff3f00;
  color:#fff;
  font-size:12px;
}
.rwo-wrap{
  padding: 20px 10rpx;
  .col-l{
    .text-box{
      padding: 20rpx 0;
      .p-name{
        font-size: 28rpx;
        color: #4f4f4f;
        font-weight: bold;
      }
      .p-phone{
        span{
            font-size: 24rpx;
            color: #fb6f14;
            border-bottom: 1rpx solid #fb6f14;
          }
      }
    }
  }
  .col-c{
    font-size: 24rpx;
    .text-box{
      .ps{
        padding:10rpx 0;
        color: #4f4f4f;
        span{
          color: #fb6f14;
        }
      }
    }
  }
  .col-r{
    div{
      button{
        width: 80px;
        height: 30px;
        border-radius: 21px;
        background: #f0f0f0;
        color: #9f9f9f;
        line-height: 30px;
        text-align: center;
        border:none;
        font-size:24rpx;
        margin-top: 20rpx;
      }
      .btn-confirm{
        background-image: linear-gradient(90deg, 
        #fc8902 0%, 
        #fb4003 100%);
        box-shadow: 0px 2px 10px 0px 
          rgba(253, 135, 2, 0.6);
        color: #ffffff;
      }
    }
  }
}
.modal{
  div{
    padding: 30rpx;
    span{
      font-size: 28rpx;
      color: #4f4f4f;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  p{
    color: #888888;
    padding-bottom: 30rpx;
  }
}

</style>

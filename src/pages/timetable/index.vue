<template>
  <div class="wrap">
    <div class="nav_box">
      <div class="nav_item">
        <p>科目二</p>
        <p>{{dataList.partTwoCourseHour}}课时</p>
      </div>
      <!-- <div class="nav_item"></div> -->
      <div class="nav_item">
        <p>科目三</p>
        <p>{{dataList.partThreeCourseHour}}课时</p>
      </div>
      <div class="nav_item" style="border-left:1px solid #eaeaea;padding-left:30px;">
        <p>总计</p>
        <p>{{dataList.totalCourseHour}}课时</p>
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
            <view v-for="(items,i) in dataList.bookedRecordList" :key="i"> <!-- ({{i+1}})  現在是{{content}} -->
               <view class="caption-wrap">
                  <i-collapse name="123">
                      <i-collapse-item  :title="items.interval+' '+ (items.subject=='KM002'?'科目二':'科目三')   +' '+items.signNum+'/'+items.bookedNum" :name="i" i-class-title="title_class" i-class="qwe">
                          <view slot="content" style="overflow:auto;background:#fff;padding:5px;border-bottom:1rpx solid #f2f2f2;" v-for="(record,index) in items.recordList" :key="index">
                              <i-row i-class="rwo-wrap">
                                <i-col span="8" i-class="col-l">
                                  <div class="text-box">
                                    <p class="p-name">{{record.studentName}}</p>
                                    <p class="p-phone">
                                      <span>{{record.studentPhone}}</span>
                                      </p>
                                  </div>
                                </i-col>
                                <i-col span="8" i-class="col-c">
                                  <div class="text-box">
                                    <p>
                                      驾照类型: <span>{{record.trainingType=='PXLX001'?'A1':record.trainingType=='PXLX002'?'A2':record.trainingType=='PXLX003'?'A3':record.trainingType=='PXLX004'?'B1':record.trainingType=='PXLX005'?'B2'
                                      :record.trainingType=='PXLX006'?'C1':record.trainingType=='PXLX007'?'C2':record.trainingType=='PXLX008'?'C3'
                                      :record.trainingType=='PXLX009'?'C4':record.trainingType=='PXLX010'?'C5':record.trainingType=='PXLX011'?'D':record.trainingType=='PXLX012'?'E':record.trainingType=='PXLX013'?'F'
                                      :record.trainingType=='PXLX014'?'M':record.trainingType=='PXLX015'?'N':record.trainingType=='PXLX016'?'P':''}}</span>
                                    </p>
                                    <p class="ps">已学课时: <span>{{record.studiedHour}}</span></p>
                                    <p>班型:{{record.className}}</p>
                                  </div>
                                </i-col>
                                <i-col span="8" i-class="col-r">
                                  <div>
                                    <button v-if="record.status=='YKZT001'" disabled>待签到</button>
                                    <button class="btn-confirm" v-if="record.status=='YKZT002'" @click="confirm(record.id)">待确认</button>
                                    <button class="btn-sign" v-else-if="record.status=='YKZT003'" disabled>未签到</button>
                                    <button class="btn-success" v-else-if="record.status=='YKZT004'" disabled>已完成</button>
                                  </div>
                                </i-col>
                              </i-row>



                              <!-- <i-col span="19" i-class="textPadding">
                                <i-col span="24">
                                  <view class="info_"> -->
                                    <!-- <text class="titleName">{{record.studentName}}</text>
                                    <text class="titleName">{{record.sex=='XB001'?'男':record.sex=='XB002'?'女':''}}</text>
                                    <text class="titleName">{{record.studentPhone}}</text> -->
                                    <!-- <p @click="getCall(record.studentPhone)" class="info_div info_tel"><i-icon type="mobilephone_fill" size="20" color="#fff" /></p> -->
                                  <!-- </view>
                                </i-col> -->
                                <!-- <i-col span="24">
                                  <div class="info_box" style="margin-top:5px;">
                                    <div class="info_div">已学{{record.studiedHour}}课时</div>
                                    <div class="info_div">{{record.trainingType=='PXLX001'?'A1':record.trainingType=='PXLX002'?'A2':record.trainingType=='PXLX003'?'A3':record.trainingType=='PXLX004'?'B1':record.trainingType=='PXLX005'?'B2'
                                      :record.trainingType=='PXLX006'?'C1':record.trainingType=='PXLX007'?'C2':record.trainingType=='PXLX008'?'C3'
                                      :record.trainingType=='PXLX009'?'C4':record.trainingType=='PXLX010'?'C5':record.trainingType=='PXLX011'?'D':record.trainingType=='PXLX012'?'E':record.trainingType=='PXLX013'?'F'
                                      :record.trainingType=='PXLX014'?'M':record.trainingType=='PXLX015'?'N':record.trainingType=='PXLX016'?'P':''}}</div>
                                    <div class="info">{{record.className}}</div> -->
                                    <!-- <div class="info_div">{{record.subjectCode=='KM001'?'科目一':record.subjectCode=='KM002'?'科目二':record.subjectCode=='KM003'?'科目三':''}}</div> -->
                                    <!--
                                    <div class="info_div">{{record.hours}}</div>
                                    <div class="info_div">{{record.hours}}</div>
                                    -->
                                  <!-- </div> 
                                </i-col>
                              </i-col> -->
                              <!-- <i-col span="5" i-class="textPadding">
                                <div class="btnDiv noclass" v-if="record.status=='YKZT001'" disabled><span>待签到</span></div>
                                <div class="btnDiv" v-if="record.status=='YKZT002'" @click="confirm(record.id)"><span>待确认</span></div>
                                <div class="btnDiv noclass" v-else-if="record.status=='YKZT003'" disabled><span>未签到</span></div>
                                <div class="btnDiv noclass" v-else-if="record.status=='YKZT004'" disabled><span>已完成</span></div>
                              </i-col> -->
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
      <!-- <view class="slot">
        <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
        <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm">确认</i-button>
      </view> -->
    </i-modal>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return {
        date:"",
        coachId: wx.getStorageSync("userId"),
        activeIndex: 1,
        content:'123',
        flag:true,
        visible:false,
        courseRecordId:"",
        tabs: [
          {
            id: 1,
            tabName: '10-18',
            date:'星期五'
          }, {
            id: 2,
            tabName: '10-18',
            date:'星期五'
          }, {
            id: 3,
            tabName: '10-18',
            date:'星期五'
          }, {
            id: 4,
            tabName: '10-18',
            date:'星期五'
          }, {
            id: 5,
            tabName: '10-18',
            date:'星期五'
          }
        ],
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
        schedule:[
          {
            time:'10:00-12:00',
            classStyle:'科目二',
            classdetail:'1/3',
            name:'cc',
            sex:'女',
            tel:'18501190475',
            finishclass:'12',
            licenseType:'C1',
            classType:'普通班',
            status:'待确认'
          },
          {
            time:'13:00-15:00',
            classStyle:'科目二',
            classdetail:'1/3',
            name:'cc',
            sex:'女',
            tel:'18501190475',
            finishclass:'12',
            licenseType:'C1',
            classType:'普通班',
            status:'待确认'
          }
        ]
      }
    },
    onShow(){
      // this.getToken();
    },
    onLoad(){
      // console.log('onload');
      var myDate = new Date();//获取系统当前时间
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var strDate = myDate.getDate();
      var h = myDate.getHours(); //获取系统时，
      var m = myDate.getMinutes(); //分
      this.date = year+'-'+month+'-'+strDate;
      this.coachId = wx.getStorageSync("userId");
      this.getClassList(this.getDays(0));
      //var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
      //var myDate = new Date(Date.parse(this.getDays(0)));  
      //console.log(weekDay[myDate.getDay()]);
      // this.day.push(weekDay[myDate.getDay()])
    },
    computed:{
      getLeftDates(){//获取近8天日期
        console.log('computed')
        let dayArr = [];
        var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
        for(var i = -1;i<6;i++){
          var myDate = new Date(Date.parse(this.getDays(i)));
          // dayArr.push(this.getDays(i))
          dayArr.push({time:this.getDays(i),day:weekDay[myDate.getDay()]})
        }
        console.log(dayArr)
        return dayArr;
      }
    },
    created(){console.log('created')},
    methods:{
      // 校验token
      getToken(){
        let token = wx.getStorageSync('token');
        this.$httpWX.get({
          url:this.$api.timetable.checkAuthentication+"/"+token,
          data:{

          }
        }).then(res=>{
          console.log('token',res);
          if(res.status.code * 1 !== 10){
            wx.showLoading();
            wx.hideLoading();
            setTimeout( () => {
              wx.showToast({
                title: '请重新登录!',
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            wx.reLaunch({
              url:"/pages/login/main"
            })
          }
        })
      },
      cc(){return 1},
      changeTab: function (date,tabindex) {
        console.log(date);
        //this.content = tabname;
        this.getClassList(date.time);
        this.activeIndex = tabindex;
      },
      goCancel(){
        this.visible = false;
      },
      goConfirm(){
        this.$httpWX.post({
            url: this.$api.timetable.sign,
            data: {
              courseRecordId: this.courseRecordId,
              userType: "employee"
            }
          })
        .then(res => {
          console.log(res)
          wx.showToast({
            title: res.status.message,
            icon: 'succes',
            duration: 1000,
            mask:true
          })
          this.visible = false;
          this.getClassList(this.getDays(0));
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
            this.$httpWX
            .post({
              url: this.$api.timetable.gerRecordByCoach,
              data: {
                coachId: this.coachId,
                trainingDate: day
              }
            })
            .then(res => {
              console.log(this.coachId+','+day)
              console.log(res)
              if(res.status.code=='10'){
              this.dataList = res.content;
              }
            });
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
      this.getClassList(this.getDays(this.activeIndex-1));
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

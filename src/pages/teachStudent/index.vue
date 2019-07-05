<template>
  <div class="wrap">
    <!-- 在教学员 -->
    <div class="header">
      <ul>
        <li class="lis" v-for="(item,index) in list" :key="index" @click="getTab(index)">
          <p :class="{active:num==index}">{{item}}</p>
          <h3 v-if="num==index"></h3>
        </li>
        <li>
          <i-con
            :i-class="show?'active':'play_fill'"
            type="packup"
            size="24"
            @click="getRiseOrder()"
          />
          <i-con
            :i-class="isShow?'play_active':'play'"
            type="unfold"
            size="24"
            @click="getDropOrder()"
          />
          <!-- <i-con :i-class="show?'active':'play_fill'" type="play_fill" size="24" @click="getRiseOrder()"></i-con>
          <i-con :i-class="isShow?'play_active':'play'" type="play_fill" size="24" @click="getDropOrder()"></i-con>-->
        </li>
        
        <!-- <li class="lis" @click="getQueryAll">
          <p>全部</p>
        </li>
        <li class="lis" @click="query('weeks')">
          <p>周内</p>
        </li>
        <li class="lis" @click="query('month')">
          <p>月内</p>
        </li>
        <li class="lis">
          <p>3月内</p>
        </li>
        <li class="lis">
          <p>6月内</p>
        </li>
        <li class="lis">
          <p>6月以上</p>
        </li>-->
      </ul>
    </div>
    <div class="centerWrap">
      <div class="contBox" v-for="(item,idx) in cont" :key="idx">
        <i-row i-class="row-wrap">
          <i-col span="12" i-class="l">
            <p class="text-name">{{item.studentName==null?'':item.studentName}}</p>
          </i-col>
          <i-col span="12" i-class="r">
            <p class="text-phone"  @click="getPhone(item.studentPhone)">
              <van-icon name="phone-o" size="14px" color="#fb6f14" />
              拨打电话
            </p>
          </i-col>
        </i-row>
        <i-row i-class="row-bottom" v-if="item.part!=null">
          <i-col span="8" i-class="col-l">
            <p>最近预约课程</p>
          </i-col>
          <i-col span="6" i-class="col-c">
            <p>{{item.part==null?'':item.part}}</p>
          </i-col>
          <i-col span="10" i-class="col-r">
            <p>{{item.trainTime==null?'':item.trainTime}}</p>
          </i-col>
        </i-row>
      </div>
    </div>


    <!-- <div class="center">
      <div class="row" v-for="(item,idx) in cont" :key="idx">
        <i-row>
          <i-col i-class="icol" span="8">
            <p>{{item.studentName==null?'':item.studentName}}</p>
          </i-col>
          <i-col i-class="icol" span="8">
            <p>{{item.part==null?'':item.part}}</p>
          </i-col>
          <i-col i-class="icol" span="8">
            <h3 @click="getPhone(item.studentPhone)">
              <i class="iconfont icon-phone" style="color:#3cdd91;"></i>
            </h3>
          </i-col>
          <p style="font-size:28rpx;margin-left:60rpx;">{{item.trainTime==null?'':item.trainTime}}</p>
        </i-row>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      num: "",
      show: true,
      isShow: false,
      list: ["全部", "周内", "月内", "3月内", "6月内", "6月以上"],
      coachId: wx.getStorageSync("userId"),
      date:"",
      weeks:"", // 周内
      months:"", // 月内
      threeMonth:"", // 3月内
      sixMonth:"", // 6月内
      sixTopMonth:"",  // 6月以上
      formTimes:{
        coachId: wx.getStorageSync("userId"),
        queryStartTime:"",
        queryEndTime:""
      },
      cont: [
        {
          name: "马经纬",
          subject: "C1",
          time: "2018/10/11"
        },
        {
          name: "马经纬",
          subject: "C1",
          time: "2018/10/11"
        },
        {
          name: "马经纬",
          subject: "C1",
          time: "2018/10/11"
        },
        {
          name: "马经纬",
          subject: "C1",
          time: "2018/10/11"
        },
        {
          name: "马经纬",
          subject: "C1",
          time: "2018/10/11"
        }
      ]
    };
  },
  onLoad() {
    this.getQueryAll();
    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m =
          dd.getMonth() + 1 < 10
            ? "0" + (dd.getMonth() + 1)
            : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
      }
      this.date = GetDateStr(0); // 当前日期
      this.weeks = GetDateStr(-7); // 周内
      this.months = GetDateStr(-30); // 月内
      this.threeMonth = GetDateStr(-90); // 3月内
      this.sixMonth = GetDateStr(-180); // 6月内
      this.sixTopMonth = GetDateStr(-180);  // 半年以上
  },
  methods: {
    getPhone(studentPhone) {
      wx.makePhoneCall({
        phoneNumber: studentPhone
      });
    },
    getQueryAll() {
      this.$httpWX
        .post({
          url: this.$api.student.myStudents,
          data: {
            coachId: wx.getStorageSync("userId")
          }
        })
        .then(res => {
          console.log(res);
          this.cont = res.content;
        });
    },
    // 升序
    getRiseOrder() {
      this.show = true;
      this.isShow = false;
      this.$httpWX
        .post({
          url: this.$api.student.myStudents,
          data: {
            coachId: wx.getStorageSync("userId")
          }
        })
        .then(res => {
          console.log(res);
          this.cont = res.content;
          console.log(res.content.sort(function(a,b){return b.trainTime < a.trainTime ? 1 : -1 }));
        });
    },
    // 降序
    getDropOrder() {
      this.show = false;
      this.isShow = true;
      this.$httpWX
        .post({
          url: this.$api.student.myStudents,
          data: {
            coachId: wx.getStorageSync("userId")
          }
        })
        .then(res => {
          console.log(res);
          this.cont = res.content;
          console.log(res.content.sort(function(a,b){return b.trainTime < a.trainTime ? -1 : 1 }));
        });
    },
    getTab(index) {
      this.num = index;
      if(index == "0"){
        this.formTimes.coachId=wx.getStorageSync("userId")
        this.formTimes.queryEndTime="",
        this.formTimes.queryStartTime="";
      }else if(index == "1"){
        this.formTimes.coachId=wx.getStorageSync("userId");
        this.formTimes.queryEndTime=this.date;
        this.formTimes.queryStartTime=this.weeks;
      }else if(index == "2"){
        this.formTimes.coachId=wx.getStorageSync("userId");
        this.formTimes.queryEndTime=this.date;
        this.formTimes.queryStartTime=this.months;
      }else if(index == "3"){
        this.formTimes.coachId=wx.getStorageSync("userId");
        this.formTimes.queryEndTime=this.date;
        this.formTimes.queryStartTime=this.threeMonth;
      }else if(index == "4"){
        this.formTimes.coachId=wx.getStorageSync("userId");
        this.formTimes.queryEndTime=this.date;
        this.formTimes.queryStartTime=this.sixMonth;
      }else if(index == "5"){
        this.formTimes.coachId=wx.getStorageSync("userId");
        this.formTimes.queryEndTime=this.sixTopMonth;
        this.formTimes.queryStartTime="";
        // this.formTimes.queryStartTime=this.sixTopMonth;
      }
      this.$httpWX
        .post({
          url: this.$api.student.myStudents,
          data:this.formTimes
        })
        .then(res => {
          console.log(res);
          this.cont = res.content;
        });
    },

    //获取时间、
    //时间解析;
    Time: function(now) {
      let year = new Date(now).getFullYear();
      let month = new Date(now).getMonth() + 1;
      let date = new Date(now).getDate();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      return year + "-" + month + "-" + date;
    },
    //本周第一天；
    showWeekFirstDay: function() {
      let Nowdate = new Date();
      let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      let M = Number(WeekFirstDay.getMonth()) + 1;
      if (M < 10) {
        M = "0" + M;
      }
      let D = WeekFirstDay.getDate();
      if (D < 10) {
        D = "0" + D;
      }
      return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
    },
    //本周最后一天
    showWeekLastDay: function() {
      let Nowdate = new Date();
      let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
      let M = Number(WeekLastDay.getMonth()) + 1;
      if (M < 10) {
        M = "0" + M;
      }
      let D = WeekLastDay.getDate();
      if (D < 10) {
        D = "0" + D;
      }
      return WeekLastDay.getFullYear() + "-" + M + "-" + D;
    },
    //获得某月的天数：
    getMonthDays: function(myMonth) {
      let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
      let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
      let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
      return days;
    },
    //点击事件
    query: function(way) {
      //  let self=this;
      //  this.$refs.pag.currentPage=1;
      //  this.page=this.$refs.pag.currentPage;
      switch (way) {
        case "today":
          this.startTime = this.maxTime;
          this.endTime = this.maxTime;
          break;
        case "yesterday":
          this.startTime = this.Time(
            new Date().getTime() - 24 * 60 * 60 * 1000
          );
          this.endTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
          break;
        case "weeks":
          this.startTime = this.showWeekFirstDay();
          this.endTime = this.showWeekLastDay();
          break;
        case "lastWeek":
          this.startTime = this.Time(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - new Date().getDay() - 6
            )
          );
          this.endTime = this.Time(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + (6 - new Date().getDay() - 6)
            )
          );
          break;
        case "month":
          this.startTime = this.Time(
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          );
          this.endTime = this.maxTime;
          break;
        case "lastMonth":
          this.startTime = this.Time(
            new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
          );
          this.endTime = this.Time(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              this.getMonthDays(new Date().getMonth() - 1)
            )
          );
          break;
      }
      this.$httpWX
        .post({
          url: this.$api.student.myStudents,
          data: {
            coachId: wx.getStorageSync("userId"),
            queryStartTime: this.startTime,
            queryEndTime: this.endTime
          }
        })
        .then(res => {
          console.log(res);
          this.cont = res.content;
        });
    }
  },
     /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.getQueryAll();
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    height: auto;
    background: #fff;
    ul {
      width: 100%;
      padding: 30rpx 0;
      overflow: hidden;
      border-bottom:0.5px solid #ebebeb;
      li {
        float: left;
      }
      li:last-child {
        width: 12%;
        height: 50rpx;
        line-height: 50rpx;
        border-left: 1rpx solid #d3d3d3;
        text-align: center;
        position: relative;
        .play_fill {
          // transform: rotate(-90deg);
          position: absolute;
          top: -18rpx;
          left: 30%;
          color: #d9d9d9;
        }
        .active {
          // transform: rotate(-90deg);
          position: absolute;
          top: -18rpx;
          left: 30%;
          color: #ff3f00;
        }
        .play {
          // transform: rotate(90deg);
          position: absolute;
          top: 40%;
          left: 31%;
          color: #d9d9d9;
        }
        .play_active {
          // transform: rotate(90deg);
          position: absolute;
          top: 40%;
          left: 31%;
          color: #ff3f00;
        }
      }
      .lis {
        padding: 0 25rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        // border-left: 1rpx solid #d3d3d3;
        position: relative;
        p {
          font-size: 24rpx;
          color: #676767;
        }
        .active {
          color: #fd5c1f;
          border-bottom: 2px solid #fd5c1f;
        }
        h3 {
          width: 50%;
          height: 10rpx;
          text-align: center;
          // margin: 0 auto;
          border-radius: 10rpx;
          // background: -webkit-linear-gradient(left, #f41856, #e65179);
          position: absolute;
          bottom: -10rpx;
        }
      }
    }
  }
  .centerWrap{
    width: 100%;
    height: auto;
    background: #fff;
    margin: 20rpx 0;
    .contBox{
      padding:30rpx;
      border-bottom: 2px solid #efefef;
      .row-wrap{
        font-size: 28rpx;
        .l{
          color: #4f4f4f;
        }
        .r{
          text-align: right;
          color: #fb6f14;
        }
      }
      .row-bottom{
        font-size: 24rpx;
        color:#979797;
        padding-top: 20rpx;
        .col-l{
        }
        .col-r{
          text-align: right;
        }
      }
    }
  }
  .center {
    width: 92%;
    height: auto;
    overflow: hidden;
    background: #fff;
    margin: 30rpx auto;
    // padding: 0 20rpx;
    border-radius: 20rpx;
    .row {
      border-bottom: 1rpx solid #e5e5e5;
      padding: 30rpx 0;
      .icol {
        font-size: 24rpx;
        color: #676767;
        text-align: center;
        line-height: 60rpx;
        h3 {
          width: 130rpx;
          height: 60rpx;
          line-height: 60rpx;
          margin: 0 auto;
          border-radius: 30px;
          background: fff;
          border: 1rpx solid #e5e5e5;
        }
      }
    }
    .row:last-child {
      border-bottom: none;
    }
  }
}
</style>

<template>
  <div class="wrap">
    <!-- <div class="header">
      <span>特别提示:</span>默认时段为全部关闭，可通过“管理”来开启/关闭早晚班时段的课程，
      开启后日期降显示在下方，已被预约的课程不允许关闭。
    </div>-->
    <div class="content">
      <div class="card-boxHeader">
        <div class="boxLeft">
          <i-row>
            <i-col span="8">
              <picker
                  mode="date"
                  :value="date"
                  :start="date"
                  v-on:change="bindDateChange"
                >
                  <span style="margin-left:20rpx;">{{date}}</span>
                </picker>
            </i-col>
            <i-col span="8" style="text-align:center;">至</i-col>
            <i-col span="8">
              <picker mode="date" :value="dateTwo" :start="date" v-on:change="bindDateChangeTwo">
                  <span>{{dateTwo}}</span>
                </picker>
            </i-col>
          </i-row>
        </div>
        <div class="boxRight">搜索</div>
      </div>
      <div class="card-box">
        <div class="detail">
          <i-row>
            <div class="flex-box" v-for="(item,index) in arrays" :key="index">
              <div class="flex-item">{{item.startTime}}-{{item.endTime}}</div>
              <div class="flex-item">
                <i-switch :value="item.switchs" @change="onChange($event,index)" slot="footer"></i-switch>
              </div>
            </div>
          </i-row>
        </div>
      </div>
      <div>
        <i-modal :visible="visible_" :show-ok="showbtn" :show-cancel="showbtn">
          <view>
            <Calendar
              :months="months"
              :value="value"
              @next="next"
              @prev="prev"
              :events="events"
              lunar
              clean
              multi
              @select="select"
              ref="calendar"
              @selectMonth="selectMonth"
              @selectYear="selectYear"
              :disabled="disabledArray"
            />
          </view>
          <view class="btn-group">
            <button @click="handleok">确定</button>
            <button @click="handlecancle">取消</button>
          </view>
        </i-modal>
      </div>
    </div>
  </div>
</template>
<script>
import calendar from "@/components/calendar";
import Calendar from "mpvue-calendar";
import "mpvue-calendar/src/style.css";
export default {
  components: {
    Calendar
  },
  created() {},
  data() {
    return {
      showbtn: false,
      visible_: false,
      num: "",
      date: "",
      dateTwo: "",
      dates: [],
      arrays: [
        {
          startTime: "06:00",
          endTime:"07:00",
          switchs: false
        },
        {
          time: "06:00-07:00",
          switchs: false
        },
        {
          time: "06:00-07:00",
          switchs: false
        }
      ],

      disabledArray: ["2018-6-27", "2018-6-25"], //禁用日期
      events: { "2018-6-7": "今日备注", "2018-6-8": "一条很长的明日备注" }
    };
  },
  onLoad(){
    this.getQueryAll();
  },
  methods: {
    getQueryAll(){
      this.$httpWX.get({
        url:"/v1/aplus-jx-study/time/interval/getOvertimeInterval/"+wx.getStorageSync('timeIntervalId'),
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.date = res.content.startDate;
        this.dateTwo = res.content.endDate;
        this.arrays = res.content.times;
      })
    },
    onChange(event, i) {
      this.arrays[i].switchs = event.target.value;
    },
    bindDateChange: function(e) {
      this.date = e.target.value;
    },
    bindDateChangeTwo(e) {
      this.dateTwo = e.target.value;
    },
    handleCalendar(i) {
      this.visible_ = true;
      this.num = i;
    },
    handleClose() {
      debugger;
      this.visible_ = false;
    },
    //日历相关
    selectMonth(month, year) {
      console.log(year, month);
    },
    prev(month) {
      console.log(month);
    },
    next(month) {
      console.log(month);
    },
    selectYear(year) {
      console.log(year);
    },
    setToday() {
      this.$refs.calendar.setToday();
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23);
      console.log(info);
    },
    renderer() {
      this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
    },
    select(val, val2) {
      console.log(val2);
      var index_ = this.num;
    },
    handleok() {
      this.visible_ = false;
    },
    handlecancle() {
      this.visible_ = false;
    }
  }
};
</script>
<style lang="scss">
.header {
  padding: 15px;
  font-size: 14px;
  color: #5d5d5d;
}
.header span {
  color: #5f5f5f;
  margin-right: 6px;
}
.card-box {
  width: 90%;
  margin: 15px auto;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  font-size: 12px;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;
}
.card-boxHeader{
  width: 90%;
  margin: 15px auto;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;
}
.card-boxHeader .boxLeft{
  width: 80%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  float: left;
}
.card-boxHeader .boxRight{
  width: 18%;
  height: 40px;
  line-height: 40px;
  font-size: 24rpx;
  color:#fff;
  background: #ff3f00;
  float: right;
  text-align: center;
}
.card-box .box-heards {
  background: #fff!important;
  border-radius: 6px!important;
  color: black!important;
  padding: 8px!important;
}
.card-box .box-heard {
  background: -webkit-linear-gradient(left, #888fa1, #bfc2c7) !important;
  border-radius: 6px 6px 0 0;
  color: #fff;
  padding: 8px;
}
.bnt_ {
  height: 30px;
  line-height: 30px;
}
.detail {
  padding: 10px;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
.flex-item {
  color: 12px;
  padding: 3px 6px;
}
.btn-group button {
  width: 30%;
  display: inline-block;
  margin: 5px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #f41856;
  font-size: 14px;
}
</style>

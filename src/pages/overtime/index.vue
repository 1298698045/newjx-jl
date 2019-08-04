<template>
  <div class="wrap" :style="{height:(height)}">
    <div class="content">
      <div class="card-boxHeader">
        <div class="boxLeft">
          <i-row>
            <i-col span="8">
              <picker mode="date" :value="date" :start="date" v-on:change="bindDateChange">
                <span style="margin-left:20rpx;">{{date}}</span>
              </picker>
            </i-col>
            <i-col span="8" style="text-align:center;">至</i-col>
            <i-col span="8">
              <picker
                mode="date"
                :value="dateTwo"
                :range="approverArray"
                :start="date"
                v-on:change="bindDateChangeTwo"
              >
                <!-- <span>{{dateTwo}}</span> -->
                <i-input i-class="inp" :value="dateTwo" disabled placeholder="结束时间"></i-input>
              </picker>
            </i-col>
          </i-row>
        </div>
        <div class="boxRight" @click="getSerach">搜索</div>
      </div>
      <div class="card-box">
        <div class="flex-box" v-for="(item,index) in arrays" :key="index">
          <div class="flex-item">{{item.courseDate}}</div>
          <div class="flex-item" style="font-weight:bold;">{{item.startTime}}-{{item.endTime}}</div>
          <div class="flex-item">
            <!-- {{item.class}} -->
            <span :class="item.enableFlag=='1'?'start_span':''">{{item.status==0?'关闭':item.status==1?'开启':'锁定'}}</span>
            <i-switch
              :i-class="item.status==1?'i-switch-checked':''"
              :value="item.status==0?false:item.stauts==1?true:''"
              @change="onChange($event,index,item)"
              :disabled="item.placeNum!=0&&item.studentNum!=0?true:false"
              slot="footer"
            ></i-switch>
          </div>
        </div>
      </div>
      <!-- <div class="bottom-btn">
        <button @click="routeTo">管理早晚班</button>
      </div>-->
    </div>
    <i-modal i-class="modal" :visible="visible" :show-ok="false" :show-cancel="false">
      <div class="header">您好，您的课程已被预约！</div>
      <i-button i-class="ibtn" @click="getSubmit">确认</i-button>
    </i-modal>
  </div>
</template>
<script>
export default {
  components: {},
  created() {
    var myDate = new Date(); //获取系统当前时间
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var strDate = myDate.getDate();
    this.date = year + "-" + month + "-" + strDate;
  },
  data() {
    return {
      visible: false,
      date: "",
      dateTwo: "",
      approverArray: "结束时间",
      disabledArray: ["2018-6-27", "2018-6-25"], //禁用日期
      events: { "2018-6-7": "今日备注", "2018-6-8": "一条很长的明日备注" },
      arrays: [
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        },
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        },
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        },
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        },
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        },
        {
          date: "2018-10-10",
          time: "06:00-07:00",
          class: false
        }
      ],
      page: 1,
      pageSize: 10,
      isPage: true, // 是否可以翻页
      height:"",
      disabled:false,
      employeeId:""
    };
  },
  onLoad() {
    // this.getQueryAll();
    // this.getQuery();
    this.employeeId = wx.getStorageSync('employeeId');
    this.query();
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        // that.height=res.windowHeight - res.windowWidth / 750 * 94 + "px";
        that.height = res.windowHeight + 'px';
      }
    });
    console.log(this.height);
  },
  methods: {
    query(isNew){
      this.$httpWX.post({
        url:this.$api.work.query,
        data:{
          params:{
            coachId:this.employeeId
          },
          pagination:{
            current:this.page,
            pageSize:this.pageSize
          }
        }
      }).then(res=>{
        console.log(res);
        this.arrays = res.data.list;
        if (this.page * this.pageSize <= res.data.pagination.total) {
            this.isPage = true;
          } else {
            this.isPage = false;
          }
          let temp = [];
          if (this.page == 1) {
            temp = res.data.list;
          } else {
            temp = this.arrays.concat(res.data.list);
          }
          this.arrays = temp;
          console.log(this.arrays);
      })
    },
    // 日期
    getQueryAll() {
      this.$httpWX
        .get({
          url:
            this.$api.work.getOvertimeInterval + "/" +
            wx.getStorageSync("timeIntervalId"),
          data: {}
        })
        .then(res => {
          console.log(res);
          this.date = res.content.startDate;
          this.dateTwo = res.content.endDate;
          // this.arrays = res.content.times;
        });
    },
    // 搜索
    getSerach() {
      this.$httpWX
        .post({
          url: this.$api.work.query,
          data: {
            coachId: this.employeeId,
            startDate: this.date,
            endDate: this.dateTwo
          }
        })
        .then(res => {
          this.arrays = res.data.list;
        });
    },
    onChange(event, i, item) {
      if (this.arrays[i].status == 0) {
        this.$httpWX
          .post({
            url: this.$api.work.start,
            data: {
              params:{
                courseIds:[item.id]
              }
            }
          })
          .then(res => {
            wx.showLoading();
            wx.hideLoading();
            setTimeout( () => {
              wx.showToast({
                title: res.msg,
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            if(res.code==0){
              this.arrays[i].status = true;
            }
          });
      } else if (this.arrays[i].status == 1) {
        this.$httpWX
          .post({
            url: this.$api.work.stop,
            data: {
              params:{
                courseIds:[item.id]
              }
            }
          })
          .then(res => {
            wx.showLoading();
            wx.hideLoading();
            setTimeout( () => {
              wx.showToast({
                title: res.msg,
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            if(res.code==0){
              this.arrays[i].status = false;
            }
          });
      }
    },
    getSubmit() {
      this.visible = false;
    },
    bindDateChange: function(e) {
      this.date = e.target.value;
    },
    bindDateChangeTwo(e) {
      this.dateTwo = e.target.value;
    },
    getQuery(isNew) {
      this.$httpWX
        .post({
          url: this.$api.work.queryAll,
          data: {
            // enableFlag:1,
            coachId: wx.getStorageSync("userId"),
            overtimeFlag: 1,
            pageNo: this.page,
            pageSize: this.pageSize,
            trainingDateStart: this.date,
            trainingDateEnd: this.dateTwo
          }
        })
        .then(res => {
          console.log(res);
          this.arrays = res.content.item;
          if (this.page * this.pageSize <= res.content.totalNum) {
            this.isPage = true;
          } else {
            this.isPage = false;
          }
          let temp = [];
          if (this.page == 1) {
            temp = res.content.item;
          } else {
            temp = this.arrays.concat(res.content.item);
          }
          this.arrays = temp;
          console.log(this.arrays);
        });
    },
    routeTo() {
      wx.navigateTo({
        url: "/pages/overtimeControl/main"
      });
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.isPage = true;
    this.page = 1;
    this.query();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.isPage) {
      this.page++;
      this.query();
    }
  }
};
</script>
<style lang="scss">
.card-boxHeader {
  width: 90%;
  margin: 15px auto;
  // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;
}
.card-boxHeader .boxLeft {
  width: 80%;
  // height: 40px;
  line-height: 40px;
  background: #fff;
  float: left;
}
.card-boxHeader .boxRight {
  width: 18%;
  // height: 40px;
  line-height: 40px;
  font-size: 24rpx;
  color: #fff;
  background: #ff3f00;
  float: right;
  text-align: center;
}
.card-box {
  width: 90%;
  margin: 15px auto;
  // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  font-size: 12px;
  border-radius: 6px;
  font-size: 14px;
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
  .i-switch-checked{
    border-color: #08b906!important;
    background: #08b906!important;
  }
  span{
    font-size: 24rpx;
    color: #a4a4a4;
    margin-right: 20rpx;
  }
  .start_span{
    color: #08b906;
  }
  .locking_span{
    color: #fb1c15;
  }
}
// .flex-item:last-child{
//   text-align: center;
//   border-radius: 30rpx;
//   width: 100rpx;
//   border:1rpx solid #ccc;
// }
.inp {
  padding: 10rpx !important;
}
.bottom-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.bottom-btn button {
  height: 120rpx !important;
  line-height: 120rpx !important;
  border-radius: 0 !important;
  background: #ff3f00;
  // background:-webkit-linear-gradient(left, #F41856 , #E65179)!important;
  color: #fff;
}
.modal .header {
  margin: 30rpx 0;
  color: black;
  font-size: 28rpx;
}
.modal .ibtn {
  width: 220rpx !important;
  height: 60rpx !important;
  line-height: 60rpx !important;
  margin: 0 auto !important;
  margin-bottom: 30rpx !important;
  font-size: 28rpx !important;
  color: #fff !important;
  background: #ff3f00 !important;
  border-radius: 30rpx;
}
</style>

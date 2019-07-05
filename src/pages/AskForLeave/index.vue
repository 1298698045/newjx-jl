<template>
  <div class="wrap">
    <div class="center">
      <i-row i-class="rows">
        <i-col span="16" i-class="colL">
          <div class="left">
            <p>{{carStyle==null?'0':carStyle}}</p>
            <h3>本周剩余休假次数</h3>
          </div>
        </i-col>
        <i-col span="8" i-class="colR">
          <p @click="record">
            <i-icon type="activity" size="20" color="#fb7015" />
            休假记录</p>
        </i-col>
      </i-row>

      <div class="boxWrap">
        <div class="container">
          <i-row i-class="row">
            <i-col span="6" i-class="l">
              <p>休息日期</p>
            </i-col>
            <picker mode="date" :value="date" v-on:change="bindDateChange">
              <i-col span="18" i-class="r">
                  <p>{{date}}</p>
                  <i-icon type="activity" size="20" i-class="icon" color="#fb7015"/>
              </i-col>
            </picker>
          </i-row>
          <i-row i-class="row-panel">
            <i-col span="6" i-class="col-l">
              <p>休息时间</p>
            </i-col>
            <i-col span="18" i-class="col-r">
              <div>
                <button :class="active1?'active':am=='1'?'act':''"  :disabled="am=='0'?false:true" @click="handleTime('am')">
                  上午<span style="font-size:24rpx;color:#fb7015;margin-left:10rpx;" v-if="am=='1'">已约</span></button>
                <button :class="active2?'active':pm=='1'?'act':''"  :disabled="pm=='0'?false:true" @click="handleTime('pm')">
                  下午<span style="font-size:24rpx;color:#fb7015;margin-left:10rpx;" v-if="pm=='1'">已约</span></button>
              </div>
            </i-col>
          </i-row>

          <div class="footer">
            <button @click="getSubmit" :disabled="disabled">申请休假</button>
          </div>
        </div>
      </div>
    </div>


    <div class="contents">
      <!-- <div class="card-box">
        <i-row i-class="row-class">
          <i-col span="16" i-class="border-right">
            <div>
              <span class="title_info">本周剩余调休次数:</span>
              <span style="color:#ff3f00;">{{carStyle==null?'0':carStyle}}次</span>
            </div>
          </i-col>
          <i-col span="8" i-class="right-col">
            <div style="text-align:center;font-size:14px;" @click="record">休假记录</div>
          </i-col>
        </i-row>
      </div>
      <div class="card-box">
        <i-row i-class="row-class">
          <i-col span="16" i-class="border-right">
            <div>
              <span class="title_info">休息日期:</span>
              {{date}}
            </div>
          </i-col>
          <i-col span="8" i-class="right-col">
            <picker mode="date" :value="date" v-on:change="bindDateChange">
              <i-icon type="activity" size="20"/>
            </picker>
          </i-col>
        </i-row>
        <i-row style="padding:10px;">
          <span class="title_info" style="margin-top:15px;">休息时间</span>
          <div class="flex-box">
            <div class="flex-item"  :class="active1?'choose':''" v-if="am=='0'" @click="handleTime('am')">上午</div>
            <div class="flex-item ordered" v-if="am=='1'">上午/已约
              <div class="mask"></div>
            </div>
            <div class="flex-item" :class="active2?'choose':''" v-if="pm=='0'" @click="handleTime('pm')">下午</div>
            <div class="flex-item ordered" v-if="pm=='1'">下午/已约
              <div class="mask"></div>
            </div>
          </div>
        </i-row>
      </div>
      <div>
        <i-row style="margin:25px 0;">
          <button class="btn_" @click="getSubmit" :disabled="disabled">保存</button>
        </i-row>
      </div> -->
      <div>
        <i-divider content="规则说明" color="#5e5e5e" lineColor="#BDBDBD"></i-divider>
      </div>
      <div class="footer_info">
        <p>1. 不可选择早于当前的日期，当天都可选。</p>
        <p>2. 仅可选择未被预约的时间，如需休息已被预约的时间，</p>
        <p>&nbsp;&nbsp;&nbsp;请联系您的直属上级。</p>
        <p>3. 单次休假0.5天</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:"",
      name: "cc",
      carStyle: "11",
      classStyle: "普通班",
      status: "科目二（进行中）",
      classtime: "20",
      send: "驾校分配",
      date: "",
      am:"",
      pm:"",
      active1: false,
      active2: false,
      orderAm: false,
      orderPm: true,
      disabled:true
    };
  },
  created() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    this.date = y + "-" + m + "-" + day;
  },
  onLoad() {
    this.getResidualTimes();
    this.$httpWX.post({
        url:this.$api.leave.gerRecordByCoachIdAndTime,
        data:{
          coachId:wx.getStorageSync('userId'),
          trainingDate:this.date
        }
      }).then(res=>{
        console.log(res);
        this.am = res.content.am;
        this.pm = res.content.pm;
      })
  },
  methods: {
    // 剩余次数
    getResidualTimes() {
      this.$httpWX
        .get({
          url:
            this.$api.leave.getOffTimes+"/" +
            wx.getStorageSync("userId"),
          data: {}
        })
        .then(res => {
          console.log(res);
          this.carStyle = res.content;
          if(this.carStyle == null){
            this.disabled = true;
          }
          if(this.carStyle == 0){
            this.disabled = true;
          }
        });
    },
    // 保存
    getSubmit(){
      this.$httpWX.post({
        url:this.$api.leave.off,
        data:{
          leaveDate:this.date,
          amFlag:this.value,
          coachId:wx.getStorageSync('userId'),
          coachName:wx.getStorageSync('coachName')
        }
      }).then(res=>{
        console.log(res);
        this.active1 = false;
        this.active2 = false;
        // wx.showToast({
        //   title: res.status.message,
        //   icon: 'none',
        //   duration: 2000
        // })
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
        },500);
        this.getResidualTimes();
      })
    },
    bindDateChange: function(e) {
      this.date = e.target.value;
      this.$httpWX.post({
        url:this.$api.leave.gerRecordByCoachIdAndTime,
        data:{
          coachId:wx.getStorageSync('userId'),
          trainingDate:this.date
        }
      }).then(res=>{
        console.log(res);
        this.am = res.content.am;
        this.pm = res.content.pm;
      })
    },
    handleTime(value) {
      if (value == "pm") {
        this.value = '1';
        console.log(this.value);
        this.disabled = false;
        this.active2 = true;
        this.active1 = false;
      } else if(value == "am"){
        this.value = '0';
        this.disabled = false;
        console.log(this.value)
        this.active1 = true;
        this.active2 = false;
      }
    },
    quitOut() {
      wx.redirectTo({
        url: "/pages/login/main"
      });
    },
    record() {
      wx.navigateTo({
        url: "/pages/vacationRecords/main"
      });
    }
  },
     /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.getResidualTimes();
      this.$httpWX.post({
          url:this.$api.leave.gerRecordByCoachIdAndTime,
          data:{
            coachId:wx.getStorageSync('userId'),
            trainingDate:this.date
          }
        }).then(res=>{
          console.log(res);
          this.am = res.content.am;
          this.pm = res.content.pm;
        })
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
.wrap{
  .center{
    width: 100%;
    height: 100%;
    .rows{
      overflow: hidden;
      .colL{
        overflow: hidden;
        .left{
          width: 112px;
          margin: 0 auto;
          float: right;
          p{
            width: 44px;
            height: 44px;
            background: #fb7015;
            text-align: center;
            color: #fff;
            line-height:44px;
            font-size: 26px;
            font-weight: bold;
            border-radius:50%;
            margin:30rpx 0 10rpx 30%;
          }
          h3{
            font-size: 28rpx;
            color: #9f9f9f;
          }
        }
      }
      .colR{
        font-size: 28rpx;
        color: #fb7015;
        text-align: right;
        p{
          margin-top: 35px;
          margin-right: 20rpx;
        }
      }
    }
    .boxWrap{
      width: 100%;
      height: auto;
      margin: 30rpx 0;
      background: #fff;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      font-size: 28rpx;
      .container{
        padding:20px;
        .row{
          .l{
            color: #4f4f4f;
            height:40px ;
            font-size: 28rpx;
            p{
              line-height: 40px;
            }
          }
          .r{
            height: 45px;
            line-height: 40px;
            background: #efefef;
            padding:0 20rpx;
            overflow: hidden;
            border-radius:5px;
            p{
              float: left;
            }
            .icon{
              float: right;
              line-height: 40px;
            }
          }
        }
        .row-panel{
          margin: 40rpx 0;
          .col-l{
            height: 34px;
            line-height: 34px;
            color: #4f4f4f;
          }
          .col-r{
            div{
              display: flex;
              button{
                width: 115px;
                height: 34px;
                line-height:34px;
                background: #fff;
                border:1rpx solid #979797;
                box-sizing: border-box;
                color: #4f4f4f;
                font-size: 28rpx;
              }
              button.active{
                border:1rpx solid #fb7015;
                color:#fb7015;
              }
              button.act{
                background: #f0f0f0;
                border:none;
              }
            }
          }
        }
        .footer{
          margin: 60px 0;
          button{
            width: 240px;
            height: 40px;
            line-height: 40px;
            background: #fb7015;
            border-radius: 21px;
            font-size:28rpx;
            color:#fff;
          }
        }
      }
    }
  }
}

.imgItem {
  height: 100%;
  width: 100%;
}
.card-box {
  width: 90%;
  margin: 15px auto;
  /* box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); */
  padding: 0 10px;
  background: #fff;
  font-size: 12px;
  border-radius: 6px;
}
.border-right {
  border-right: 1px solid #d4d4d4;
}
.row-class {
  border-bottom: 1px solid #eee;
  padding: 25px 0;
}
.right-col {
  padding-left: 10px;
  text-align: center;
}
.flex-box {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}
.flex-box .flex-item {
  width: 45%;
  border: 1px solid #ddd;
  text-align: center;
  padding: 7px 0;
  border-radius: 5px;
}
.flex-box .choose {
  background: #ff3f00;
  color: #fff;
  border: none;
}
.flex-box .ordered {
  background: #d9d9d9;
  color: #b1b0b0;
  position: relative;
}
.mask {
  width: 15px;
  height: 0;
  border-top: 30px solid #bdbdbd;
  border-left: 30px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.btn_ {
  background: #ff3f00;
  color: #fff;
  width: 85%;
  border-radius: 20px;
}
.footer_info {
  padding: 15px;
}
.footer_info p {
  color: #4f4f4f;
  font-size: 12px;
  margin: 5px 0;
}
.title_info {
  color: #979797;
  margin-right: 6px;
}
.inp{
  color:#ff3f00!important;
  height: 50rpx!important;
  padding:0!important;
}
</style>
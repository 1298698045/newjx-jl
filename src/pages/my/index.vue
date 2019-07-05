<template>
  <div class="wrap">
    <div class="headerWrap">
      <i-row i-class="row-wrap">
        <i-col span="4" i-class="l">
          <div class="img">
            <img src="/static/images/username-default.png" alt="">
          </div>
        </i-col>
        <i-col span="6" i-class="c">
          <p>{{name}}</p>
        </i-col>
        <i-col span="8" i-class="align">
          <div>
            <p>主职：{{dutyName}}</p>
            <p>兼职：</p>
          </div>
        </i-col>
        <i-col span="5" i-class="r">
          <div v-if="coachDetail.employeeQrCode==''" @click="getQRcode">
            <p><i class="iconfont icon-tu" style="font-size:50rpx;"></i></p>
            <p>生成二维码</p>
          </div>
          <div class="imgs"  v-if="coachDetail.employeeQrCode!=''" @click="getImgage">
            <img :src="qrcodeUrl+coachDetail.employeeQrCode" alt="" />
          </div>
        </i-col>
      </i-row>
    </div>
    <!-- 我的 -->
    <!-- <div class="header">
      <i-row i-class="row">
        <i-col span="4" style="text-align:center;">
          <image style="width:80rpx;height:80rpx;" src="/static/images/myicon.png"></image>
        </i-col>
        <i-col span="10">
          <p style="font-size:60rpx;font-weight:500;">{{name}}</p>
        </i-col> -->
        <!-- <i-col span="8" style="font-weight:bold;">
          <p style="margin-top:20rpx;">
            主职：
            <span>{{dutyName}}</span>
          </p>
        </i-col>
        <i-col span="6" style="font-weight:bold;">
          <p style="margin-top:20rpx;">
            兼职：
            <span></span>
          </p>
        </i-col> -->
        <!-- <i-col span="10">
          <div  v-if="coachDetail.employeeQrCode!=''" class="box" @click="getImgage">
            <image class="imgs" :src="qrcodeUrl+coachDetail.employeeQrCode"></image>
          </div>
          <i-button v-if="coachDetail.employeeQrCode==''" type="primary" @click="getQRcode">生成二维码</i-button>
        </i-col>
      </i-row>
      <i-row i-class="irow">
        <i-col span="8">
          <p>主职：{{dutyName}}</p>
        </i-col>
        <i-col span="6">
          <p>兼职：</p>
        </i-col>
      </i-row> -->
      <!-- <i-row>
        <i-col span="3" style="text-align:right;">
          <p><i class="iconfont icon-wode-fenji"></i></p>
        </i-col>
        <i-col span="12">
          <p style="font-size:24rpx;margin-left:20rpx;">一级部门/二级部门/三级部门</p>
        </i-col>
      </i-row> -->
    <!-- </div> -->
    <div class="container-wrap">
      <div class="centerWrap">
        <div class="cont-box"  @click="getClue">
          <div>
            <h3>{{clueCount}}</h3>
            <p>线索管理</p>
          </div>
        </div>
        <div class="cont-box" @click="toPage('/pages/teachStudent/main')">
          <div>
            <h3>{{studentCont}}</h3>
            <p>我的学员</p>
          </div>
        </div>
        <div class="cont-box" @click="getActivity">
          <div>
            <h3><i class="iconfont icon-huodongguanli" style="font-size:50rpx;"></i></h3>
            <p>活动管理</p>
          </div>
        </div>
        <!-- <div class="cont-box" @click="getAdmin">
          <div>
            <h3><i class="iconfont icon-tu" style="font-size:50rpx;"></i></h3>
            <p>海报管理</p>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="center"> -->
      <!-- <div class="left" @click="toPage('/pages/teachStudent/main')">
        <p><i class="iconfont icon-wode-zaixiaoxueyuan" style="font-size:60rpx;"></i></p>
        <p>我的学员</p>
        <h2>{{studentCont}}</h2>
        <p><i-icon size="24" color="#5e5e5e" type="enter" /></p>
      </div> -->
      <!-- 我的转介绍 -->
      <!-- <div class="right" @click="getToPage">
        <p><i class="iconfont icon-wodezhuanjieshao" style="font-size:60rpx;"></i></p>
        <p>我的转介绍</p>
        <h2>{{cont}}</h2>
        <p><i-icon size="24" color="#5e5e5e" type="enter" /></p>
      </div> -->
      <!-- <div class="right" @click="getClue">
        <p><i class="iconfont icon-wodezhuanjieshao" style="font-size:60rpx;"></i></p>
        <p>线索管理</p>
        <h2>{{clueCount}}</h2>
        <p><i-icon size="24" color="#5e5e5e" type="enter" /></p>
      </div>
    </div>
    <i-row i-class="fWrap" @click="getFeedback">
      <i-col span="20">
        <i-icon type="brush_fill" size="20" color="#d4d4d4" />
        <span>意见反馈</span>
      </i-col>
      <i-col span="4">
        <p style="text-align:right;">
          <i-icon type="enter" size="24" color="#4f4f4f" />
        </p>
      </i-col>
    </i-row>
    <!-- <div class="footer" @click="getAdmin">
      <i-row>
        <i-col :span="4">
          <p style="text-align:center;">
            <i class="iconfont icon-tu" style="font-size:50rpx;"></i>
          </p>
        </i-col>
        <i-col :span="16">
          <p style="font-size:28rpx;margin-top:10rpx;">海报管理</p>
        </i-col>
        <i-col :span="4">
          <p style="text-align:right;">
            <i-icon size="24" color="#5e5e5e" type="enter" />
          </p>
        </i-col>
      </i-row>
    </div> -->
    <!-- <div class="footer" @click="getActivity">
      <i-row>
        <i-col :span="4">
          <p style="text-align:center;">
            <i class="iconfont icon-tu" style="font-size:50rpx;"></i>
          </p>
        </i-col>
        <i-col :span="16">
          <p style="font-size:28rpx;margin-top:10rpx;">活动管理</p>
        </i-col>
        <i-col :span="4">
          <p style="text-align:right;">
            <i-icon size="24" color="#5e5e5e" type="enter" />
          </p>
        </i-col>
      </i-row>
    </div> -->
    <!-- <i-panel i-class="panel" @click="getAdmin">
      <p style="text-align:center;">海报管理</p>
    </i-panel> -->
    <i-row i-class="fWrap" @click="getFeedback">
        <i-col span="20">
          <i-icon type="brush_fill" size="20" color="#d4d4d4" />
          <span>意见反馈</span>
        </i-col>
        <i-col span="4">
          <p style="text-align:right;">
            <i-icon type="enter" size="24" color="#4f4f4f" />
          </p>
        </i-col>
    </i-row>
    <div class="footer">
        <button class="quitBtn" @click="quitOut">退出登录</button>
    </div>
    <i-modal i-class="modal" :visible="isModal" @ok="getOk" @cancel="getCanel">
      <div>
        <i-icon type="remind_fill" size="28" color="#fb6809" />
        <span>提示</span>
      </div>
      <p>确定要退出登录吗?</p>
    </i-modal>
  </div>
</template>
<script>
import { resolve } from 'path';
import { rejects, fail } from 'assert';
export default {
  created() {},
  data() {
    return {
      name:"",
      studentCont:"",
      cont:"",
      departmentName:"",
      dutyName:"",
      clueCount:"", // 线索管理
      coachDetail:{},
      coachSign:"", // 教练唯一标识
      qrcodeUrl:"https://aplusyx.oss-cn-beijing.aliyuncs.com/",
      isModal:false
    }
  },
  onShow(){
    // this.getQueryAll();
    // this.getToken();
    this.getCont();
    this.getStudent();
    this.getCheck().then(()=>{
      this.getClues();
    });
  },
  onLoad(){
    this.getQueryAll();
    this.getCont();
    this.getStudent();
    this.getCheck().then(()=>{
      this.getClues();
    });
  },
  methods: {
    // 意见反馈
    getFeedback(){
      const url = "/pages/feedback/main?name="+this.name;
      wx.navigateTo({url:url});
    },
    // 校验教练
    getCheck(){
      return new Promise((resolve,rejects)=>{
        this.$httpWX.get({
          url:this.$api.my.queryByTelphone+"/"+wx.getStorageSync('phone'),
          data:{

          }
        }).then(res=>{
          console.log(res);
          this.coachDetail = res.content;
          wx.setStorageSync('coachSign',this.coachDetail.code);
          resolve();
        })
      })
    },
    // 线索统计数量
    getClues(){
      this.$httpWX.get({
        url:this.$api.my.statistic+"/"+this.coachDetail.code,
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.clueCount = res.content;
      })
    },
    // 生成二维码
    getQRcode(){
      this.$httpWX.post({
        url:this.$api.my.generateWxCode,
        data:{
          url:"pages/clues/main?code="+this.coachDetail.code,
          telphone:wx.getStorageSync('phone')
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
        if(res.status.code === 10){
          this.getCheck();
        }
      })
    },
    // 图片
    getImgage(){
      wx.previewImage({
        urls: [this.qrcodeUrl+this.coachDetail.employeeQrCode]
      })
    },
    // 校验token
      getToken(){
        let token = wx.getStorageSync('token');
        this.$httpWX.get({
          url:this.$api.my.checkAuthentication+"/"+token,
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
    getStudent(){
      this.$httpWX.get({
        url:this.$api.my.myStudentCount+"/"+wx.getStorageSync('userId'),
        data:{

        }
      }).then(res=>{
        console.log(1,res);
        this.studentCont = res.content;
      })
    },
    getQueryAll(){
      this.$httpWX.get({
        url:this.$api.my.employee+"/" + wx.getStorageSync('userId'),
        data:{
          
        }
      }).then(res=>{
        console.log(res);
        this.name = res.content.name;
        this.departmentName = res.content.departmentName;
        this.dutyName = res.content.dutyName;
      })
    },
    // 转介绍总数
    getCont(){
      this.$httpWX.get({
        url:this.$api.my.getReferralsCount+"/" + wx.getStorageSync('userId'),
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.cont = res.content;
        wx.setStorageSync('cont',this.cont);
      })
    },
    toPage(urls){
      wx.navigateTo({
        url:urls
      })
    },
    getToPage(){
      wx.navigateTo({
        url:"/pages/myIntroduce/main"
      })
    },
    // 海报管理
    getAdmin(){
      wx.navigateTo({
        url:"/pages/posterAdmin/main"
      })
    },
    // 跳转线索管理
    getClue(){
      const url = '/pages/clue/main';
      wx.navigateTo({url:url});
    },
    // 跳转活动管理
    getActivity(){
      const url = '/pages/activity/main';
      wx.navigateTo({url:url});
    },
    // 退出登录
    quitOut(){
      this.isModal = true;
    },
    getCanel(){
      this.isModal = false;
    },
    getOk(){
      wx.redirectTo({
        url:'/pages/tLogin/main'
      })
      wx.removeStorageSync('token')
      this.isModal = false;
    },

    // 意见反馈
    getFeedback(){
      const url = '/pages/feedback/main';
      wx.navigateTo({url:url});
    }
  },
      /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.getQueryAll();
      this.getCont();
      this.getStudent();
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
@font-face {
  font-family: "iconfont";
  src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAfMAA0AAAAADrAAAAd2AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCYhEICo8sjCELHgABNgIkAzgEIAWFCAeBTBsgDFGUbNIjkH0kxu6hoMXIyJYLUcoVb0ZIMgvx/P6+OffdT6/aJhAVcHOC2iY49K1b+iYAJbzjcdO/l4SWSOtYNbQTk8pEK+jEAk3VYRY2J5vXpuLITJnr//X/26/VP4hItIdpKBxqun92fRCzQcTTpj3bkBIIcRPu0SOJbKEQ6saKTnFhZWZ3GdDbRL5wORKQnblcXV8KADdtB9bTeWiUGyD6FAoEjg8IAkABiNagOSAB1DZ2GYAd8OflH1qJFEAhMUDYtXmyZwrEfMk89XGhVmBYUKAekKh8g8lP8rF+gbBATczZ3EjBIL5kHpUnwhPtqV9rgopWekI96q/Hf1C9U71VvVZ5ACE0ihW8nqJsKMB/jwDUi1nba2cvS1JSUqkOAGMop55oQIOBi2ZCHScM0aABAUvGCzGMdux+/n4qVd2IAJqQBQaGUFSDZkyar/OF3v3S6PIYHM/1fuC7TKGqjfb1waA74PPrYcSSG3SAeCtSsvRmuVBB+durkMRWTdNQuUHcpEDAFLES8l2IAs8wpndFbLAr+kPO5TK43UanU+9wjEwx6PRpTWriKKADTwRaGmhlBvSFRjscOsHZcIOTdruNLlfOVo/p8fMmTZpuecE9e9m8eflZV7erLlRDFWc3vKOJsBnd7ghR73RGCDqHo9Rq14TgFWKUsCV7LEZpq20b7cG6CkGmrxQ32eQaes8N4XobqmK9sEFWo9ES1M8w9zzpsjtiHA69U+/QrV68ZAMdIB5attQUfN2ukbtcJfKiixz5LI0Hep7r/KcrixtlSqPBo1ZvFrbU5fSpFeZ122xb65mqhtnlpqqFi9bJOHP1mgU1r7YrdL7PMVoA7PRwHf+1RxFuU1QphlavowPENbLBleUBOONw2F0GZrT/IB+nU3QbfUa7XIZDbrTS1ctOUfb1QqVMtudE+OJe4MdgvbBGrFaY2BT9TTOm5o5qkQz9w109QlVD2CoEw5EHVv1zmrOuqFXu3mec6uWO2vFA3LLsnS6QYFmDfYG3SyLKI6AsOWJGd8Y/xD+s+wk+lOl+8qEzWH/8KxYQPSw6APuK+8N7H/KSdBh5iPxKHiZnxCQojzkJBp+ICdtjhvQy+byBbaSt1jZsg7b48UgpYkDM1k+WkpOgNuYo8e8fAeNRCVpk/y7v8V74pElJiU6HUQttB37t9k/9Pn3q/+lDvw8f+yeZEvvj58Cfvwb+oo/8A1ptxSZAyjQyREf0WyiNCWo8EPgZpEcJPL9vSZvTi5qENQk9X7GZ4ypOLmod1jn0YMVirpWtwXZTs0YhDfgumHXZegtuwZeux6y4dfV6+DUutTi83uB6djs3Db9Sb9jQZBcH1z2aruSmuqJYNyvDjMNRLNrFqet5Fe0ckhyVyFqs6oQoze6oZHWixZKoPmbcrYlKUFstbCIwWMMmWK0JLNkZ+unBNGWgsia/YEgwPT+/Rhlwxvuf5vCa1DkPjoMKjj+IQ4MHQRyxfKpuMfRUzUJWV6AWgwaGv+4xfGJxO9PUvrDn8A0OuMAlHvB4W8p57qdMrXky731n+NWbZ09atjhO2/EincGkl60swPPxHjN2ONkdz47tPzt8oJ/I+osAgKHw71HVnqq9dTfM31O9p29xs5I+1XtfsC9sV5+SZsV9j/fy+J2TFh2+7Fl8+eKLzWd2nnlx8com18nLRd4bpYVBPlcuBF64svmdC6FfoAjHp/mWPX5/vCZiGtWwf+OyrY2b+XTwadZo4ll5PFf1flo9RXx2/+rM/sr4+u3VWzFzqhHFJCZMSkoY3ho6+CdAcve43uH1G/Rt6tNn8FKEcAaUT3OTQ6dKpI3T0HEsNOA4SiC5QtB4/JS1rqFvFrUYJMEMRUUGVOHAxnb7Uy8yRGVUg8lFAWOqat24lMIyZ8zMRCiaOVOckiIx+n/l/wxQLjDNVJ/veEOr8fXlBNcfazQREQIIIeD3g6fQ+G2kX5fvUpqA5cH2mII1CRcAsIPl0E7pEdZNAHhZfkL19eoo6QDQpTpBD67SEIz1zKRa5pcxfQaiSayXEuOlGFoqAGclwAQagzzVVR8h3SZBio4U3uSQgZSpTLuuJAs0p8iKlCfkpLHEHe0iSKoAB2kSgFQACOFPLWH4Mpxw/FlihOsuSZBzRl74c0EUBt5ImnqSe5oaTyE8HMV94hRYRrFkn8FMHrmkblEMBThvNfnqkv/9wjKkKoDwowFa4UmjhGw4CoFvV642+eqp7J3wFFJExlyWHDLJhlOvzbds1iIraxK52Zft59AFSkmj1U1gMalNkxSCvhxYGouQPNlkr7Uss+EyEx7z3ZpmcGU6vKg0rVVxceo5GX87gG9X9d9RrwWmy5f5dCKrWposGY9irM58OMbIT83M9wGLlpSuztxg3osImGAIRwSSIC/kjaSIXKa8IONdlM7lmtNLiMKM7Ay/FD43LbvEwjdNKclIyyuhijO43MwMrmkKx1jGclOWF5hGY5stQdjJoEIuN1sC6l2NOZ0nq4iyvE9mSqlumsqnLh8Ln5MhZRmfkZX3WxNYY+Uykg0vL+EtJVwuAA==)
      format("woff2"),
    url(data:application/font-woff;charset=utf-8;base64,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)
      format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM8AA0AAAAAB3QAAALnAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCQhEICoJcgi4LCgABNgIkAxAEIAWFCAc7G1QGUVROymQ/EmxbxhuMzSzDIDQ2ixF269quRt/E89/vx2/te89XTZq8Id604gmqSWl/SBAyQ6eEP4Ro1aSE9/d2+fYutEq4Ov7dA1gGdGf0YBdXaTNpwH/m1/9zTb72A733/cKlVy0wHlXSeDig0QCj2lI8CmygUx3xBueNh5KdnqyFEPj4Lnoc8OXUhy5l38E0VoEmui4KDSl5Y4T2qh2vweXz37HY0Ix0it+1+5VMKPkVTNndNHC3mzAEa8fWtQBywRymuIUtoJRQ0DOkreP7AwEySgBpYCg/D8GdIUPQQIFxjOElcAgoAIw1HMAowYHOmNShY8g0bO/YOWoeaXYYcmhPx9H4qKcYCy9VTjdPIWXybBru9G5Rq416W+6/qppHOjwawRKWk+fR9sunppOIjjXTuqezBUWwOutlnvByVhy+Y7RoRHvulBXPnWc1ZanTilmypmq5HtzaqRItEF3xkaMG/VnV1FDVJdU1Vn/O6wit+60TBJeji4wMm4/TqBNOhon0MsdrGwF/3H8dmoTw63PYlZX/tpiJ1JeakdrnnB6c/sFU228FkHRD1v4GXuDcmK3vYJ/meQBBOHqOt1GcC/7Hp0pXmO70oK/DuAZC840pgP6e/dcAVYBCcRqG8pI1aJg0iQHAojcBrEiAgRh3CwaaMc9goBt3KKCMeytgxJQjAaPGfRUw6SBlMDBlKSO61AT2gQMxrwyaWfegmydHiuiDEas2YdS8W5h0x2/zKdsRsHORBEIj09iYQtCpCdkYhATwAjJ2TO7Ny32k/Id7Zshkg+jeADcgBDkeGgn4gS3d9OkLwjsQCSl2ZIhUSVLA2i331KSUvMjV/AKIpJ67SCkQ0sjI4ELgJIT4QlSV8QmEh0cohIiEEAfCIJMEjv19pQoiTSbDV3vyHVd5yaX7Dfh9AA/JyIjkSZYMrzgyCYMQHyzFrXhueTTTD5vZmGS8hWQYJ21eKWQiDUtOE3DYSMqiCQEA) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUUAA0AAAAAB3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAE+AAAABoAAAAchhGyIUdERUYAAATYAAAAHgAAAB4AKQAKT1MvMgAAAaAAAABCAAAAVjyNSBFjbWFwAAAB9AAAAD4AAAFCAA/pymdhc3AAAATQAAAACAAAAAj//wADZ2x5ZgAAAkAAAAEYAAABXC1mD1toZWFkAAABMAAAADAAAAA2E3LPFWhoZWEAAAFgAAAAHQAAACQHjQOFaG10eAAAAeQAAAAPAAAAEAwAADdsb2NhAAACNAAAAAoAAAAKAK4AAG1heHAAAAGAAAAAHwAAACABFQB8bmFtZQAAA1gAAAFJAAACiCnmEVVwb3N0AAAEpAAAACkAAAA7q7er1XjaY2BkYGAA4st5SRPj+W2+MnCzMIDADbOjPXDa/H8D83rmBiCXg4EJJAoARIMLmHjaY2BkYGBu+N/AEMPCAALM6xkYGVABCwBT8wMbAAAAeNpjYGRgYGBhKGBgZwABJiDmAkIGhv9gPgMAFEcBkgB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7P5J/JMzf8b2CIYW5gaAAKM4LkAN+VDBkAAHjaY2GAABYINgcAALcARAB42mNgYGBmgGAZBkYGELAB8hjBfBYGBSDNAoRA/jP5//8hpOQTqEoGRjYGGJOBkQlIMDGgAkaGYQ8AXmYHvwAAAAAAAAAAAAAArgAAeNp1jcFKw0AQhuffYDbsNg2xS6JbbEhsG+zBQxsb8BBBodinEKWU1pbWJ5DeCj6D7+DB1/HmKyh4sOqGgp6E+T/++YeZIU7598p6slYkKaRDOqcrWtCSCHFiq6AXd/tZO42rUEEYFyj9X946RjnivooQdM8Q/qKf+wWstJ142MK0ea8BZfNyPYz9WqtAWp5rIKzCA3v4Gtmc23jccbj9j0eEYb5Zn1xCjqWWk7nB3EDcCHSyl6Woy+WdwWyAeJ/pZlN7SnlsVNm87gk4nB3UO2AdvYtTt+aamqKiKigx3QZv+RDlD9cTYyEmMyFmRtfSY/fy4vNjIcTC6HbA3nUCJFkCFSls1uzZcltOPXJxpHUTIKIfm/s32HjafZA9TgMxEIWf8wckEkIgqF1RANr8lCkTKfQIpaNINt6QaNdeeZ1IOQEtFQeg5RgcgBsg0XIKXpZJkyJr7ejzm5nnsQGc4xsK/98l7oQVjvEoXMERMuEq9RfhGvlduI4WPoUb1H+Em7hVA+EWLtQbHVTthLub0m3LCmcYCFdwiifhKvWVcI38KlzHFT6EG9S/hJsY41e4hWtlqQzhYTBBYJxBY4oN4wIxHCySMgbWoTn0ZhLMTE83ehE7mzgbKO9XYpcDHmg554Ap7T23Zr5KJ/5gy4HUmG4eBUu2KY0uInQoG18snNXdqHOw/Z7ttrTYv2uBNcfsUQ1s1Pw92zPSSGwMr5CSNfIyt6QSU49oa6zxu2cp1vNeCIlOvMv0iMeaNHU6925p4sDi5/KMHH20uZI996gcPmNZCHm/3U7EIIpdhj+T2HEZAAAAeNpjYGKAAC4wyciADljAokyMTALl+SmpVRmliXlZmanFGYn5AD5rBuAAAAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwADAAEABAAAAAIAAAAAeNpjYGBgZACCq0vUOUD0DbOjPTAaAD9zBmgAAA==) format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff'),
       ;
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'iconfont';
    src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}
.icon-huodongguanli:before {
  content: "\e645";
}


.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-tu:before {
  content: "\e624";
}
.icon-rili:before {
  content: "\e618";
}

.icon-shanchu:before {
  content: "\e615";
}

.icon-tianjia-da:before {
  content: "\e61b";
}

.icon-tianjia-xiao:before {
  content: "\e61c";
}

.icon-wode:before {
  content: "\e621";
}

.icon-yemianweikong:before {
  content: "\e623";
}

.icon-dengluye-duigou:before {
  content: "\e619";
}

.icon-denglu-xiaoyanjing:before {
  content: "\e61d";
}

.icon-ranliaojilu-chexiao:before {
  content: "\e61e";
}

.icon-wode-fenji:before {
  content: "\e622";
}

.icon-wode-zaixiaoxueyuan:before {
  content: "\e627";
}
.icon-wodezhuanjieshao:before { content: "\e61f"; }
.wrap {
  width: 100%;
  height: 100%;
  .headerWrap{
    width: 100%;
    height: auto;
    background: #ff612c;
    .row-wrap{
      padding:30px 0;
      .l{
        .img{
          width: 45px;
          height: 45px;
          margin:0 auto;
          img{
            width: 100%;
            height: 100%;
            vertical-align:middle;
          }
        }
      }
      .c{
        font-size: 16px;
        color:#fff;
        font-weight: bold;
        p{
          line-height:45px;
        }
      }
      .align{
        font-size: 12px;
        color:#fff;
        div{
          margin-top: 8px;
        }
      }
      .r{
        font-size: 28rpx;
        color: #fff;
        p{
          text-align: center;
          i{
            color: #fff;
            font-size: 30px;
          }
        }
        .imgs{
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          img{
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .fWrap{
  background: #fff;
  margin-top: 35px;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
    color: #4f4f4f;
    font-size: 28rpx;
    padding: 20rpx;
}
.footer{
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
  div{
    padding-top:30rpx;
    span{
      font-size: 28rpx;
      color: #4f4f4f;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  p{
    color: #888888;
    padding: 30rpx 0;
  }
}


  .header {
    background: #fff;
    font-size: 28rpx;
    padding-bottom: 15rpx;
    .row {
      padding: 25rpx 10rpx;
      overflow: hidden;
      .box{
        width: 100rpx;
        height: 100rpx;
        float:right;
        margin-right:20rpx;
        .imgs{
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
    }
    .irow{
      margin-left: 130rpx;
    }
  }
  .container-wrap{
    background: #fff;
    .centerWrap{
      width: 90%;
      height: 90%;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      // padding:40rpx 20rpx;
      background:#fff;
      padding:20px 0;
      .cont-box{
        width: 159px;
        // height: 116px;
        background: #fff;
        box-shadow: 0px 4px 10px 0px 
      rgba(17, 17, 17, 0.12); 
        margin:10rpx 0;
        border-radius: 8px;
        padding:30px 0;
        div{
          text-align: center;
          h3{
            font-size: 30px;
            color:#fb6f14;
          }
          p{
            font-size:28rpx;
            color: #4f4f4f;
          }
        }
      }
    }
  }
  .center{
    width: 100%;
    margin-top: 20rpx;
    display: flex;
    .left{
      width: 46%;
      height: auto;
      background: #fff;
      border-radius: 20rpx;
      flex: 1;
      margin: 0 20rpx;
      text-align: center;
      padding-bottom: 30rpx;
      p:first-child{
        padding: 30rpx 0 10rpx 0;
      }
      p:nth-child(2){
        font-size: 28rpx;
      }
      h2{
        font-size: 60rpx;
        padding:30rpx 0 40rpx 0;
      }
    }
    .right{
      width: 46%;
      height: auto;
      background: #fff;
      border-radius: 20rpx;
      flex: 1;
      margin-right:20rpx;
      text-align: center;
      padding-bottom: 30rpx;
      p:first-child{
        padding: 30rpx 0 10rpx 0;
      }
      p:nth-child(2){
        font-size: 28rpx;
      }
      h2{
        font-size: 60rpx;
        padding:30rpx 0 40rpx 0;
      }
    }
  }
  .footer{
    // width: 90%;
    // padding:30rpx 20rpx;
    // margin:20rpx auto;
    // border-radius:20rpx;
    // background: #fff;
  }
  .panel{
    margin: 20rpx 0;
    padding:0 20rpx;
    border-radius:20rpx!important;
    p{
      padding: 20rpx 0;
      font-size: 28rpx;
    }
  }
}
.fWrap{
  background: #fff;
  margin-top: 35px;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
    color: #4f4f4f;
    font-size: 28rpx;
    padding: 20rpx;
}
</style>

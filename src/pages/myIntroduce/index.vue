<template>
  <div class="wrap">
    <div class="content">
      <i-row i-class="rowBox" v-for="(item,index) in list" :key="index" @longtap="getLongtap(item)">
        <i-col span="6" class="leftCol">
          <i-row class="mixRow">
            <i-col span="16">{{item.name}}</i-col>
            <i-col span="6" style="text-align:center;">{{item.gender}}</i-col>
            <!-- <i-col span="6">{{item.age}}</i-col> -->
          </i-row>
        </i-col>
        <i-col span="16" class="rightCol">
          <p v-for="(v,i) in max[index]" :key="i" v-if="v">{{v}}</p>
        </i-col>
        <i-col span="2">
          <p style="margin-left:-30rpx;margin-top:-10rpx;" @click="getTab(index,item)">
            <i-icon type="enter" size="22" color="#5e5e5e"/>
          </p>
        </i-col>
      </i-row>
    </div>
    <div class="add" @click="getAdd">
      <i-icon type="add" size="40" color="#fff"/>
    </div>
    <i-modal i-class="modal" :visible="visible" :show-ok="false" :show-cancel="false">
      <div class="header">更多操作</div>
      <ul>
        <li @click="getAddLabel">添加修改标签</li>
        <li @click="getDelete">删除</li>
        <li @click="getCancel">取消</li>
      </ul>
    </i-modal>
    <i-modal i-class="modal" :visible="editModal" :show-ok="false" :show-cancel="false">
      <div class="header">添加修改标签</div>
      <div class="content">
        <i-row i-class="row">
          <i-col span="18">
            <i-input v-model="name" placeholder="最多5个汉字" @change="getChangeName"></i-input>
          </i-col>
          <i-col span="4">
            <p @click="getAddchild">添加</p>
          </i-col>
        </i-row>
        <div class="box">
          <p v-for="(item,index) in maxList[0]" :key="index" v-if="item">
            {{item}}
            <i @click="getTabDel(index)">-</i>
          </p>
        </div>
        <i-button i-class="btn" @click="getSubmit">保 存</i-button>
      </div>
    </i-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      editModal: false,
      max: [],
      maxList: [],
      name: "",
      id: "",
      maxStr: "",
      list: [
      ],
      cont:""
    };
  },
  onLoad() {
    //this.max = [];
    console.log(this.max)
    this.getCont();
    this.getQueryAll();
    
  },
  onShow(){
    this.visible = false;
    this.editModal = false;
  },
  methods: {
    getQueryAll() {
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-schooladministration/coachReferrals/queryAll",
          data: {
            coachId: wx.getStorageSync("userId")
          }
        })
        .then(res => {
           this.list= [];
           this.max = [];
          this.list = res.content; 
          this.list.forEach(item => {
            this.max.push(item.tags.split(","));
          });
         
        });
    },
    getChangeName(e){
      console.log(e);
      this.name = e.mp.detail.detail.value;
    },
    // 长按
    getLongtap(item) {
      console.log(item);
      this.maxList = [];
      this.maxList.push(item.tags.split(","));
      this.id = item.id;
      // this.maxStr = this.maxList;
      this.visible = true;
    },
    // 添加标签
    getAddchild() {
      if(this.name == ""){
        wx.showToast({
          title:"标签不能为空",
          icon:"none",
          duration:2000
        })
        return false;       
      }else {
        console.log(this.maxList);
        this.maxList.forEach(item => {
          console.log(item);
          item.push(this.name);
        });
        // console.log(this.name);
      }
    },
    // 删除标签
    getTabDel(index) {
      this.maxList[0].splice(index, 1);
    },
    // 删除
    getDelete() {
      this.$httpWX
        .DELETE({
          url:
            "/v1/aplus-jx-schooladministration/coachReferrals/remove/" +
            this.id,
          data: {}
        })
        .then(res => {
          console.log(res);
          wx.showToast({
            title: res.status.message,
            icon: 'success',
            duration: 2000
          })
          this.visible = false;
          this.getCont();
          this.getQueryAll();
        });
    },
    getTab(index, item) {
      console.log(item);
      wx.navigateTo({
        url: "/pages/turnIntroduction/main?id=" + item.id + "&name=" + item.name
      });
    },
    getAdd() {
      wx.navigateTo({
        url: "/pages/lookupStudent/main?bs="+'bs1'
      });
    },
    
    // 修改标签
    // getEdit(id){
    // console.log(id)
    //   this.maxList.push(this.maxStr.split(','));
    //   console.log(this.maxList)
    //   this.id = id;
    //   this.visible = true;
    // },

    // 更多操作-取消
    getCancel() {
      this.visible = false;
    },
    // 添加修改标签
    getAddLabel() {
      this.visible = false;
      this.editModal = true;
    },
    // 添加修改标签-保存
    getSubmit() {
      console.log(this.maxList.join());
      if(this.maxList.join()==''){
        wx.showToast({
          title:"标签不能为空",
          icon:"none",
          duration:2000
        })
      }else {
        if(this.maxList[0].length>3){
          wx.showToast({
            title:"最多添加3个标签",
            icon:"none",
            duration:2000
          })
        }else {
          this.$httpWX.post({
            url: "/v1/aplus-jx-schooladministration/coachReferrals/update",
            data: {
              id: this.id,
              tags: this.maxList.join()
            }
          }).then(res=>{
            console.log(res);
            this.getQueryAll();
          });
          this.editModal = false;
        }
      }
    },
    // 转介绍总数
    getCont(){
      this.$httpWX.get({
        url:"/v1/aplus-jx-schooladministration/coachReferrals/getReferralsCount/" + wx.getStorageSync('userId'),
        data:{

        }
      }).then(res=>{
        // console.log(res);
        this.cont = res.content;
        wx.setNavigationBarTitle({
          title: '我的转介绍'+'('+this.cont+')'
        })
      })
    },
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getQueryAll();
    wx.stopPullDownRefresh();
  }     
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  .content {
    width: 92%;
    height: auto;
    background: #fff;
    border-radius: 20rpx;
    margin: 20rpx auto;
    .rowBox {
      width: 100%;
      padding: 30rpx;
      // border-bottom: 1rpx solid #e5e5e5;
      .leftCol {
        .mixRow {
          font-size: 24rpx;
        }
      }
      .rightCol {
        overflow: hidden;
        p {
          width: 120rpx;
          padding: 5rpx;
          border-radius: 10rpx;
          border: 1rpx solid #ff3f00;
          font-size: 22rpx;
          color: #ff3f00;
          text-align: center;
          margin-right: 10rpx;
          float: left;
        }
      }
    }
  }
  .add {
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50%;
    background: #ff3f00;
    text-align: center;
    position: absolute;
    bottom: 50rpx;
    right: 50rpx;
  }
  .modal {
    width: 800rpx !important;
    // height: 500prx!important;
    margin: 0 auto;
    .header {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      background: #414141;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
    }
    ul {
      width: 100%;
      height: 100%;
      background: #fff;
      li {
        padding: 30rpx;
        font-size: 28rpx;
        text-align: left;
        color: black;
        border-bottom: 1rpx solid #e5e5e5;
      }
    }
    .content {
      width: 100%;
      background: #fff;
      // padding: 0 30rpx;
      .row {
        text-align: left;
        p {
          width: 100rpx;
          font-size: 20rpx;
          padding: 10rpx;
          text-align: center;
          background: #414141;
          margin-top: 20rpx;
          color: #fff;
          border-radius: 10rpx;
        }
      }
      .box {
        width: 100%;
        // height: 300rpx;
        background: #fff;
        margin: 20rpx 0;
        display: flex;
        justify-content: space-around;
        p {
          width: 130rpx;
          padding: 10rpx;
          border: 1rpx solid black;
          font-size: 24rpx;
          border-radius: 10rpx;
          color: black;
          position: relative;
          i {
            display: inline-block;
            width: 40rpx;
            height: 40rpx;
            line-height: 40rpx;
            background: #ff3f00;
            color: #fff;
            text-align: center;
            font-size: 50rpx;
            border-radius: 50%;
            position: absolute;
            top: -30%;
            right: -10%;
          }
        }
      }
      .btn {
        width: 80% !important;
        text-align: center !important;
        font-size: 28rpx !important;
        color: #fff !important;
        background: #ff3f00 !important;
        border-radius: 30px !important;
        margin: 60rpx auto !important;
      }
    }
  }
}
</style>

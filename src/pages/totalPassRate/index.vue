<template>
  <div class="wrap">
    <!-- 总通过率 -->
    <div class="header">
      <div class="tab" v-for="(item,index) in name" :key="index" @click="getTab(index)">
        <p :class="{active:idx==index}">{{item}}（x/y）</p>
        <span v-if="idx==index"></span>
      </div>
    </div>
    <div class="center">
      <div class="row" v-for="(item,index) in list" :key="index" v-if="idx==0">
        <i-row>
          <i-col i-class="icol" span="5">
            <p>{{item.name}}</p>
          </i-col>
          <i-col i-class="icol" span="14">
            <p>{{item.classHour}}/{{item.contTime}}</p>
          </i-col>
          <i-col i-class="icol" span="5">
            <p>{{item.ratio}}</p>
          </i-col>
        </i-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return {
        idx:"",
        name:['通过','未通过'],
        list:[
          {
            name:"学员名称",
            classHour:"教学课时",
            contTime:"学院总课时",
            ratio:"教学比例"
          },
          {
            name:"学员名称",
            classHour:"教学课时",
            contTime:"学院总课时",
            ratio:"教学比例"
          },
          {
            name:"学员名称",
            classHour:"教学课时",
            contTime:"学院总课时",
            ratio:"教学比例"
          },
          {
            name:"学员名称",
            classHour:"教学课时",
            contTime:"学院总课时",
            ratio:"教学比例"
          },
          {
            name:"学员名称",
            classHour:"教学课时",
            contTime:"学院总课时",
            ratio:"教学比例"
          }
        ]
      }
    },
    methods:{
      getTab(index){
        this.idx = index;
      }
    }
  }
</script>
<style lang="scss">
  .wrap{
    width:100%;
    height: 100%;
    overflow: hidden;
    .header{
      width: 100%;
      height: auto;
      overflow: hidden;
      background: #fff;
      display: flex;
      .tab{
        flex: 1;
        font-size: 24rpx;
        color:#666666;
        text-align: center;
        padding: 20rpx 0 5rpx 0;
        p{
          padding-bottom: 15rpx;
          border-right: 1rpx solid #ccc;
        }
        .active{
          color: #f41855;
        }
        span{
          display: inline-block;
          width: 30%;
          height: 10rpx;
          margin:0 auto;
          background: -webkit-linear-gradient(left, #f41856, #e65179);
          border-radius: 10rpx;
        }
      }
    }
    .center{
      width: 100%;
      height: auto;
      overflow: hidden;
      background: #fff;
      margin:20rpx 0;
      .row{
        color:#5e5e5e; 
        font-size: 24rpx;
        border-bottom: 1rpx solid #bfbfbf;
        .icol{
          text-align: center;
          padding: 30rpx 0;
        }
      }
      .row:last-child{
        border-bottom:none;
      }
    }
  }
</style>

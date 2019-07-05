<template>
  <div class="wrap">
    <!-- 燃料提报-登记 -->
    <div class="container">
      <div class="header">
        <i-input title="燃料记录" disabled i-class="radius" @click="getRouter"></i-input>
        <i-con i-class="icons" type="enter" size="20" color="#5d5d5d"></i-con>
      </div>
      <div class="center">
        <i-input title="使用车辆"  placeholder="当前绑定的车辆的拍照,允许修改" @change="binUseVehicle"></i-input>
        <picker class="gasBox" v-model="index" :range="array" @change="bindPickerChange">
          <i-input title="燃料类型" :value="array[index]" disabled></i-input>
          <i-con i-class="unfold" type="unfold" size="20" color="#5d5d5d"></i-con>
        </picker>
        <div class="money">
          <i-input title="燃料单价" type="number" placeholder="后台获取,不允许修改" disabled></i-input>
          <span>元</span>
        </div>
        <i-input title="本次用量" placeholder="手动输入,燃料设备上的值,不管单位" @change="bindConsumption"></i-input>
        <div class="money">
          <i-input title="总费用" type="number" placeholder="自动计算,不允许修改" disabled></i-input>
          <span>元</span>
        </div>
      </div>
      <i-button i-class="submit" @click="submit">提&nbsp;&nbsp;交</i-button>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return {
        index:0,
        vehicle:"",
        array:['天然气','汽油'],
        consumption:""
      }
    },
    methods:{
      // 燃料记录
      getRouter(){
        wx.navigateTo({
          url:"/pages/fuelRecord/main"
        })
      },
      // 使用车辆
      binUseVehicle(val){
        this.vehicle = val.mp.detail.detail.value;
      },
      // 燃料类型选择
      bindPickerChange(e){
        this.index = e.mp.detail.value;
      },
      // 本次用量
      bindConsumption(val){
        this.consumption =  val.mp.detail.value;
      },
      // 提交
      submit(){
        wx.navigateTo({
          url:"/pages/fuelRecord/main"
        })
      }
    }
  }
</script>
<style lang="scss">
  .wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .container{
      width: 95%;
      height: auto;
      overflow: hidden;
      margin:0 auto;
      .header{
        width: 100%;
        height: auto;
        margin: 20rpx 0;
        position: relative;
        box-shadow:0 1px 6px rgba(0,0,0,.2);
        .radius{
          border-radius: 20rpx!important;
        }
        .icons{
          position: absolute;
          top:25%;
          right: 30rpx;
        }
      }
      .center{
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 20rpx;
        box-shadow:0 1px 6px rgba(0,0,0,.2);
        .gasBox{
          width: 100%;
          position: relative;
          .unfold{
            position: absolute;
            top:25%;
            right: 30rpx;
          }
        }
        .money{
          width: 100%;
          position: relative;
          span{
            font-size: 24rpx;
            color:#5d5d5d;
            position: absolute;
            top:25%;
            right: 35rpx;
          }
        }
      }
      .submit{
          width:100%;
          height: auto;
          margin:60rpx 0;
          border-radius:40rpx;
          color:#fff!important;
          background: -webkit-linear-gradient(left, #f41856, #e65179)!important;
      }
    }
  }
</style>

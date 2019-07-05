<template>
  <div class="wrap">
    <!-- <p class="imgs">
      <image src="/static/images/iconCar.png"></image>
    </p> -->
    <div style="padding:10px 0;position:relative;">
      <div class="boxImg">
        <image src="/static/images/che.png"></image>
      </div>
      <div  style="position:absolute;bottom:31%;left:31%;">
          <p style="color:#4f4f4f;font-size:16px;text-align:center;margin-bottom:20px;font-weight:bold;">当前车辆</p>
        <div class="items" v-if="carNow!=''">
          <button class="btn_s" style="font-size:12px;">{{carNow}}</button></div>
      </div>
    </div>
    <div style="padding:0 20px 20px 20px;">
      <i-divider content="可更换车辆" color="" lineColor="#8E8E8E"></i-divider>
    </div>
    <div class="box" v-if="carNumber.length >0" v-for ="(items,index) in carNumber" :key="index">
      <div class="item" :class="{active:num==index}"><button class="btn_" @click="getClick(index,items.id)">{{items.licenceNum}}</button></div>
    </div>  
    <div class="box empty" v-if="carNumber.length == 0" >
        暂无其他可用车辆
    </div>
    <div>
      <i-row style="margin:25px 0;">
          <button class="btn-save" @click="getSave" :disabled="carNumber.length == 0?true:false">保存</button>
      </i-row>
    </div> 
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return {
        num:-1,
        carNow:'',
        carNumber:[],
        carId:"",
      }
    },
    onLoad(){
      this.getQuery();
    },
    methods:{
      getQuery(){
        this.$httpWX.get({
        url:this.$api.car.getBindCarList+'/'+wx.getStorageSync('userId'),
        // url:'/v1/aplus-jx-finance/car/getBindCarList/'+ 34,

        data:{
          
        }
      }).then(res=>{
        console.log(res);
        console.log(res.content.currentCar);
        if(res.content.currentCar!=""){
          this.carNow = res.content.currentCar[0].licenceNum;
        }
        this.carNumber = res.content.ableReplaceCarList;
        console.log(this.carNow);
      })
      },
      getSave(){
        if(this.num==-1){
          return false;
        }else {
          this.$httpWX.post({
            url:this.$api.car.changeCar+"/"+this.carId+'/'+wx.getStorageSync('userId'),
            data:{
  
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
            },0);
            if(res.status.code=='10'){
              this.num = -1;
            }
            this.getQuery();
          })
        }
      },
      getClick(index,id){
        console.log(index);
        this.num = index;
        this.carId = id;
        
      }
    }
  }
</script>
<style lang="scss">
.wrap{
  .imgs{
    width:140rpx;
    height:140rpx;
    position: absolute;;
    top:0;
    left:0;
    z-index: 9999;
    image{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .boxImg{
    width:100%;
    height:244px;
    margin:0 auto;
    position: relative;
    image{
      width: 100%; 
      height: 100%;
    }
  }
}
.items{
  width: 140px;
  height: 41px;
  line-height: 41px;
  text-align: center;
  color:#fff;
  border-radius: 4px;
  border: 1rpx solid #d35300;
}
.btn_s{
  height:100%;
  line-height:41px;
  font-size:16px;
  background: #fc873b!important;
}
.item{
  width:173px;
  height: 49px;
  margin:15px auto;
  background:#fff;
  border-radius:4px;
  border:1px solid#d8d8d8;
  // padding:5px;
}
.item.active{
  background: #fff9f5;
  border:1px solid #fc873b;
}
.btn_{
  color:#4f4f4f;
  height:100%;
  line-height:49px;
  font-size:18px;
}
.btn-save{
  background-image: linear-gradient(90deg, 
  #fc8902 0%, 
  #fb4003 100%);
  box-shadow: 0px 2px 10px 0px 
  rgba(253, 135, 2, 0.6);
  border-radius: 21px;
  color:#fff;
  width:80%;
  margin-top: 100px;
  border-radius:20px;
}
.box.empty{
  text-align:center;
  color:#CECECE;
  padding:20px;
}
</style>

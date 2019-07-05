<template>
  <div class="wrap">
    <!-- 维修提报-登记 -->
    <div class="card-box">
      <i-cell-group>
        <i-cell title="维修记录" is-link url="/pages/repairRecord/main"></i-cell>
      </i-cell-group>
    </div>
    <div class="card-box">
      <i-row i-class="row-class">
         <i-input title="使用车辆"  v-model="car" autofocus placeholder="车牌号" @change="handleCar" disabled="true"/>
      </i-row>
      <i-row i-class="row-class" style="position:relative" v-for="(item,i) in num" :key="i">
        <i-col span="14" >
          <picker @change="bindPickerChange" mode = selector :value="index" :range="array">
            <view class="picker">
              <i-input title="当前选择"  :value="array[index]" autofocus placeholder="请选择" disabled="true"/>
            </view>
          </picker>
        </i-col>
        <i-col span="2" style="position:absolute;top:30%;z-index:1;left:50%;">
            <i-icon type="unfold"/>
        </i-col>
         <i-col span="6">
           <i-input v-model="cost" placeholder="费用" />
         </i-col>
         <i-col span="2" style="position:absolute;right:0;top:30%;z-index:11;">
          <div @click="addCost" style="display:flex;">元<i class="iconfont icon-tianjiaicon" style="margin:0 5px;"></i></div>           
         </i-col>
      </i-row>
      <i-row i-class="row-class">
         <i-input title="费用合计"  placeholder="费用合计" @change="handleCar" disabled="true"/>
      </i-row>
      <i-row i-class="row-class">
        <div style="padding:15px;">
          <span>备注</span>
         <textarea></textarea>
        </div>
      </i-row>
    </div> 
    <div>
       <i-row style="margin:25px 0;">
          <button class="btn_">提交</button>
       </i-row>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){
      return{
        car:'吉A111',
        index:0,
        array: ['美国', '中国', '巴西', '日本'],
        depart:'',
        cost:'',
        num: 1,
        v:''
      }
    },
    created(){},
    methods:{
      handleCar(){
        console.log(this.car);
      },
     bindPickerChange: function(e) {
      this.index = e.target.value;
      this.depart = this.array[e.target.value];
      this.v = this.depart;
    },
    addCost(){
      this.num++;
    }
    }
  }
</script>
<style lang="scss">
.card-box{
  width:90%;
  margin:15px auto;
  box-shadow:0 1px 6px rgba(0,0,0,.2);
  padding:0 10px;
  background:#fff;
  font-size:12px;
  border-radius:6px;
}
.row-class{
  border-bottom:1px solid #eee;
  position:relative;
}
.btn_{
  background:#f41856;
  color:#fff;
  width:85%;
  border-radius:20px;
  margin-bottom:15px;
}
</style>

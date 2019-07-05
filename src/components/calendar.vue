<template>
	<div>
		<view class="selected_date">
		  <view bindtap="preMonth">
		    <image class="select_icon" src="/images/left.png"></image>
		  </view>
		  <view class="text_center">{{curYear+'-'+curMonth}}</view>
		  <view style="text-align:right;" bindtap="nextMonth">
		    <image class="select_icon" src="/images/right.png"></image>
		  </view>
		</view>
		<view class="calendar_panel">
		  <view class="calendar_box">
		    <view class="weekday_label">日</view>
		    <view class="weekday_label">一</view>
		    <view class="weekday_label">二</view>
		    <view class="weekday_label">三</view>
		    <view class="weekday_label">四</view>
		    <view class="weekday_label">五</view>
		    <view class="weekday_label">六</view>
		  </view>
		  <view class="calendar_box" v-for="(items,index) in dateList">
		    <view class="weekday_label" v-for="(items_two,indexTwo) in items">
		      <text @click="selectDate(items_two)">{{items_two.date}}</text>
		    </view>
		  </view>
		</view>
		<view class="show_box">选中日期：{{selectedDate}} {{selectedWeek}}</view>
	</div>
</template>

<script>
	export default {
	data(){
		return {
			selectedDate: '',//选中的几月几号
		    selectedWeek: '',//选中的星期几
		    curYear: 2017,//当前年份
		    curMonth: 0,//当前月份
		    daysCountArr: [// 保存各个月份的长度，平年
		      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
		    ],
		    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		    dateList: []
		}
	},
	created(){
		var today = new Date();//当前时间  
	    var y = today.getFullYear();//年  
	    var mon = today.getMonth() + 1;//月  
	    var d = today.getDate();//日  
	    var i = today.getDay();//星期  
	      this.curYear = y;
	      this.curMonth=mon;
	      this.selectedDate= y + '-' + mon + '-' + d;
	      this. selectedWeek= this.data.weekArr[i]
	      this.getDateList(y, mon - 1);
	    },
	   methods:{
	   		getDateList: function (y, mon) {
		    var vm = this;
		    //如果是否闰年，则2月是29日
		    var daysCountArr = this.data.daysCountArr;
		    if (y % 4 == 0 && y % 100 != 0) {
		      this.data.daysCountArr[1] = 29;
		        this.daysCountArr = daysCountArr;
		    }
		    //第几个月；下标从0开始实际月份还要再+1  
		    var dateList = [];
		    // console.log('本月', vm.data.daysCountArr[mon], '天');
		    dateList[0] = [];
		    var weekIndex = 0;//第几个星期
		    for (var i = 0; i < vm.data.daysCountArr[mon]; i++) {
		      var week = new Date(y, mon, (i + 1)).getDay();
		      // 如果是新的一周，则新增一周
		      if (week == 0) {
		        weekIndex++;
		        dateList[weekIndex] = [];
		      }
		      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
		      if (weekIndex == 0) {
		        dateList[weekIndex].unshift({
		          value: y + '-' + (mon + 1) + '-' + (i + 1),
		          date: i + 1,
		          week: week
		        });
		      } else {
		        dateList[weekIndex].push({
		          value: y + '-' + (mon + 1) + '-' + (i + 1),
		          date: i + 1,
		          week: week
		        });
		      }
		    }
		    // console.log('本月日期', dateList);
		    vm.dateList =  dateList;
		  },
		  selectDate: function (e) {
		    var vm = this;
		    // console.log('选中', e.currentTarget.dataset.date.value);
		    // vm.setData({
		    //   selectedDate: e.currentTarget.dataset.date.value,
		    //   selectedWeek: vm.data.weekArr[e.currentTarget.dataset.date.week]
		    // });
		  },
       }
	}
</script>
<style>
	
</style>
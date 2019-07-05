<template>
  <div class="wrap">
    <i-cell-group>
    <i-cell title="只显示箭头" is-link></i-cell>
    <i-cell title="跳转到首页" is-link url="/pages/dashboard/index"></i-cell>
    <i-cell title="只有 footer 点击有效" is-link url="/pages/dashboard/index" only-tap-footer></i-cell>
    <i-cell title="开关">
        <switch slot="footer" checked />
    </i-cell>
  </i-cell-group>
  <i-panel title="标题">
    <view style="padding: 15px;">PANEL 内容区域</view>
  </i-panel>

  <i-grid>
      <i-grid-item i-class="item">
          <i-spin size="small"></i-spin>
      </i-grid-item>
      <i-grid-item i-class="item">
          <i-spin></i-spin>
      </i-grid-item>
      <i-grid-item i-class="item">
          <i-spin size="large"></i-spin>
      </i-grid-item>
  </i-grid>
  
<!-- 自定义内容 -->
    <i-grid>
        <i-grid-item i-class="item">
            <i-spin custom>加载中...</i-spin>
        </i-grid-item>
        <i-grid-item i-class="item">
            <i-spin custom>
                <i-icon type="refresh" size="20" i-class="icon-load"></i-icon>
                <view>Loading</view>
            </i-spin>
        </i-grid-item>
        <i-grid-item i-class="item">
            <i-spin custom>
                <view class="loading"></view>
            </i-spin>
        </i-grid-item>
    </i-grid>
    <!-- 分隔符 -->
    <i-divider content="加载已经完成,没有其他数据"></i-divider>
    <i-divider content="加载已经完成,没有其他数据" color="#2d8cf0" lineColor="#2d8cf0"></i-divider>
    <i-divider content="加载已经完成,没有其他数据" lineColor="#2d8cf0"></i-divider>
    <i-divider content="加载已经完成,没有其他数据" color="#ed3f14" lineColor="#ed3f14"></i-divider>
    <!-- 折叠面板 -->
    <div>
          <view class="caption-wrap">
        <text class="caption-title">折叠面板</text>
        <i-collapse name="123">
            <i-collapse-item title="史蒂夫·乔布斯" name="name1">
                <view slot="content">
                    史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
                </view>
            </i-collapse-item>
            <i-collapse-item title="斯蒂夫·盖瑞·沃兹尼亚克" name="name2">
                <view slot="content" i-class-content="green-text">
                    斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                    Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                    Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
                </view>
            </i-collapse-item>
            <i-collapse-item title="乔纳森·伊夫" name="name3">
                <view slot="content">
                    乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。
                </view>
            </i-collapse-item>
        </i-collapse>
    </view>
    <view class="caption-wrap">
    <text class="caption-title">折叠面板 - 手风琴模式</text>
    <i-collapse name="223" accordion>
        <i-collapse-item title="史蒂夫·乔布斯" name="name1">
            <view slot="content">
                史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
            </view>
        </i-collapse-item>
        <i-collapse-item title="斯蒂夫·盖瑞·沃兹尼亚克" name="name2">
            <view slot="content">
                斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
                Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
            </view>
        </i-collapse-item>
        <i-collapse-item title="乔纳森·伊夫" name="name3">
            <view slot="content">
                乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。
            </view>
        </i-collapse-item>
    </i-collapse>
    <i-tabs current="tab1" bindchange="handleChange" i-class="cc" color="red">
    <i-tab key="tab1" title="选项1"></i-tab>
    <i-tab key="tab2" title="选项2"></i-tab>
    <i-tab key="tab3" title="选项3"></i-tab>
</i-tabs>
</view>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      
    },
    data(){

    },
    methods:{

    }
  }
</script>
<style>
.cc{
    color:green;
}
.i-tabs-tab-title-current{
    color:red!important;
}
</style>

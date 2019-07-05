<template>
  <div class="container">
    <i-spin custom v-if="spinShow">加载中...</i-spin>
    <div style="">
      <canvas canvas-id="myCanvas" style="width:100%;height:900rpx"></canvas>
    </div>
    <div class="footer">
      <button type="primary" class="ibtn" @click="getSubmit">生成海报</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spinShow:true,
      savedImgUrl:"",
      drawcontent: "",
      info:""
    };
  },
  onLoad() {
    const domain = 'https://aplusyx.oss-cn-beijing.aliyuncs.com/'
    this.savedImgUrl = domain + wx.getStorageSync('imgs');
    this.info = wx.getStorageSync('content');
    this.spinShow = true;
    let that = this;
    console.log(that.savedImgUrl);
    wx.downloadFile({
      url:that.savedImgUrl,
      success:((res)=>{
        console.log(res);
        if(res.statusCode === 200){
          console.log(111);
          that.savedImgUrl = res.tempFilePath
        }
        //绘图方法
        setTimeout(()=>{
          that.drawImage();
          that.spinShow = false
        },1000)
        // 结束加载中提示
        // wx.hideLoading()
      })
    })

    // const ctx = wx.createCanvasContext("myCanvas");
    // const that = this;
    // wx.getImageInfo({
    //   src: that.savedImgUrl,
    //   success(res) {
    //     let Path = res.path;
    //     ctx.drawImage(Path, 0, 0, 380, 500);
        
    //     ctx.setFillStyle("red"); //文字颜色：默认黑色
    //     ctx.strokeRect(60, 10, 150, 75)
    //     ctx.setFontSize(20); //设置字体大小，默认10
    //     // ctx.fillText(that.drawcontent+'18888888888', 20, 20); //绘制文本
    //     //字体换行
    //     // that.drawText(ctx, that.drawcontent, 30, 230, 100, 120);

    //     ctx.fillText(that.info.name, 30, 230, 100, 120)
    //     ctx.fillText(that.info.phone, 30, 260,190, 120)
    //     ctx.fillText(that.info.school, 30, 290,190, 120)
    //     ctx.fillText('学车价格'+that.info.carPrice, 30, 320,190, 120)
    //     ctx.fillText('吃拿卡要全额退款', 30, 350,190, 120)
    //     // 调用draw()开始绘制
    //     ctx.draw();
    //   }
    // });
  },
  methods: {
    // 绘制
    drawImage(){
      const that = this;
      const ctx = wx.createCanvasContext("myCanvas");
      wx.getImageInfo({
        src: that.savedImgUrl,
        success(res) {
          let Path = res.path;
          ctx.drawImage(Path, 0, 0, wx.getSystemInfoSync().windowWidth, 500);
          
          ctx.setFillStyle("#ff4100"); //文字颜色：默认黑色
          ctx.fillRect(20, 300, ctx.measureText(that.info.school).width*1.7, 30)
          // ctx.strokeRect(30, 270, 150, 30)  // 边框
          ctx.setFontSize(23); //设置字体大小，默认10
          // ctx.fillText(that.drawcontent+'18888888888', 20, 20); //绘制文本
          //字体换行
          // that.drawText(ctx, that.drawcontent, 30, 230, 100, 120);
          ctx.setFillStyle("#fff"); //文字颜色：默认黑色
          ctx.fillText(that.info.name, 20, 260, 100, 120)
          ctx.setFontSize(12);
          ctx.fillText('教练', 100, 260, 100, 120)
          ctx.setFontSize(23);
          ctx.fillText(that.info.phone, 20, 290,190, 120)
          ctx.setFontSize(15)
          ctx.fillText(that.info.school, 25, 320,190, 120)
          ctx.setFontSize(15)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          // 将阴影向右移动15px，向上移动10px
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          // 轻微模糊阴影
          ctx.shadowBlur = 5;
          ctx.fillText('学车价格'+that.info.carPrice, 20, 350,190, 120)
          ctx.font = 'normal bold 10px sans-serif'
          ctx.fillText(that.info.slogan, 20, 365,190, 120)
          // 调用draw()开始绘制
          ctx.draw();
        }
      });
    },






    drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      var lineWidth = 0;
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth) {
          ctx.fillText(
            str.substring(lastSubStrIndex, i),
            leftWidth,
            initHeight
          ); //绘制截取部分
          initHeight += 25; //16为字体的高度
          lineWidth = 0;
          lastSubStrIndex = i;
          titleHeight += 30;
        }
        if (i == str.length - 1) {
          //绘制剩余部分
          ctx.fillText(
            str.substring(lastSubStrIndex, i + 1),
            leftWidth,
            initHeight
          );
        }
      } // 标题border-bottom 线距顶部距离
      titleHeight = titleHeight + 10;
      return titleHeight;
    },
    // 保存图片
    getSubmit() {
      wx.canvasToTempFilePath(
        {
          canvasId: "myCanvas",
          success(res) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success() {
                    wx.showToast({
                      title: "图片保存成功"
                    });
                  }
                });
              }
            });
          }
        },
        this
      );
    }
  }
};
</script>
<style lang="scss">
.footer{
  margin: 80rpx 0;
  text-align: center;
  .ibtn{
      width: 240px;
      height: 40px;
      background-image: linear-gradient(90deg, 
        #fc8902 0%, 
        #fb4003 100%)!important;
      box-shadow: 0px 2px 10px 0px 
        rgba(253, 135, 2, 0.6)!important;
      border-radius: 21px!important;
      color:#fff;
      font-size:28rpx;
      line-height:80rpx
  }
}
</style>


<script>
import '../static/icon/iconfont.css' 
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  },
  globalData:{}
}

</script>

<style>
page{
  background: #f2f2f2;
}
</style>

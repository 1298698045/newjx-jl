/**
  线索新增按钮
*/
<template>
  <div class="clues-add-button" @click="onCluesAddBtnClick">
    <i class="iconfont icon-luru luru"></i>
  </div>
</template>

<script>
  export default {
    methods: {
      /**
       * 点击新增按钮
       */
      onCluesAddBtnClick () {
        wx.navigateTo({
          url: '/pages/clueAdd/main'
        })
      }
    }
  }
</script>

<style>
  .clues-add-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: #ff3f00;
    width: 50px;
    height: 50px;
    line-height: 50px;
    z-index: 1002;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    opacity: 0.8;
  }
  .luru{
    font-size: 28px;
  }
</style>

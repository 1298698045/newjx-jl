<template>
  <i-input :value="model[value]" @change="change" :maxlength="maxlength" :error="required && rule[value].error" :required="required" :type="type" :title="title" :disabled="disabled" :placeholder="placeholder"></i-input>
</template>

<script>
  export default {
    props: {
      title: String,
      placeholder: String,
      required: {
        type: Boolean,
        value: false
      },
      error: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false
      },
      maxlength: {
        type: Number
      },
      model: Object,
      value: String,
      type: {
        type: String,
        value: 'text'
      },
      rule: Object
    },
    methods: {
      /**
       * 改变事件，从i-input传递过来的事件
       */
      change (event) {
        // 获取控件值
        const { value } = event.target.detail
        this.model[this.value] = value
        // this.model[this.value] = this.type === 'number ' ? Number(value) : value
        this.$emit('change', value)
      }
    }
  }
</script>

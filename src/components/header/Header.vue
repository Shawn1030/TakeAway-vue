<template>
<div class="header">
  <div class="left"><slot name="left"></slot></div>
  <div class="header_title">
    <span class="header_title_text ellipsis">{{title}}</span>
  </div>
  <div class="right"><slot name='right'></slot></div>
</div>
</template>

<script>

export default {
  name:'Header',
  components: {},
  props:{
    title:String
  },
  data() {
    return {

    };
  },
  computed: {},
  methods: {

  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  
  .header //头部公共css
    background-color #02a774
    display flex
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 40%
      color #fff
      font-size 18px
      text-align center
      .header_title_text 
        display block
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
</style>
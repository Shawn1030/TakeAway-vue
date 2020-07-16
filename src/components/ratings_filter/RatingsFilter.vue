<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block " :class="{active:currentType===2}" @click="selectType(2)">
        全部<span class="count">{{allRatings}}</span>
      </span>
      <span class="block " :class="{active:currentType===0}"  @click="selectType(0)">
        推荐<span class="count">{{positiveSize}}</span>
      </span>
      <span class="block" :class="{active:currentType===1}"  @click="selectType(1)">  
        吐槽<span class="count">{{badSize}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyShowText}" @click="toggleOnlyShowText">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'RatingsFilter',
  components: {},
  props:{
    ratings:Array,
    positiveSize:Number,
    allRatings:Number,
    badSize:Number
  },
  data() {
    return {
     currentType:2,
     onlyShowText:true
    };
  },
  computed: {
    
  },
  methods: {
    selectType(index){
      this.currentType=index
      this.$emit('selectType',index)
    },
    toggleOnlyShowText(){
      this.onlyShowText=!this.onlyShowText
      this.$emit('toggleOnlyShowText',this.onlyShowText)

    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
    .ratings-filter
    .rating-type
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      top-border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
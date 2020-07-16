<template>
<div>
    <section class="search">
      <Header title="搜索" >
        <a class="header_title">
          <span class="header_title_text"></span>
        </a>
      </Header>
      <form class="search_form" action="#" @submit.prevent="searchShops">
        <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
        <input type="submit" name="submit" class="search_submit">
      </form>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'Search',
  components: {},
  data() {
    return {
      keyword:''
    };
  },
  computed: {
    ...mapState({
      latitude:state=>state.msite.latitude,
      longitude:state=>state.msite.longitude
    })
  },
  methods: {
    searchShops(){
      // 获取输入内容
      const keyword = this.keyword.trim()
      if(keyword){
        this.$store.dispatch('getSearchShops',keyword)
      }

    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 @import '../../common/stylus/mixins.styl';
  
  .search  //搜索
    width 100%
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774
        
</style>
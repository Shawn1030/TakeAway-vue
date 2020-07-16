<template>
<div id="app">
  <router-view></router-view>
  <FooterGuide/>
</div>
</template>

<script>
import FooterGuide from 'components/footerguide/FooterGuide'

export default {
  name:'App',
  components: {
    FooterGuide
  },
  data() {
    return {

    };
  },
  mounted(){
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')

  },
  computed: {
 
  },
  methods: {

  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
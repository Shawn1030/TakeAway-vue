<template>
 <div>
   <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftUl">
        <li class="menu-item " :class="{current:currentIndex===index}" 
        v-for="(item,index) in goods" :key="item.icon" @click="selectItem(index)">
          <img :class="{icon:item.icon}" :src="item.icon">
          <span class="text bottom-border-1px">{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" ref="right">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="good in goods" 
        :key="good.name" >
          <h1 class="title">{{good.name}}</h1>
          <ul >
            <li class="food-item bottom-border-1px" v-for="food in good.foods" 
            :key="food.name" @click="showFood(food)">
              <div class="icon" >
                <img width="57" height="57" 
                     :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'/>
                </div>
              </div>
            </li>
         
          </ul>
        </li>
      </ul>
    </div>
    
    <ShopCart />
  </div>
  <Food ref="food"/>
 </div>
      
</template>

<script>    
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from 'components/cart_control/CartControl'
import ShopCart from 'components/shop_cart/ShopCart'
import Food from 'components/food/Food'

export default {
  name:'Goods',
  components: {
    CartControl,
    ShopCart,
    Food
  },
  data() {
    return {
      scrollY:0, //当前top值
      tops:[]
    };  
  },
  mounted(){
    this._initSroll()
    this._initTops()
    
   },
  computed: {
    ...mapState({
      goods:state=>state.shop.goods
    }),
    currentIndex(){ 
      const {tops,scrollY}=this
     
      const index = tops.findIndex(((top,index)=>scrollY>=top && scrollY<tops[index+1])) 
      // if(index!==this.index && this.leftScroll){
      //   this.index=index
      //   const li =this.$refs.leftUl.children[index]
      //   this.leftScroll.scrollToElement(li,500)
      // }

      return index
    }
   },
  methods: {
    _initSroll(){                                                                                       
      this.leftScroll = new BScroll(this.$refs.left,{
        click:true
      })
      if(!this.rightScroll){
        this.rightScroll= new BScroll(this.$refs.right,{ 
        click:true,
        probeType:1
      })
      }
       
 
      this.rightScroll.on('scroll',({y})=>{
        this.scrollY=Math.abs(y)
      })
      this.rightScroll.on('scrollEnd',({y})=>{
        this.scrollY=Math.abs(y)
        const li =this.$refs.leftUl.children[this.currentIndex]
        this.leftScroll.scrollToElement(li,500)
        
        
      })
    },
    _initTops(){
      const tops=[]
      let top = 0
      tops.push(top)
      const lis = this.$refs.rightUl.children
      Array.prototype.forEach.call(lis,li=>{
        top+=li.clientHeight
        tops.push(top)
      })
      this.tops =tops
    },
    selectItem(index){
      const top = this.tops[index]
      this.scrollY=top
      this.rightScroll.scrollTo(0,-top,500)
    },
    showFood(food){
      console.log(food);
      
      this.$refs.food.toggleShow(food)
      
    }
  },
  
  watch:{ 
    goods(){ 
      this.$nextTick(()=>{
      this._initSroll()
      this._initTops()   
      })
    }   
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px

      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
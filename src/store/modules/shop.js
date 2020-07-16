import {
  reqGoodsLis,
  reqRatings,
  reqInfo
} from '../../api'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_SHOP_CART
} from '../mutation_types'
import Vue from 'vue'
const state = {
  goods:[],
  ratings:[],
  info:{},
  cartFoods:[] //购物车中的食物
}
const actions = {
  //获取点餐分类列表
  async getGoods({commit},cb){
    const result = await reqGoodsLis()
    
    if(result.code===0){
      const goods = result.data
      
      commit(RECEIVE_GOODS,{goods})
      typeof cb==='function' && cb()
    }
  },
  //获取评价列表
  async getRatings({commit},cb){
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      typeof cb==='function' && cb()
    }
  },
  //获取商家信息
  async getInfo({commit},cb){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
      typeof cb==='function' && cb()
    }
  },
  updateCount({commit},{isAdd,food}){
      if(isAdd){
        commit(ADD_FOOD_COUNT,{food})
      } else {
        commit(REDUCE_FOOD_COUNT,{food})
      }
  }
  }


const mutations = {
  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info
  },
  
  [ADD_FOOD_COUNT](state,{food}){
  
    if(food.count){
      food.count++
    }else {
      Vue.set(food,"count",1)
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--
      if(food.count==0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_SHOP_CART](state){
    state.cartFoods.forEach(food=>{
      food.count=0
    })
    state.cartFoods=[]
  }
}

const getters = {
  //总数量
  totalCount(state){
      return state.cartFoods.reduce((pre,food)=>pre+food.count,0)  
  },
  //总价格
  totalPrice(){
    return state.cartFoods.reduce((pre,food)=>pre+food.price*food.count,0) 
  },
  //全部评论
  allRatings(state){
    return state.ratings.length
  },
  //评论满意个数
  positiveSize(state){
    return state.ratings.reduce((pre,rating)=>pre+(rating.rateType===0?1:0),0)
  },
  //吐槽评论个数
  badSize(state,getters){
    return getters.allRatings-getters.positiveSize
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
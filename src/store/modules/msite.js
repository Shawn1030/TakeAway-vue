import {
  reqAddress,
  reqGoods,
  reqCategorys,
} from '../../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
} from '../mutation_types'

const state = {
  latitude:119.9269738305664,
  longitude:31.702526288714115,
  address:{},
  categorys:[],
  shops:[],
}
const actions = {
   
  //获取地理位置
  async getAddress({commit,state}){
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)
    if(result.code===0){
      const address=result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  //获取分类列表
  async getCategorys({commit}){
    const result = await reqCategorys()
    if(result.code===0){
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,categorys)
    }
  },

  //获取商家列表
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqGoods(longitude,latitude)
    if(result.code===0){
      const shops=result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },
}
const mutations = {
  [RECEIVE_ADDRESS](state,address){
    state.address=address
  },
  [RECEIVE_CATEGORYS](state,categorys){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops=shops
  },
}
export default {
  state,
  actions,
  mutations,

}
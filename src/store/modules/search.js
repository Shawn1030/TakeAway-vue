import {RECEIVE_SEARCH_SHOPS} from '../mutation_types'
import {reqSearchShops} from '../../api'
const state= {
  searchShops:[] //搜索商品列表

}
const actions = {
  getSearchShops({commit,rootState},keyword){
    const geohash = rootState.msite.latitude+','+rootState.msite.longitude
    const result = reqSearchShops(geohash,keyword)
    if(result.code===0){
      const searchShops= result.data  
      commit(RECEIVE_SEARCH_SHOPS,searchShops)
    }
   
  }
}
const mutations = {
  [RECEIVE_SEARCH_SHOPS](state,searchShops){
    state.searchShops=searchShops
  }
}

export default {
  state,
  actions,
  mutations,
 
}
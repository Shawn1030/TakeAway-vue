import {
  reqAutoLogin,
} from '../../api'
import {
  RECEIVE_USER,
  CLEAR_USER,
  RECEIVE_TOKEN,
  CLEAR_TOKEN,
} from '../mutation_types'

const state = {
  user:{},
  token:localStorage.getItem('token_key'), //当前登录用户的token
}
const actions = {
  //存储user信息
  saveUser({commit},user){
    const token = user.token
    //将token保存到localStorage上
    localStorage.setItem('token_key',token)
    //将token保存到state中
    commit(RECEIVE_TOKEN,token)
    //删除user中的token
    delete user.token
    commit(RECEIVE_USER,user)
  },
  //退出登录
  logout({commit}){
    commit(CLEAR_USER)
    commit(CLEAR_TOKEN)
    localStorage.removeItem('token_key')
  },
  //自动登录
  async autoLogin({commit,state}){
   if(state.token){
    const result = await reqAutoLogin()
    if(result.code===0){
      const user = result.data
      commit(RECEIVE_USER,user)
    }
   }
    
  },
}
const mutations = {
  [RECEIVE_USER](state,user){
    state.user=user
  },
  [CLEAR_USER](state){
    state.user={}
  },
  [RECEIVE_TOKEN](state,token){
    state.token=token
  },
  [CLEAR_TOKEN](state){
    state.token=''
  },
}
export default {
  state,
  actions,
  mutations,

}
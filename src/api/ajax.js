import axios from 'axios'
import qs from 'qs'
import store from '../store'
import {Toast} from 'mint-ui'
import router from '../router'
//请求拦截器
axios.interceptors.request.use(config=>{
  const {method,data}=config
    if(method.toUpperCase==='POST' && data instanceof Object){
      config.data=qs.stringify(data)
    }
    if(config.headers.needToken){
      const token = store.state.user.token
      if(!token){
        const error= new Error('Token不存在')
        error.status=401
        throw error 
      }else{
        config.headers.Authorization=token
      }
    }

  return config
})
axios.interceptors.response.use(response=>{
  return response.data
},err=>{
  const{response,status,message}=err
  //没发请求就失败了(没有token)
  if(!response){    
    if(status===401){
      if(router.currentRoute.path!=='/login'){
        //显示token过期 
        Toast(message)
        //跳转到登录界面
        router.replace('/login')
      }
    }
  }else {
    //获取响应请求的状态码
    const status = response.status
    if(status===401){
      if(router.currentRoute.path!=='/login'){
        Toast(response.data.message)
        router.replace('/login')
        store.dispatch('logout')
      }
    }else if (status===404){
      Toast('请求资源不存在')
    }else {
      Toast('请求错误：'+message)
    }
  }

 
  //中断promise链 
  return new Promise(()=>{})
})

export default axios
import axios from './ajax'

const BASE='/api'
//获取地理位置
export const reqAddress=(longitude,latitude)=>axios({
  method:'GET',
  url:BASE+`/position/${longitude},${latitude}`,
  
})
//获取商品分类列表
export const reqCategorys=()=>axios.get(BASE+'/index_category',{
  headers:{
    needToken:true
  } 
})

//获取商品列表
export const reqGoods=({longitude,latitude})=>axios.get(BASE+'/shops',{
  params:{
    longitude,
    latitude
  },
  headers:{
    needToken:true
  }
})

//获取验证码
export const reqSendCode=(phone)=>axios.get(BASE+'/sendcode',{
  params:{
    phone
  }
})

//用户名密码登陆
export const reqPwdLogin=({
  name,
  pwd,
  captcha
}
)=>axios.post(BASE+'/login_pwd',{
  name,
  pwd,
  captcha
})

//手机号验证码登陆
export const reqCodeLogin=(phone,code)=>axios.post(BASE+'/login_sms',{
  phone,
  code
})

//自动登录
export const reqAutoLogin=()=>axios.get(BASE+'/auto_login',{
  headers:{
    needToken:true
  }
})

//获取点餐列表
export const reqGoodsLis=()=>axios('/goods')
//获取评价列表
export const reqRatings=()=>axios('/ratings')
//获取商家信息
export const reqInfo=()=>axios('/info')
//搜索商家列表
export const reqSearchShops=(geohash,keyword)=>axios('/search_shops',{
  params:{
    geohash,
    keyword
  }
})
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
Vue.use(Router)
 
const router = new Router({
  mode:'history',
  routes,
  
})
// 1.访问的是不是a和b组件 2. 是否登录过，没登陆过就跳转到登录
const paths = ['/a','/b']
router.beforeEach((to, from, next) => {
   if(paths.indexOf(to.path)!==-1 && !store.state.user.user._id){
    return next('/login')
   } 
  next()
})
export default router

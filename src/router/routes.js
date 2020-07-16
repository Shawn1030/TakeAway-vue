import Msite from 'pages/msite/Msite.vue'
import Order from 'pages/order/Order.vue'
import Profile from 'pages/profile/Profile.vue'
import Search from 'pages/search/Search.vue'
import Login from 'pages/login/Login.vue'
import Shop from 'pages/shop/Shop.vue'
import Goods from 'pages/shop/goods/Goods.vue'
import Info from 'pages/shop/info/Info.vue'
import Ratings from 'pages/shop/ratings/Ratings.vue'



export default [
  {
    path:'/',
    component:Msite,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/msite',
    component:Msite,
    meta:{
      isShowFooter:true
    }
   
  },  
  {
    path:'/order',
    component:Order,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      isShowFooter:true
    }
  },
  {
    path:'/login',
    component:Login,
    
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'goods',
        component:Goods
      },  
      {
        path:'info',
        component:Info
      },
       {
        path:'ratings',
        component:Ratings
      },
      {
        path:'',
        redirect:'/shop/goods'
      }
    ]
  },
  
]
<template>
<div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">云涛外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:loginWay}">
              <section class="login_message">                                                                                
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone" v-validate="'required|mobile'">
                <button :disabled="!isRightPhone || computedTime>0" class="get_verification" :class="{right_phone_number:isRightPhone}" 
                @click.prevent="sendSms">{{computedTime>0?`已发送验证码(${computedTime}s)`:'获取验证码'}}</button>
               
                <span style="color:red" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
              </section>
              <section class="login_verification">
                <input type="text" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册云涛外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <div class="switch_button " :class="isShowPwd? 'on':'false'" @click="isShowPwd=!isShowPwd">
                    <div class="switch_circle" :class="{right:isShowPwd}"></div>
                    <span class="switch_text">
                      {{isShowPwd ? '隐藏' : ''}}
                    </span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" :src="'http://localhost:4002/captcha'" 
                  @click="updateCaptcha" ref="captcha" alt="">
                </section>
              </section>  
            </div>
            <button class="login_submit" @click.prevent="loginSubmit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import {reqSendCode,reqPwdLogin,reqCodeLogin} from '../../api'
import { Toast,MessageBox  } from 'mint-ui';
export default {
  name:'Login',
  components: {},
  data() {
    return {
      loginWay:true, // true短信登录 false密码登录
      phone:'', //手机号
      code:'',//验证码 
      name:'',//用户名
      pwd:'',//密码
      captcha:'',//图片验证码
      computedTime:0,  //初始是0秒，显示获取验证码，>0就是当前剩余秒数
      isShowPwd:false
    };
  },
  computed: {
    isRightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
   async sendSms(){
      this.computedTime=10
      const timeId = setInterval(() => {
        if(this.computedTime===0){
          clearInterval(timeId)
        }else{
          this.computedTime--
        }
      }, 1000);

     const result= await reqSendCode(this.phone)
     if(result.code===0){
       Toast('短信发送成功')
     }else {
       this.computedTime=0
      //  alert(result.msg)
      MessageBox.alert(result.msg);
     }

    },
    updateCaptcha(){
      this.$refs.captcha.src='http://localhost:4002/captcha/?time='+Date.now()
    },
    async loginSubmit(){
      let result 
      const {loginWay,phone,code,name,pwd,captcha}=this
      if(loginWay){//短信登录
       result = await reqCodeLogin(phone,code) 
       this.computedTime=0
      }else{//密码登录
        result = await reqPwdLogin({name,pwd,captcha})
        this.updateCaptcha()
        this.captcha=''
      }
      if(result.code===0){
        const user=result.data
        
        this.$store.dispatch('saveUser',user)
        this.$router.replace('/profile')
      }else {
        MessageBox.alert('登录失败')
      }
    }
  },
  beforeRouteEnter (to, from, next) {
      next(component => {
        if(component.$store.state.user.user._id){
          next('/profile')
        }else {
          next()
        }
  })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone_number
                   color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right 
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
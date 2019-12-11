<template>
  <div class="loginMac">
<!--    <div class="loginMacIocn">-->
<!--      <img class="img" src="../../../static/img/logoIconNew.svg" alt="">-->
<!--      <span>Servicio Integral De Marketing Y Publicidad</span>-->
<!--    </div>-->
    <div class="loginBlack"></div>
    <div class="loginMacCenter">
        <div class="loginMacCenterback">
          <div class="loginMacCenterBox">
            <img class="img1" src="../../../static/img/loginLift.png" alt="">
            <div class="loginCenter">
              <img src="../../../static/img/logo.svg" alt="">
              <h3 class="login-title">{{$t('manage.login.login')}} <span>SIGN IN</span></h3>
              <div class="loginFrom">
                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
                  <ul>
                    <li>
                      <i></i>
                      <span>{{$t('manage.login.userName')}}</span>
                      <el-form-item prop="userName" style="margin-bottom: 0">
                        <input type="text" :placeholder="$t('manage.login.userNamePla')" v-model="dataForm.userName">
                      </el-form-item>
                    </li>
                    <li>
                      <i></i>
                      <span>{{$t('manage.login.password')}}</span>
                      <el-form-item prop="password" style="margin-bottom: 0">
                        <input type="password" :placeholder="$t('manage.login.passwordPla')" v-model="dataForm.password">
                      </el-form-item>
                    </li>
                    <li>
                        <i></i>
                        <span>{{$t('manage.login.captcha')}}</span>
                        <el-form-item prop="captcha" style="margin-bottom: 0">
                          <input type="text" :placeholder="$t('manage.login.captchaPla')" v-model="dataForm.captcha">
                        </el-form-item>
                      <div class="yzCode">
                        <img :src="captchaPath" @click="getCaptcha()" >
                      </div>
                    </li>
                  </ul>
                  <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">{{$t('manage.login.login')}}</el-button>
                </el-form>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: this.$t('manage.login.userNameRule'), trigger: 'blur' }
          ],
          password: [
            { required: true, message:  this.$t('manage.login.passwordRule'), trigger: 'blur' }
          ],
          captcha: [
            { required: true, message:  this.$t('manage.login.captchaRule'), trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$cookie.set('token', data.token)

                this.$i18n.locale = data.locale
                this.$cookie.set('locale', data.locale)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style scoped>
  textarea,input,select,option,button{outline: none;/*H5点击时有个背景框*/
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    -moz-tap-highlight-color:rgba(0, 0, 0, 0);
    -ms-tap-highlight-color:rgba(0, 0, 0, 0);
    -o-tap-highlight-color:rgba(0, 0, 0, 0);
    tap-highlight-color:rgba(0, 0, 0, 0); }
input::-webkit-input-placeholder {color: #ccc;}
.loginBlack{width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #E9E9E9;z-index: -1;}
.loginMacIocn{width: 100%;display: flex;align-items: center;margin-top: 20px;}
.loginMacIocn .img{width: 72px;margin-left: 30px}
.loginMacIocn span{font-size: 24px;color: #333;margin-left: 10px}
.loginMacCenter{width: 100%;}
.loginMacCenter .loginMacCenterback{position: absolute;top:50%;left: 50%;margin-left: -624px;margin-top: -400px}
.loginMacCenter .loginMacCenterback .loginMacCenterBox{display: flex;align-items: center;justify-content: center}
.loginMacCenter .loginMacCenterback .loginMacCenterBox >img{width: 448px;height: 800px;}
.loginMacCenter .loginMacCenterback .loginCenter{background: #fff;width: 800px;height: 800px;padding: 40px 115px 0 115px}
.loginMacCenter .loginMacCenterback .loginCenter img{width: 566px;height:47px;}
.loginMacCenter .loginMacCenterback .loginCenter .login-title{font-size: 50px;color: #666666;margin: 8% 0 14% 0; font-weight: 500;}
.loginMacCenter .loginMacCenterback .loginCenter .login-title span{padding-left: 28px;font-size: 40px;color: #3A51A3}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom{width: 100%}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul{width: 100%;padding: 0}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li{width: 100%;height: 51px;border-bottom: 1px solid #eee;list-style: none;margin-bottom: 10%;display: flex;align-items: center;justify-content: flex-start}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li i{width: 30px;height: 30px;background: url("../../../static/img/userIcon.svg") no-repeat;background-size: 100% 100%;margin-right: 30px;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:nth-child(2) i{background: url("../../../static/img/password.svg") no-repeat;background-size: 100% 100%;float: left;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:nth-child(3) i{background: url("../../../static/img/verCode.svg") no-repeat;background-size: 100% 100%;float: left;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li span{width: 70px;font-size: 20px;color: #666666;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li input{width: 300px;border-style: none;margin-left: 10px;font-size: 16px;line-height:40px}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:last-child{position: relative}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:last-child input{width: 200px;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:last-child .yzCode{position: absolute;bottom: 8px;right: 0}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:last-child .yzCode img{width: 176px;height: 50px;}
.loginMacCenter .loginMacCenterback .loginCenter .loginFrom button{width: 100%;height:70px;color: #fff;background-color: #3A51A3;font-size: 30px;margin-top: 50px;}
  @media screen and (max-width:1600px)  {
    .loginMacCenter .loginMacCenterback .loginCenter .login-title{font-size: 30px;}
    .loginMacCenter .loginMacCenterback .loginCenter .login-title span{padding-left: 20px;font-size: 20px;}
    .loginMacCenter .loginMacCenterback .loginCenter img{width: 285px;height: 24px;}
    .loginMacCenter .loginMacCenterback{margin-left: -400px;margin-top: -268px;}
    .loginMacCenter .loginMacCenterback .loginMacCenterBox >img{width: 300px;height: 536px;}
    .loginMacCenter .loginMacCenterback .loginCenter{width: 500px;height: 536px;padding: 12px 43px 0 43px}
    .loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li i{width: 24px;height: 24px;}
    .loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li input{width: 200px;border-style: none;margin-left: 10px;font-size: 14px}
    .loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li span{width: 60px;font-size:16px;}
    .loginMacCenter .loginMacCenterback .loginCenter .loginFrom ul li:last-child .yzCode img{width: 111px;height: 38px;}
    .loginMacCenter .loginMacCenterback .loginCenter .loginFrom button{width: 100%;height:46px;font-size: 20px;margin-top: 10px;}
  }
</style>

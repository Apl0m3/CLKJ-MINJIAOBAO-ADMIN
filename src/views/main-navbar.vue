<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <img src="../../static/img/logoIconNew.svg" alt="">
        <span v-if="!sidebarFold">Servicio Integral De Marketing Y Publicidad</span>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <i class="word-img"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeLanguage('zh-CN')">{{$t('sys.menu.Chinese')}}</el-dropdown-item>
              <el-dropdown-item @click.native="changeLanguage('es-GT')">{{$t('sys.menu.Spanish')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.png" :alt="userName">{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">{{$t('sys.menu.updatePass')}}</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">{{$t('sys.menu.checkOut')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'

  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        count: 0
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () {
          return this.$store.state.common.navbarLayoutType
        }
      },
      sidebarFold: {
        get () {
          return this.$store.state.common.sidebarFold
        },
        set (val) {
          this.$store.commit('common/updateSidebarFold', val)
        }
      },
      mainTabs: {
        get () {
          return this.$store.state.common.mainTabs
        },
        set (val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      userName: {
        get () {
          return this.$store.state.user.name
        }
      },
      userRemindCount: {
        get () {
          return this.$store.state.user.remindCount
        }
      }
    },

    methods: {

      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(this.$t('sys.menu.quit'), this.$t('common.tips'), {
          confirmButtonText:this.$t('common.comfirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$cookie.delete('token')
              this.$router.push({name: 'login'}, () => {
                location.reload() // 刷新页面, 清空整站临时存储数据
              })
            }
          })
        }).catch(() => {
        })
      },
      changeLanguage (lang) {
        this.$http({
          url: this.$http.adornUrl('/sys/user/locale'),
          method: 'post',
          data: this.$http.adornData({
            'locale': lang
          }, false)
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.$i18n.locale = lang
            this.$cookie.set('locale', lang)
          } else {
            this.$message.error(data.msg)
          }
        })
        // location.reload()
      }
    }
  }
</script>
<style scoped>
  .site-navbar__brand {
    background: #fff
  }

  .site-navbar__brand img {
    width: 38px
  }

  .site-navbar__brand span {
    font-size: 16px;
    color: #666
  }
  .word-img{width:25px;height: 25px;display:block;background: url("../../static/img/word-icon.png") no-repeat;background-size: 100%}
</style>

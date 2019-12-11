<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
  }
</script>
<style>
  .site-content > .el-tabs > .el-tabs__header{left: 260px;}
  .site-content__wrapper,.site-navbar__body{margin-left: 260px;}
  .site-sidebar,.site-sidebar__menu.el-menu,.site-navbar__header{width: 260px;}
  .site-sidebar__inner{width: 280px;}
  .el-submenu .el-menu-item{padding-left:20px!important;}
</style>




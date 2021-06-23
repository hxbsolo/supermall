<template>
      <tabbar>
        <baritem link='/home' activecolor='red'>
          <img src="~assets/img/tabbar/home.svg" slot='item-icon' alt="">
          <img src="~assets/img/tabbar/home_active.svg" slot='item-icon-active' alt="">
          <div slot='item-text' >首页</div>
        </baritem>
        <baritem link='/category'>
          <img src="~assets/img/tabbar/category.svg" slot='item-icon' alt="">
          <img src="~assets/img/tabbar/category_active.svg" slot='item-icon-active' alt="">
          <div slot='item-text' >分类</div>
        </baritem>
        <baritem link='/cart'>
          <img src="~assets/img/tabbar/shopcart.svg" slot='item-icon' alt="">
          <img src="~assets/img/tabbar/shopcart_active.svg" slot='item-icon-active' alt=""> -->
          <div slot='item-text' >购物车</div> -->
        </baritem>
        <baritem link='/profile'>
          <img src="~assets/img/tabbar/profile.svg" slot='item-icon' alt="">
          <img src="~assets/img/tabbar/profile_active.svg" slot='item-icon-active' alt="">
          <div slot='item-text'>我的</div>
        </baritem>
    </tabbar>
</template>
<script>
import tabbar from 'components/common/tabbar/Tabbar'
import baritem from 'components/common/tabbar/Tabbaroitem'
export default {
  name: 'MainTabBar',
  components:{
    tabbar,
    baritem
  }
}
</script>
<style scoped>

</style>

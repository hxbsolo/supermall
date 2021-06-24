<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link" :title="item.title">
        <img :src="item.image" alt="" >
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
//引入轮播图组件
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>

</style>

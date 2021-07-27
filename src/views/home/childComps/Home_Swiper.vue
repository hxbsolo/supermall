<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link" :title="item.title">
        <img :src="item.image" alt="" @load="imageload">
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
    },
    data(){
      return {
        isLoad:false
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageload(){
      //监听到轮播图图片加载完毕发送事件
      //只需要发送一次事件,如果发送过,就把isLoad改为true,就不会再发出
      if(!this.isLoad){
        this.$emit('SwiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
<style scoped>

</style>

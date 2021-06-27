<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">
         <slot></slot>
     </div>
  </div>
</template>
<script>
import BetterScroll  from 'better-scroll'
import ObserveDOM from '@better-scroll/observe-dom'
BetterScroll.use(ObserveDOM)
export default {
  name: "scroll",
  data(){
    return {
      scroll:null
    }
  },
  props:{
    a:{
      type:Number,
      default: 0
    },
    UpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    let a = this.a
    let UpLoad= this.UpLoad
     this.scroll = new BetterScroll (this.$refs.wrapper,{
      click:true, //可以监听scroll下的click
      pullUpLoad:UpLoad, //是否开启上拉
      observeDOM: true, //动态获取滚动高度
      probeType:a, //是否派发scroll
     })
    this.scroll.on('scroll',(p) =>{
      this.$emit('scroll',p)
    })
    this.scroll.on('pullingUp',() =>{
      this.$emit('RequestSend')
    })
  },
  methods:{
    ScrollTo(x,y,time=800){
      this.scroll.scrollTo(x,y,time)
    },
    //封装相应上拉加载函数,
    finishPullUp(){
      this.scroll.finishPullUp()
      //动态获取添加商品后content的高度,解决添加商品,却无法上拉的问题
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>

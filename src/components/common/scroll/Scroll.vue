<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">
         <slot></slot>
     </div>
  </div>
</template>
<script>
import BetterScroll  from 'better-scroll'
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
      observeImage:true
     })
    //监听scroll事件触发发送事件到Home
    if(this.scroll.options.probeType == 2 || this.scroll.options.probeType == 3 ){
      this.scroll.on('scroll',(p) =>{
        this.$emit('scroll',p)
      })
    }
    //触发上拉发送事件到Home
    if(this.scroll.plugins.pullUpLoad){
      this.scroll.on('pullingUp',() =>{
        this.$emit('RequestSend')
      })
    }
  },
  methods:{
    ScrollTo(x,y,time=800){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
     this.scroll && this.scroll.refresh()
    },
    // //封装相应上拉加载函数,
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div id="home">
  <nav-bar class="home_nav">
    <div slot="center">购物街</div>
  </nav-bar>

  </div>
</template>
<script>
//引入组件
import NavBar from 'components/common/navbar/Navbar.vue'

//引入home.js 调用其中封装好的网络请求函数来进行面向Home组件开发
import {getHomeMultidata} from "network/home";

export default {
  name: 'Home',
  components:{
    NavBar
  },
  //垃圾回收机制,只要对象不被引用就会被回收掉,而我们这里的data中对象会一直被此组件引用,所以不会被回收掉
  data(){
    return {
      // result:null,
      banners:[],
      recommends:[]
    }
  },
  created() {
    getHomeMultidata().then(res=>{
      //这里的res在你函数调用完毕之后,就会被回收了,其中的数据由于没有别的东西引用他,也不会回收掉,
      // 而我们通过了将数据赋值到我们所定义的变量中,当此数据要被回首的时候,会发现还有东西在引用他,从而使数据保留下来
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
      this.result = res
    },err =>{
      console.error(err)
    })
    //此时获取不到result 但是 由于上面函数为异步,
    //console操作 会在上面函数执行就会打印,导致为数据没有,
    //但我们可以通过 devtools 来观察数据
    //数据其实是发生了变化,result 中有了数据
    // console.log(this.result)
  }
}
</script>
<style scoped>
.home_nav{
  background-color: var( --color-tint);
  color: var(--color-background);
}
</style>

<template>
  <div id="home">
  <nav-bar class="home_nav">
    <div slot="center">购物街</div>
  </nav-bar>
    <home-swiper :banners="banners"/>
    <HomeRecommendedView :recommends="recommends"/>
    <HomeFeatureView/>
    <TabControl :titles="titles" class="tabcontrol"/>
  </div>
</template>
<script>
//关于home的子组件存储在home目录下的childComps
//关于home的网络请求封装在network中的home.js
//引入Navbar
import NavBar from 'components/common/navbar/Navbar.vue'
//引入TabControl组件
import TabControl from "components/content/tabControl/Tab_Control";


//引入HomeSwiper 轮播图组件
import HomeSwiper from './childComps/Home_Swiper'
//引入推荐信息组件HomeRecommendsViews
import HomeRecommendedView from "./childComps/Home_RecommendedView";
//引入流行列表组件
import HomeFeatureView from "./childComps/Home_FeatureView";

//引入home相关网络请求函数
import {getHomeMultidata} from "network/home";
export default {
  name: 'Home',
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendedView,
    HomeFeatureView,
  },
  //垃圾回收机制,只要对象不被引用就会被回收掉,而我们这里的data中对象会一直被此组件引用,所以不会被回收掉
  data(){
    return {
      // result:null,
      banners:[],
      recommends:[],
      titles:['流行','新款','精选']
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
.tabcontrol{
  position: -webkit-sticky;
  position: sticky;
  top: 84px;
}
.home_nav{
  background-color: var( --color-tint);
  color: var(--color-background);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:9;
}
#home{
  padding-top: 44px;
}
</style>
